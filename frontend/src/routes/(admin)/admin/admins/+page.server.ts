import { db } from '$lib/server/database';
import { fail, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authenticateUser, hashPassword } from '$lib/server/auth';
import crypto from 'crypto';

export const load: PageServerLoad = ({ cookies }) => {
  const user = authenticateUser(cookies);
  if (!user || user.role !== 'admin') {
    throw error(403, 'Unauthorized');
  }

  try {
    const admins = db.prepare(`
      SELECT id, first_name, last_name, email, phone, status, created_at
      FROM users
      WHERE role = 'admin'
      ORDER BY first_name ASC, last_name ASC
    `).all() as any[];

    return {
      admins,
      currentUserId: user.id
    };
  } catch (err) {
    console.error('Failed to load admins list:', err);
    throw error(500, 'Could not load administrators.');
  }
};

export const actions: Actions = {
  createAdmin: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== 'admin') {
      return fail(403, { error: true, message: 'Unauthorized' });
    }

    const data = await request.formData();
    const firstName = data.get('firstName')?.toString().trim();
    const lastName = data.get('lastName')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const phone = data.get('phone')?.toString().trim();
    const password = data.get('password')?.toString();

    if (!firstName || !lastName || !email || !password) {
      return fail(400, { error: true, message: 'All fields except phone are required.' });
    }

    try {
      const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      if (existingUser) {
        return fail(400, { error: true, message: 'An account with this email already exists.' });
      }

      const adminId = crypto.randomUUID();
      const passwordHash = hashPassword(password);
      const now = new Date().toISOString();

      db.prepare(`
        INSERT INTO users (id, first_name, last_name, email, phone, password_hash, role, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, 'admin', 'active', ?, ?)
      `).run(adminId, firstName, lastName, email, phone || null, passwordHash, now, now);

      return { success: true, message: `Administrator ${firstName} ${lastName} created successfully.` };
    } catch (err) {
      console.error('Failed to create admin:', err);
      return fail(500, { error: true, message: 'Could not create administrator account.' });
    }
  },

  deactivateAdmin: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== 'admin') {
      return fail(403, { error: true, message: 'Unauthorized' });
    }

    const data = await request.formData();
    const adminId = data.get('adminId')?.toString();

    if (!adminId) {
      return fail(400, { error: true, message: 'Admin ID is required.' });
    }

    if (adminId === user.id) {
      return fail(400, { error: true, message: 'You cannot deactivate your own account.' });
    }

    try {
      const now = new Date().toISOString();
      db.prepare("UPDATE users SET status = 'suspended', updated_at = ? WHERE id = ? AND role = 'admin'").run(now, adminId);
      return { success: true, message: 'Administrator account has been suspended.' };
    } catch (err) {
      console.error('Failed to deactivate admin:', err);
      return fail(500, { error: true, message: 'Could not deactivate administrator.' });
    }
  },

  reactivateAdmin: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== 'admin') {
      return fail(403, { error: true, message: 'Unauthorized' });
    }

    const data = await request.formData();
    const adminId = data.get('adminId')?.toString();

    if (!adminId) {
      return fail(400, { error: true, message: 'Admin ID is required.' });
    }

    try {
      const now = new Date().toISOString();
      db.prepare("UPDATE users SET status = 'active', updated_at = ? WHERE id = ? AND role = 'admin'").run(now, adminId);
      return { success: true, message: 'Administrator account has been reactivated.' };
    } catch (err) {
      console.error('Failed to reactivate admin:', err);
      return fail(500, { error: true, message: 'Could not reactivate administrator.' });
    }
  }
};
