import { db } from '$lib/server/database';
import { error, redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authenticateUser } from '$lib/server/auth';

export const load: PageServerLoad = ({ params, cookies }) => {
  const user = authenticateUser(cookies);
  if (!user || user.role !== 'agent') {
    throw redirect(303, '/login');
  }

  const { id } = params;

  try {
    // 1. Fetch property and verify agent owns it
    const property = db.prepare('SELECT * FROM properties WHERE id = ? AND agent_id = ?').get(id, user.id) as any;
    if (!property) {
      throw error(404, 'Property listing not found or unauthorized.');
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

    // 4. Fetch property review history (latest first)
    const reviews = db.prepare(`
      SELECT pr.*, u.first_name, u.last_name 
      FROM property_reviews pr
      JOIN users u ON pr.admin_id = u.id
      WHERE pr.property_id = ?
      ORDER BY pr.created_at DESC
    `).all(id) as any[];

    return {
      property,
      images,
      amenities: amenities.map(a => a.name),
      reviews
    };
  } catch (err: any) {
    if (err.status === 404) throw err;
    console.error('Failed to load agent property details:', err);
    throw error(500, 'An error occurred loading property details.');
  }
};

export const actions: Actions = {
  deleteProperty: async ({ params, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== 'agent') {
      return fail(403, { error: true, message: 'Unauthorized' });
    }

    const { id } = params;

    try {
      // Verify ownership
      const property = db.prepare('SELECT id FROM properties WHERE id = ? AND agent_id = ?').get(id, user.id);
      if (!property) {
        return fail(403, { error: true, message: 'Property not found or unauthorized.' });
      }

      // Delete property (cascade handles reviews, amenities, inquiries, images)
      db.prepare('DELETE FROM properties WHERE id = ?').run(id);

      throw redirect(303, '/agent');
    } catch (err: any) {
      if (err.status === 303) throw err;
      console.error('Failed to delete property:', err);
      return fail(500, { error: true, message: 'Could not delete property listing.' });
    }
  }
};
