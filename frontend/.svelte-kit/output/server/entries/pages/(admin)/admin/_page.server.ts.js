import { fail, redirect, error } from "@sveltejs/kit";
import { a as authenticateUser } from "../../../../chunks/auth.js";
import { d as db } from "../../../../chunks/index.js";
import crypto from "crypto";
const load = ({ cookies }) => {
  const user = authenticateUser(cookies);
  if (!user || user.role !== "admin") {
    throw redirect(303, "/login");
  }
  try {
    const totalProp = db.prepare("SELECT COUNT(*) as count FROM properties").get();
    const pendingPropCount = db.prepare("SELECT COUNT(*) as count FROM properties WHERE status = 'pending'").get();
    const pendingAgentCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'agent' AND status = 'pending'").get();
    const totalInquiries = db.prepare("SELECT COUNT(*) as count FROM property_inquiries").get();
    const pendingProperties = db.prepare(`
      SELECT p.*, u.first_name, u.last_name, u.email as agent_email
      FROM properties p
      JOIN users u ON p.agent_id = u.id
      WHERE p.status = 'pending'
      ORDER BY p.created_at ASC
    `).all();
    const pendingAgents = db.prepare(`
      SELECT u.id, u.first_name, u.last_name, u.email, u.phone, u.created_at,
             ap.agency_name, ap.office_address
      FROM users u
      JOIN agent_profiles ap ON u.id = ap.user_id
      WHERE u.role = 'agent' AND u.status = 'pending'
      ORDER BY u.created_at ASC
    `).all();
    return {
      stats: {
        totalProperties: totalProp.count,
        pendingProperties: pendingPropCount.count,
        pendingAgents: pendingAgentCount.count,
        totalInquiries: totalInquiries.count
      },
      pendingProperties,
      pendingAgents
    };
  } catch (err) {
    console.error("Failed to load admin dashboard:", err);
    throw error(500, "Could not load admin dashboard data.");
  }
};
const actions = {
  approveProperty: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== "admin") return fail(403, { error: true, message: "Unauthorized" });
    const data = await request.formData();
    const propertyId = data.get("propertyId")?.toString();
    if (!propertyId) return fail(400, { error: true, message: "Property ID is required." });
    try {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const reviewId = crypto.randomUUID();
      db.transaction(() => {
        db.prepare("UPDATE properties SET status = 'approved', updated_at = ? WHERE id = ?").run(now, propertyId);
        db.prepare(`
          INSERT INTO property_reviews (id, property_id, admin_id, action, reason, created_at)
          VALUES (?, ?, ?, 'approved', ?, ?)
        `).run(reviewId, propertyId, user.id, "Approved by admin", now);
      })();
      return { success: true, message: "Property approved successfully." };
    } catch (err) {
      console.error("Failed to approve property:", err);
      return fail(500, { error: true, message: "Failed to approve property." });
    }
  },
  rejectProperty: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== "admin") return fail(403, { error: true, message: "Unauthorized" });
    const data = await request.formData();
    const propertyId = data.get("propertyId")?.toString();
    const reason = data.get("reason")?.toString().trim() || "Criteria not met";
    if (!propertyId) return fail(400, { error: true, message: "Property ID is required." });
    try {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const reviewId = crypto.randomUUID();
      db.transaction(() => {
        db.prepare("UPDATE properties SET status = 'rejected', updated_at = ? WHERE id = ?").run(now, propertyId);
        db.prepare(`
          INSERT INTO property_reviews (id, property_id, admin_id, action, reason, created_at)
          VALUES (?, ?, ?, 'rejected', ?, ?)
        `).run(reviewId, propertyId, user.id, reason, now);
      })();
      return { success: true, message: "Property rejected." };
    } catch (err) {
      console.error("Failed to reject property:", err);
      return fail(500, { error: true, message: "Failed to reject property." });
    }
  },
  approveAgent: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== "admin") return fail(403, { error: true, message: "Unauthorized" });
    const data = await request.formData();
    const agentId = data.get("agentId")?.toString();
    if (!agentId) return fail(400, { error: true, message: "Agent ID is required." });
    try {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      db.transaction(() => {
        db.prepare("UPDATE users SET status = 'active', updated_at = ? WHERE id = ?").run(now, agentId);
        db.prepare("UPDATE agent_profiles SET verified = 1, approved_by = ?, approved_at = ? WHERE user_id = ?").run(user.id, now, agentId);
      })();
      return { success: true, message: "Agent approved." };
    } catch (err) {
      console.error("Failed to approve agent:", err);
      return fail(500, { error: true, message: "Failed to approve agent." });
    }
  },
  rejectAgent: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== "admin") return fail(403, { error: true, message: "Unauthorized" });
    const data = await request.formData();
    const agentId = data.get("agentId")?.toString();
    if (!agentId) return fail(400, { error: true, message: "Agent ID is required." });
    try {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      db.transaction(() => {
        db.prepare("UPDATE users SET status = 'rejected', updated_at = ? WHERE id = ?").run(now, agentId);
        db.prepare("UPDATE agent_profiles SET verified = 0 WHERE user_id = ?").run(agentId);
      })();
      return { success: true, message: "Agent profile rejected." };
    } catch (err) {
      console.error("Failed to reject agent:", err);
      return fail(500, { error: true, message: "Failed to reject agent." });
    }
  }
};
export {
  actions,
  load
};
