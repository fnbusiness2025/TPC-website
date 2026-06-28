// @ts-nocheck
import { db } from '$lib/server/database';
import { fail, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authenticateUser, hashPassword } from '$lib/server/auth';
import crypto from 'crypto';

export const load = ({ cookies }: Parameters<PageServerLoad>[0]) => {
  const user = authenticateUser(cookies);
  if (!user || user.role !== 'admin') {
    throw error(403, 'Unauthorized');
  }
  return {};
};

export const actions = {
  createAdmin: async ({ request, cookies }: import('./$types').RequestEvent) => {
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
      // Check if email already exists
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
  }
};
;null as any as Actions;