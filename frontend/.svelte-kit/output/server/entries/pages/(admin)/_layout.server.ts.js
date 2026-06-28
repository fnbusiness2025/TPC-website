import { redirect } from "@sveltejs/kit";
import { a as authenticateUser } from "../../../chunks/auth.js";
const load = ({ cookies }) => {
  const user = authenticateUser(cookies);
  if (!user || user.role !== "admin") {
    throw redirect(303, "/login");
  }
  return {
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role
    }
  };
};
export {
  load
};
