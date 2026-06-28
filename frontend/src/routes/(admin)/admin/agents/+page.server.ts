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
    const agents = db.prepare(`
      SELECT u.id, u.first_name, u.last_name, u.email, u.phone, u.status, u.created_at,
             ap.agency_name, ap.business_registration, ap.office_address, ap.bio
      FROM users u
      JOIN agent_profiles ap ON u.id = ap.user_id
      WHERE u.role = 'agent' AND u.status = 'active'
      ORDER BY u.first_name ASC, u.last_name ASC
    `).all() as any[];

    return {
      agents
    };
  } catch (err) {
    console.error('Failed to load active agents list:', err);
    throw error(500, 'Could not load active agents.');
  }
};

export const actions: Actions = {
  deactivateAgent: async ({ request, cookies }) => {
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
        // Suspend agent user
        db.prepare("UPDATE users SET status = 'suspended', updated_at = ? WHERE id = ?").run(now, agentId);
        // Unverify agent profile
        db.prepare("UPDATE agent_profiles SET verified = 0 WHERE user_id = ?").run(agentId);
        // Set all of agent's properties to pending so they don't show up publicly
        db.prepare("UPDATE properties SET status = 'pending', updated_at = ? WHERE agent_id = ?").run(now, agentId);
      })();

      return { success: true, message: 'Agent deactivated and their listings suspended.' };
    } catch (err) {
      console.error('Failed to deactivate agent:', err);
      return fail(500, { error: true, message: 'Could not deactivate agent.' });
    }
  }
};
