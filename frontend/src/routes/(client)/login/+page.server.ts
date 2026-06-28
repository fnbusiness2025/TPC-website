import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/database';
import { hashPassword, verifyPassword, createSession, destroySession, authenticateUser } from '$lib/server/auth';
import crypto from 'crypto';

export const load: PageServerLoad = ({ cookies }) => {
  const user = authenticateUser(cookies);
  if (user) {
    if (user.role === 'admin') {
      throw redirect(303, '/admin');
    }
    throw redirect(303, '/');
  }
  return {};
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString().trim();
    const password = data.get('password')?.toString();

    if (!email || !password) {
      return fail(400, { error: true, message: 'All fields are required.' });
    }

    try {
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
      if (!user) {
        return fail(400, { error: true, message: 'Invalid email or password.' });
      }

      if (user.status !== 'active') {
        if (user.status === 'pending') {
          return fail(403, { error: true, message: 'Your account is pending administrator approval.' });
        }
        return fail(403, { error: true, message: 'Your account has been suspended or rejected.' });
      }

      const isValid = verifyPassword(password, user.password_hash);
      if (!isValid) {
        return fail(400, { error: true, message: 'Invalid email or password.' });
      }

      createSession(cookies, user.id);

      if (user.role === 'admin') {
        throw redirect(303, '/admin');
      }
      
      return { success: true, message: 'Logged in successfully.' };
    } catch (err: any) {
      if (err.status === 303) throw err; // Allow redirects to pass through
      console.error('Login action error:', err);
      return fail(500, { error: true, message: 'An unexpected error occurred.' });
    }
  },

  register: async ({ request }) => {
    const data = await request.formData();
    const firstName = data.get('firstName')?.toString().trim();
    const lastName = data.get('lastName')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const phone = data.get('phone')?.toString().trim();
    const password = data.get('password')?.toString();
    const roleInput = data.get('role')?.toString();

    // Agent specific fields
    const agencyName = data.get('agencyName')?.toString().trim();
    const officeAddress = data.get('officeAddress')?.toString().trim();

    if (!firstName || !lastName || !email || !password || !roleInput) {
      return fail(400, { error: true, message: 'Required fields are missing.' });
    }

    const role = roleInput === 'agent' ? 'agent' : 'visitor';
    // Agents start as pending, visitors start as active
    const status = role === 'agent' ? 'pending' : 'active';

    try {
      // Check if email already exists
      const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      if (existingUser) {
        return fail(400, { error: true, message: 'An account with this email already exists.' });
      }

      const userId = crypto.randomUUID();
      const passwordHash = hashPassword(password);
      const now = new Date().toISOString();

      // Create transaction for user + agent profile
      const createUser = db.transaction(() => {
        db.prepare(`
          INSERT INTO users (id, first_name, last_name, email, phone, password_hash, role, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(userId, firstName, lastName, email, phone || null, passwordHash, role, status, now, now);

        if (role === 'agent') {
          db.prepare(`
            INSERT INTO agent_profiles (id, user_id, agency_name, bio, office_address, verified, created_at)
            VALUES (?, ?, ?, ?, ?, 0, ?)
          `).run(crypto.randomUUID(), userId, agencyName || null, '', officeAddress || null, now);
        }
      });

      createUser();

      if (role === 'agent') {
        return { 
          success: true, 
          message: 'Account created successfully! Your agent profile is pending administrator approval before you can log in.' 
        };
      }

      return { 
        success: true, 
        message: 'Account created successfully! You can now log in.' 
      };
    } catch (err) {
      console.error('Registration action error:', err);
      return fail(500, { error: true, message: 'An error occurred during registration.' });
    }
  },

  logout: async ({ cookies }) => {
    destroySession(cookies);
    throw redirect(303, '/login');
  }
};
