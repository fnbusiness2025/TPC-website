import Database from "better-sqlite3";
import { join } from "path";
import crypto from "crypto";
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}
const dbPath = join(process.cwd(), "src/lib/server/database/tpc.db");
const db = new Database(dbPath, { verbose: console.log });
db.pragma("foreign_keys = ON");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'agent', 'visitor')) NOT NULL,
    status TEXT CHECK(status IN ('active', 'pending', 'rejected', 'suspended')) DEFAULT 'active',
    profile_image TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS agent_profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    agency_name TEXT,
    business_registration TEXT,
    bio TEXT,
    office_address TEXT,
    verified INTEGER CHECK(verified IN (0, 1)) DEFAULT 0,
    approved_by TEXT REFERENCES users(id),
    approved_at TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    property_type TEXT CHECK(property_type IN ('house', 'apartment', 'land', 'commercial')) NOT NULL,
    listing_type TEXT CHECK(listing_type IN ('rent', 'sale')) NOT NULL,
    price REAL NOT NULL,
    currency TEXT DEFAULT 'MK',
    bedrooms INTEGER,
    bathrooms INTEGER,
    parking_spaces INTEGER,
    square_meters REAL,
    address TEXT,
    city TEXT,
    state_region TEXT,
    country TEXT DEFAULT 'Malawi',
    latitude REAL,
    longitude REAL,
    status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    featured INTEGER CHECK(featured IN (0, 1)) DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS property_images (
    id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary INTEGER CHECK(is_primary IN (0, 1)) DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS amenities (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS property_amenities (
    property_id TEXT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    amenity_id TEXT NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (property_id, amenity_id)
  );

  CREATE TABLE IF NOT EXISTS property_inquiries (
    id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS property_reviews (
    id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    admin_id TEXT NOT NULL REFERENCES users(id),
    action TEXT CHECK(action IN ('approved', 'rejected')) NOT NULL,
    reason TEXT,
    created_at TEXT NOT NULL
  );
`);
const userCount = db.prepare("SELECT count(*) as count FROM users").get();
if (userCount.count === 0) {
  console.log("Seeding initial database...");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const adminId = crypto.randomUUID();
  const agentId = crypto.randomUUID();
  const visitorId = crypto.randomUUID();
  const insertUser = db.prepare(`
    INSERT INTO users (id, first_name, last_name, email, phone, password_hash, role, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertUser.run(adminId, "John", "Domain", "admin@tpc.com", "+265888000001", hashPassword("admin123"), "admin", "active", now, now);
  insertUser.run(agentId, "Alex", "Phiri", "agent@tpc.com", "+265888000002", hashPassword("agent123"), "agent", "active", now, now);
  insertUser.run(visitorId, "Grace", "Chiwambo", "visitor@tpc.com", "+265888000003", hashPassword("visitor123"), "visitor", "active", now, now);
  const agentProfileId = crypto.randomUUID();
  db.prepare(`
    INSERT INTO agent_profiles (id, user_id, agency_name, business_registration, bio, office_address, verified, approved_by, approved_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
  `).run(
    agentProfileId,
    agentId,
    "TPC Premium Brokerage",
    "BR-100234",
    "Registered property consultant and broker specializing in residential property across Malawi.",
    "Behind Reunion Insurance Building, Maselema, Blantyre",
    adminId,
    now,
    now
  );
  const amenitiesList = ["Swimming Pool", "Borehole", "Solar Power", "Security", "WiFi", "Garden"];
  const amenityIds = {};
  const insertAmenity = db.prepare("INSERT INTO amenities (id, name) VALUES (?, ?)");
  for (const name of amenitiesList) {
    const id = crypto.randomUUID();
    insertAmenity.run(id, name);
    amenityIds[name] = id;
  }
  const prop1Id = crypto.randomUUID();
  const prop2Id = crypto.randomUUID();
  const prop3Id = crypto.randomUUID();
  const insertProperty = db.prepare(`
    INSERT INTO properties (
      id, agent_id, title, description, property_type, listing_type, 
      price, currency, bedrooms, bathrooms, parking_spaces, square_meters, 
      address, city, state_region, country, latitude, longitude, status, featured, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertProperty.run(
    prop1Id,
    agentId,
    "Luxury 4 Bedroom Villa in Nyambadwe",
    "A premium, newly built 4-bedroom executive house situated in the upscale Nyambadwe neighborhood. Features high-end finishes, spacious kitchen, master self-contained, automated gate, and scenic views.",
    "house",
    "sale",
    85e6,
    "MK",
    4,
    3,
    2,
    280,
    "Soche View Crescent, Nyambadwe",
    "Blantyre",
    "Southern Region",
    "Malawi",
    -15.776,
    35.018,
    "approved",
    1,
    now,
    now
  );
  insertProperty.run(
    prop2Id,
    agentId,
    "Modern 2 Bedroom Apartment in Limbe",
    "Perfect for professionals, this modern 2-bedroom fully furnished apartment is located in a quiet and secure compound in Limbe. Close to shopping centers and international schools.",
    "apartment",
    "rent",
    35e4,
    "MK",
    2,
    2,
    1,
    110,
    "Kanjedza Drive, Limbe",
    "Blantyre",
    "Southern Region",
    "Malawi",
    -15.808,
    35.056,
    "approved",
    1,
    now,
    now
  );
  insertProperty.run(
    prop3Id,
    agentId,
    "Prime Commercial Land in Lilongwe Area 43",
    "Excellent 1.5-acre land zoned for commercial use in Area 43, Lilongwe. Fully fenced with water and electricity connections already on site. Perfect for office park or apartment complex developer.",
    "land",
    "sale",
    12e7,
    "MK",
    null,
    null,
    null,
    6e3,
    "Off Presidential Highway, Area 43",
    "Lilongwe",
    "Central Region",
    "Malawi",
    -13.931,
    33.812,
    "approved",
    0,
    now,
    now
  );
  const insertImage = db.prepare(`
    INSERT INTO property_images (id, property_id, image_url, is_primary, sort_order, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertImage.run(crypto.randomUUID(), prop1Id, "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80", 1, 0, now);
  insertImage.run(crypto.randomUUID(), prop1Id, "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80", 0, 1, now);
  insertImage.run(crypto.randomUUID(), prop2Id, "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80", 1, 0, now);
  insertImage.run(crypto.randomUUID(), prop2Id, "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80", 0, 1, now);
  insertImage.run(crypto.randomUUID(), prop3Id, "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80", 1, 0, now);
  const insertPropAmenity = db.prepare("INSERT INTO property_amenities (property_id, amenity_id) VALUES (?, ?)");
  insertPropAmenity.run(prop1Id, amenityIds["Swimming Pool"]);
  insertPropAmenity.run(prop1Id, amenityIds["Borehole"]);
  insertPropAmenity.run(prop1Id, amenityIds["Security"]);
  insertPropAmenity.run(prop1Id, amenityIds["Garden"]);
  insertPropAmenity.run(prop2Id, amenityIds["Borehole"]);
  insertPropAmenity.run(prop2Id, amenityIds["Solar Power"]);
  insertPropAmenity.run(prop2Id, amenityIds["Security"]);
  insertPropAmenity.run(prop2Id, amenityIds["WiFi"]);
  console.log("Database successfully seeded!");
}
export {
  db as d
};
