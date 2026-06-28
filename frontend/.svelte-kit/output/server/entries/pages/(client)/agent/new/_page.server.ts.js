import { fail, redirect, error } from "@sveltejs/kit";
import { a as authenticateUser } from "../../../../../chunks/auth.js";
import { d as db } from "../../../../../chunks/index.js";
import crypto from "crypto";
const load = ({ cookies }) => {
  const user = authenticateUser(cookies);
  if (!user || user.role !== "agent") {
    throw redirect(303, "/login");
  }
  try {
    const amenities = db.prepare("SELECT * FROM amenities ORDER BY name ASC").all();
    return {
      amenities
    };
  } catch (err) {
    console.error("Failed to load amenities:", err);
    throw error(500, "Could not load listing amenities.");
  }
};
const actions = {
  createProperty: async ({ request, cookies }) => {
    const user = authenticateUser(cookies);
    if (!user || user.role !== "agent") {
      return fail(403, { error: true, message: "Unauthorized" });
    }
    const data = await request.formData();
    const title = data.get("title")?.toString().trim();
    const description = data.get("description")?.toString().trim();
    const propertyType = data.get("propertyType")?.toString();
    const listingType = data.get("listingType")?.toString();
    const priceStr = data.get("price")?.toString();
    const bedroomsStr = data.get("bedrooms")?.toString();
    const bathroomsStr = data.get("bathrooms")?.toString();
    const parkingSpacesStr = data.get("parkingSpaces")?.toString();
    const squareMetersStr = data.get("squareMeters")?.toString();
    const address = data.get("address")?.toString().trim();
    const city = data.get("city")?.toString().trim();
    const stateRegion = data.get("stateRegion")?.toString().trim();
    const imageUrl = data.get("imageUrl")?.toString().trim();
    const selectedAmenities = data.getAll("amenities");
    if (!title || !propertyType || !listingType || !priceStr || !address || !city || !stateRegion || !imageUrl) {
      return fail(400, { error: true, message: "Please fill in all required fields." });
    }
    const price = Number(priceStr);
    if (isNaN(price) || price <= 0) {
      return fail(400, { error: true, message: "Price must be a valid positive number." });
    }
    const bedrooms = bedroomsStr ? Number(bedroomsStr) : null;
    const bathrooms = bathroomsStr ? Number(bathroomsStr) : null;
    const parkingSpaces = parkingSpacesStr ? Number(parkingSpacesStr) : null;
    const squareMeters = squareMetersStr ? Number(squareMetersStr) : null;
    try {
      const propertyId = crypto.randomUUID();
      const imageId = crypto.randomUUID();
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const createTransaction = db.transaction(() => {
        db.prepare(`
          INSERT INTO properties (
            id, agent_id, title, description, property_type, listing_type, 
            price, currency, bedrooms, bathrooms, parking_spaces, square_meters, 
            address, city, state_region, status, featured, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0, ?, ?)
        `).run(
          propertyId,
          user.id,
          title,
          description || "",
          propertyType,
          listingType,
          price,
          "MK",
          bedrooms,
          bathrooms,
          parkingSpaces,
          squareMeters,
          address,
          city,
          stateRegion,
          now,
          now
        );
        db.prepare(`
          INSERT INTO property_images (id, property_id, image_url, is_primary, sort_order, created_at)
          VALUES (?, ?, ?, 1, 0, ?)
        `).run(imageId, propertyId, imageUrl, now);
        const insertPropAmenity = db.prepare(`
          INSERT INTO property_amenities (property_id, amenity_id)
          VALUES (?, ?)
        `);
        for (const amenityId of selectedAmenities) {
          insertPropAmenity.run(propertyId, amenityId);
        }
      });
      createTransaction();
      throw redirect(303, "/agent");
    } catch (err) {
      if (err.status === 303) throw err;
      console.error("Failed to create property:", err);
      return fail(500, { error: true, message: "Failed to create property listing." });
    }
  }
};
export {
  actions,
  load
};
