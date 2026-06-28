// @ts-nocheck
import { db } from '$lib/server/database';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import crypto from 'crypto';

export const load = ({ params }: Parameters<PageServerLoad>[0]) => {
  const { id } = params;

  try {
    // 1. Fetch property
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(id) as any;
    if (!property) {
      throw error(404, 'Property not found.');
    }

    // 2. Fetch images
    const images = db.prepare('SELECT * FROM property_images WHERE property_id = ? ORDER BY sort_order ASC').all(id) as any[];

    // 3. Fetch amenities
    const amenities = db.prepare(`
      SELECT a.name 
      FROM amenities a
      JOIN property_amenities pa ON a.id = pa.amenity_id
      WHERE pa.property_id = ?
    `).all(id) as any[];

    // 4. Fetch agent details
    const agent = db.prepare(`
      SELECT u.first_name, u.last_name, u.email, u.phone, u.profile_image,
             ap.agency_name, ap.bio, ap.office_address
      FROM users u
      LEFT JOIN agent_profiles ap ON u.id = ap.user_id
      WHERE u.id = ?
    `).get(property.agent_id) as any;

    return {
      property,
      images,
      amenities: amenities.map(a => a.name),
      agent
    };
  } catch (err: any) {
    if (err.status === 404) throw err;
    console.error('Failed to load property details:', err);
    throw error(500, 'An error occurred loading property details.');
  }
};

export const actions = {
  inquiry: async ({ request, params }: import('./$types').RequestEvent) => {
    const { id: propertyId } = params;
    const data = await request.formData();
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const phone = data.get('phone')?.toString().trim();
    const message = data.get('message')?.toString().trim();

    if (!name || !email || !message) {
      return fail(400, { error: true, message: 'Please fill in all required fields (Name, Email, Message).' });
    }

    try {
      const inquiryId = crypto.randomUUID();
      const now = new Date().toISOString();

      db.prepare(`
        INSERT INTO property_inquiries (id, property_id, name, email, phone, message, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(inquiryId, propertyId, name, email, phone || null, message, now);

      return { 
        success: true, 
        message: 'Your inquiry has been sent successfully! The agent will reach out to you shortly.' 
      };
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      return fail(500, { error: true, message: 'An error occurred while submitting your inquiry.' });
    }
  }
};
;null as any as Actions;