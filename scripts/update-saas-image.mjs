import fs from "fs";
import mongoose from "mongoose";

const envLocal = fs.readFileSync(".env.local", "utf8");
const match = envLocal.match(/MONGODB_URI=(.+)/);
if (!match) {
  console.error("No MONGODB_URI found in .env.local");
  process.exit(1);
}
const uri = match[1].trim();

async function updateSaaS() {
  await mongoose.connect(uri);
  const col = mongoose.connection.collection("projects");

  const r = await col.updateMany(
    { $or: [{ slug: /saas/i }, { title: /saas/i }] },
    { $set: { image: "/projects/saas-starter.png" } }
  );
  console.log(`Updated SaaS Starter in MongoDB: matched ${r.matchedCount}, modified ${r.modifiedCount}`);

  const doc = await col.findOne({ $or: [{ slug: /saas/i }, { title: /saas/i }] });
  console.log("SaaS Starter now:", {
    title: doc?.title,
    slug: doc?.slug,
    image: doc?.image
  });

  await mongoose.disconnect();
}

updateSaaS().catch(err => {
  console.error(err);
  process.exit(1);
});
