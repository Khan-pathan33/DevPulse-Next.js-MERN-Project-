import mongoose from 'mongoose';
import crypto from 'crypto';

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@devpulse.io").trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@DevPulse2026!";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

async function sync() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB Atlas.");

  const col = mongoose.connection.collection("users");
  const salt = generateSalt();
  const passwordHash = hashPassword(ADMIN_PASSWORD, salt);

  const existing = await col.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    await col.updateOne(
      { email: ADMIN_EMAIL },
      {
        $set: {
          passwordHash,
          salt,
          role: "admin",
          updatedAt: new Date(),
        },
      }
    );
    console.log(`Updated admin user (${ADMIN_EMAIL}) password and salt from .env.local.`);
  } else {
    await col.insertOne({
      name: "DevPulse Admin",
      email: ADMIN_EMAIL,
      passwordHash,
      salt,
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      bio: "Lead System Architect & DevPulse Platform Administrator.",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`Created new admin user (${ADMIN_EMAIL}) with credentials from .env.local.`);
  }

  const updatedAdmin = await col.findOne({ email: ADMIN_EMAIL });
  console.log("Verified Admin in DB:", {
    email: updatedAdmin.email,
    role: updatedAdmin.role,
    hasPasswordHash: !!updatedAdmin.passwordHash,
    hasSalt: !!updatedAdmin.salt,
  });

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

sync().catch(err => {
  console.error("Sync error:", err);
  process.exit(1);
});
