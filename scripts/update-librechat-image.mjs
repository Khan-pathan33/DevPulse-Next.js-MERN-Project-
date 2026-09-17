import fs from "fs";
import mongoose from "mongoose";

const envLocal = fs.readFileSync(".env.local", "utf8");
const match = envLocal.match(/MONGODB_URI=(.+)/);
if (!match) {
  console.error("No MONGODB_URI found in .env.local");
  process.exit(1);
}
const uri = match[1].trim();

async function updateLibreChat() {
  await mongoose.connect(uri);
  const col = mongoose.connection.collection("projects");

  const r = await col.updateMany(
    { $or: [{ slug: /librechat/i }, { title: /librechat/i }] },
    { $set: { image: "/projects/librechat.png" } }
  );
  console.log(`Updated LibreChat in MongoDB: matched ${r.matchedCount}, modified ${r.modifiedCount}`);

  const doc = await col.findOne({ $or: [{ slug: /librechat/i }, { title: /librechat/i }] });
  console.log("LibreChat now:", {
    title: doc?.title,
    slug: doc?.slug,
    image: doc?.image
  });

  await mongoose.disconnect();
}

updateLibreChat().catch(err => {
  console.error(err);
  process.exit(1);
});
