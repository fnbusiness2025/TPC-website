// @ts-nocheck
import type { LayoutServerLoad } from './$types';
import { authenticateUser } from '$lib/server/auth';

export const load = ({ cookies }: Parameters<LayoutServerLoad>[0]) => {
  const user = authenticateUser(cookies);
  if (user) {
    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
      }
    };
  }
  return {
    user: null
  };
};
