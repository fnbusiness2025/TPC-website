import { d as db } from "../../../../../../chunks/index.js";
import { fail, redirect, error } from "@sveltejs/kit";
import { a as authenticateUser } from "../../../../../../chunks/auth.js";
const load = ({ params, cookies }) => {
  const user = authenticateUser(cookies);
  if (!user || user.role !== "agent") {
    throw redirect(303, "/login");
  }
  const { id } = params;
  try {
    const property = db.prepare("SELECT * FROM properties WHERE id = ? AND agent_id = ?").get(id, user.id);
    if (!property) {
      throw error(404, "Property listing not found or unauthorized.");
    }
    const images = db.prepare("SELECT * FROM property_images WHERE property_id = ? ORDER BY sort_order ASC").all(id);
    const amenities = db.prepare(`
      SELECT a.name 
      FROM amenities a
      JOIN property_amenities pa ON a.id = pa.amenity_id
      WHERE pa.property_id = ?
    `).all(id);
    const reviews = db.prepare(`
      SELECT pr.*, u.first_name, u.last_name 
      FROM property_reviews pr
      JOIN users u ON pr.admin_id = u.id
      WHERE pr.property_id = ?
      ORDER BY pr.created_at DESC
    `).all(id);
    return {
      property,
      images,
      amenities: amenities.map((a) => a.name),
      reviews
    };
  } catch (err) {
    if (err.status === 404) throw err;
    console.error("Failed to load agent property details:", err);
    throw error(500, "An error occurred loading property details.");
  }
};
const actions = {
  deleteProperty: async ({ params, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== "agent") {
      return fail(403, { error: true, message: "Unauthorized" });
    }
    const { id } = params;
    try {
      const property = db.prepare("SELECT id FROM properties WHERE id = ? AND agent_id = ?").get(id, user.id);
      if (!property) {
        return fail(403, { error: true, message: "Property not found or unauthorized." });
      }
      db.prepare("DELETE FROM properties WHERE id = ?").run(id);
      throw redirect(303, "/agent");
    } catch (err) {
      if (err.status === 303) throw err;
      console.error("Failed to delete property:", err);
      return fail(500, { error: true, message: "Could not delete property listing." });
    }
  }
};
export {
  actions,
  load
};
