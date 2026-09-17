import fs from "fs";
import mongoose from "mongoose";

const envLocal = fs.readFileSync(".env.local", "utf8");
const match = envLocal.match(/MONGODB_URI=(.+)/);
if (!match) {
  console.error("No MONGODB_URI found in .env.local");
  process.exit(1);
}
const uri = match[1].trim();

const updates = [
  { filter: { $or: [{ slug: /calcom/i }, { title: /cal\.com/i }] }, image: "/projects/calcom.png", name: "Cal.com" },
  { filter: { $or: [{ slug: /dub/i }, { title: /dub/i }] }, image: "/projects/dub.png", name: "Dub.co" },
  { filter: { $or: [{ slug: /excalidraw/i }, { title: /excalidraw/i }] }, image: "/projects/excalidraw.png", name: "Excalidraw" },
  { filter: { $or: [{ slug: /payload/i }, { title: /payload/i }] }, image: "/projects/payload.png", name: "Payload CMS" },
  { filter: { $or: [{ slug: /chatbot/i }, { title: /chatbot/i }] }, image: "/projects/chatbot.png", name: "Vercel AI Chatbot" },
];

async function run() {
  await mongoose.connect(uri);
  const col = mongoose.connection.collection("projects");

  for (const u of updates) {
    const res = await col.updateMany(u.filter, { $set: { image: u.image } });
    console.log(`Updated ${u.name}: matched ${res.matchedCount}, modified ${res.modifiedCount} -> ${u.image}`);
  }

  const all = await col.find({}, { projection: { title: 1, slug: 1, image: 1 } }).toArray();
  console.log("\n=== ALL PROJECTS IN MONGODB NOW ===");
  all.forEach(p => {
    console.log(`- ${p.title} (${p.slug}) => ${p.image}`);
  });

  await mongoose.disconnect();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
