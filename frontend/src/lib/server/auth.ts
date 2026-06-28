import crypto from 'crypto';
import type { Cookies } from '@sveltejs/kit';
import { db } from './database';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: 'admin' | 'agent' | 'visitor';
  status: 'active' | 'pending' | 'rejected' | 'suspended';
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

// Hash password with pbkdf2 and native crypto
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Verify a password against a stored hash
export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === newHash;
}

// Verify cookie and retrieve current user from the database
export function authenticateUser(cookies: Cookies): User | null {
  const userId = cookies.get('session_id');
  if (!userId) return null;

  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as User | undefined;
    if (user && user.status === 'active') {
      return user;
    }
  } catch (err) {
    console.error('Failed to authenticate user:', err);
  }
  
  return null;
}

// Start user session
export function createSession(cookies: Cookies, userId: string) {
  cookies.set('session_id', userId, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
}

// End user session
export function destroySession(cookies: Cookies) {
  cookies.delete('session_id', { path: '/' });
}
