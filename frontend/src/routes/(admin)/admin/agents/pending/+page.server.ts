import { db } from '$lib/server/database';
import { fail, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authenticateUser } from '$lib/server/auth';

export const load: PageServerLoad = ({ cookies }) => {
  const user = authenticateUser(cookies);
  if (!user || user.role !== 'admin') {
    throw error(403, 'Unauthorized');
  }

  try {
    const pendingAgents = db.prepare(`
      SELECT u.id, u.first_name, u.last_name, u.email, u.phone, u.created_at,
             ap.agency_name, ap.office_address
      FROM users u
      JOIN agent_profiles ap ON u.id = ap.user_id
      WHERE u.role = 'agent' AND u.status = 'pending'
      ORDER BY u.created_at ASC
    `).all() as any[];

    return {
      pendingAgents
    };
  } catch (err) {
    console.error('Failed to load pending agents queue:', err);
    throw error(500, 'Could not load pending agents.');
  }
};

export const actions: Actions = {
  approveAgent: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== 'admin') {
      return fail(403, { error: true, message: 'Unauthorized' });
    }

    const data = await request.formData();
    const agentId = data.get('agentId')?.toString();

    if (!agentId) {
      return fail(400, { error: true, message: 'Agent ID is required.' });
    }

    try {
      const now = new Date().toISOString();

      db.transaction(() => {
        db.prepare("UPDATE users SET status = 'active', updated_at = ? WHERE id = ?").run(now, agentId);
        db.prepare("UPDATE agent_profiles SET verified = 1, approved_by = ?, approved_at = ? WHERE user_id = ?").run(user.id, now, agentId);
      })();

      return { success: true, message: 'Agent application approved successfully.' };
    } catch (err) {
      console.error('Failed to approve agent:', err);
      return fail(500, { error: true, message: 'Could not approve agent.' });
    }
  },

  rejectAgent: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== 'admin') {
      return fail(403, { error: true, message: 'Unauthorized' });
    }

    const data = await request.formData();
    const agentId = data.get('agentId')?.toString();

    if (!agentId) {
      return fail(400, { error: true, message: 'Agent ID is required.' });
    }

    try {
      const now = new Date().toISOString();

      db.transaction(() => {
        db.prepare("UPDATE users SET status = 'rejected', updated_at = ? WHERE id = ?").run(now, agentId);
        db.prepare("UPDATE agent_profiles SET verified = 0 WHERE user_id = ?").run(agentId);
      })();

      return { success: true, message: 'Agent application rejected.' };
    } catch (err) {
      console.error('Failed to reject agent:', err);
      return fail(500, { error: true, message: 'Could not reject agent.' });
    }
  }
};
