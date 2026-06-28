// @ts-nocheck
import { db } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = ({ url }: Parameters<PageServerLoad>[0]) => {
  const search = url.searchParams.get('search') || '';
  const type = url.searchParams.get('type') || '';
  const listing = url.searchParams.get('listing') || '';
  const minPrice = url.searchParams.get('minPrice') || '';
  const maxPrice = url.searchParams.get('maxPrice') || '';
  const bedrooms = url.searchParams.get('bedrooms') || '';

  let query = `
    SELECT p.*, pi.image_url as primary_image
    FROM properties p
    LEFT JOIN (
      SELECT property_id, image_url, MIN(is_primary) 
      FROM property_images 
      GROUP BY property_id
    ) pi ON p.id = pi.property_id
    WHERE p.status = 'approved'
  `;
  const params: any[] = [];

  if (search) {
    query += ` AND (p.title LIKE ? OR p.description LIKE ? OR p.city LIKE ? OR p.address LIKE ?)`;
    const searchWildcard = `%${search}%`;
    params.push(searchWildcard, searchWildcard, searchWildcard, searchWildcard);
  }

  if (type) {
    query += ` AND p.property_type = ?`;
    params.push(type);
  }

  if (listing) {
    query += ` AND p.listing_type = ?`;
    params.push(listing);
  }

  if (minPrice) {
    query += ` AND p.price >= ?`;
    params.push(Number(minPrice));
  }

  if (maxPrice) {
    query += ` AND p.price <= ?`;
    params.push(Number(maxPrice));
  }

  if (bedrooms) {
    query += ` AND p.bedrooms >= ?`;
    params.push(Number(bedrooms));
  }

  query += ` ORDER BY p.featured DESC, p.created_at DESC`;

  try {
    const properties = db.prepare(query).all(...params);
    return {
      properties,
      filters: {
        search,
        type,
        listing,
        minPrice,
        maxPrice,
        bedrooms
      }
    };
  } catch (error) {
    console.error('Failed to load properties:', error);
    return {
      properties: [],
      filters: {
        search,
        type,
        listing,
        minPrice,
        maxPrice,
        bedrooms
      }
    };
  }
};
