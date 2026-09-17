import fs from "fs";
import mongoose from "mongoose";

const envLocal = fs.readFileSync(".env.local", "utf8");
const match = envLocal.match(/MONGODB_URI=(.+)/);
if (!match) {
  console.error("No MONGODB_URI found in .env.local");
  process.exit(1);
}
const uri = match[1].trim();

async function updateImages() {
  await mongoose.connect(uri);
  const col = mongoose.connection.collection("projects");

  // 1. Habitica
  const r1 = await col.updateMany(
    { $or: [{ slug: /habitica/i }, { title: /habitica/i }] },
    { $set: { image: "/projects/habitica.png" } }
  );
  console.log(`Updated Habitica: matched ${r1.matchedCount}, modified ${r1.modifiedCount}`);

  // 2. Excalidraw
  const r2 = await col.updateMany(
    { $or: [{ slug: /excalidraw/i }, { title: /excalidraw/i }] },
    { $set: { image: "https://excalidraw.com/og-image-2.png" } }
  );
  console.log(`Updated Excalidraw: matched ${r2.matchedCount}, modified ${r2.modifiedCount}`);

  // 3. Dub.co
  const r3 = await col.updateMany(
    { $or: [{ slug: /dub/i }, { title: /dub/i }] },
    { $set: { image: "https://assets.dub.co/thumbnail.png" } }
  );
  console.log(`Updated Dub.co: matched ${r3.matchedCount}, modified ${r3.modifiedCount}`);

  // Verify
  const habiticaDoc = await col.findOne({ $or: [{ slug: /habitica/i }, { title: /habitica/i }] });
  console.log("\nHabitica in MongoDB now:", {
    title: habiticaDoc?.title,
    slug: habiticaDoc?.slug,
    image: habiticaDoc?.image
  });

  const excalidrawDoc = await col.findOne({ $or: [{ slug: /excalidraw/i }, { title: /excalidraw/i }] });
  console.log("Excalidraw in MongoDB now:", {
    title: excalidrawDoc?.title,
    slug: excalidrawDoc?.slug,
    image: excalidrawDoc?.image
  });

  await mongoose.disconnect();
}

updateImages().catch(err => {
  console.error(err);
  process.exit(1);
});
