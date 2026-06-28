import { error, redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authenticateUser } from '$lib/server/auth';
import { db } from '$lib/server/database';

export const load: PageServerLoad = ({ cookies }) => {
  const user = authenticateUser(cookies);
  if (!user || user.role !== 'agent') {
    throw redirect(303, '/login');
  }

  try {
    // 1. Fetch agent's properties
    const properties = db.prepare(`
      SELECT p.*, pi.image_url as primary_image,
             (SELECT GROUP_CONCAT(a.name, ', ') 
              FROM property_amenities pa
              JOIN amenities a ON pa.amenity_id = a.id
              WHERE pa.property_id = p.id) as amenities_list
      FROM properties p
      LEFT JOIN (
        SELECT property_id, image_url, MIN(is_primary) 
        FROM property_images 
        GROUP BY property_id
      ) pi ON p.id = pi.property_id
      WHERE p.agent_id = ?
      ORDER BY p.created_at DESC
    `).all(user.id) as any[];

    // 2. Fetch inquiries for agent's properties
    const inquiries = db.prepare(`
      SELECT i.*, p.title as property_title
      FROM property_inquiries i
      JOIN properties p ON i.property_id = p.id
      WHERE p.agent_id = ?
      ORDER BY i.created_at DESC
    `).all(user.id) as any[];

    return {
      properties,
      inquiries
    };
  } catch (err) {
    console.error('Failed to load agent dashboard data:', err);
    throw error(500, 'Could not load agent dashboard data.');
  }
};

export const actions: Actions = {
  deleteProperty: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== 'agent') {
      return fail(403, { error: true, message: 'Unauthorized' });
    }

    const data = await request.formData();
    const propertyId = data.get('propertyId')?.toString();

    if (!propertyId) {
      return fail(400, { error: true, message: 'Property ID required' });
    }

    try {
      // Verify ownership
      const property = db.prepare('SELECT id FROM properties WHERE id = ? AND agent_id = ?').get(propertyId, user.id);
      if (!property) {
        return fail(403, { error: true, message: 'Property not found or unauthorized.' });
      }

      // Delete (cascade handles images and inquiries)
      db.prepare('DELETE FROM properties WHERE id = ?').run(propertyId);

      return { success: true, message: 'Property deleted successfully.' };
    } catch (err) {
      console.error('Failed to delete property:', err);
      return fail(500, { error: true, message: 'Could not delete property.' });
    }
  }
};
