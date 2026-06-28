import crypto from "crypto";
import { d as db } from "./index.js";
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}
function verifyPassword(password, storedHash) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const newHash = crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
  return hash === newHash;
}
function authenticateUser(cookies) {
  const userId = cookies.get("session_id");
  if (!userId) return null;
  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    if (user && user.status === "active") {
      return user;
    }
  } catch (err) {
    console.error("Failed to authenticate user:", err);
  }
  return null;
}
function createSession(cookies, userId) {
  cookies.set("session_id", userId, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7
    // 1 week
  });
}
function destroySession(cookies) {
  cookies.delete("session_id", { path: "/" });
}
export {
  authenticateUser as a,
  createSession as c,
  destroySession as d,
  hashPassword as h,
  verifyPassword as v
};
