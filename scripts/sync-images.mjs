import fs from "fs";
import mongoose from "mongoose";

const envLocal = fs.readFileSync(".env.local", "utf8");
const match = envLocal.match(/MONGODB_URI=(.+)/);
if (!match) {
  console.error("No MONGODB_URI found in .env.local");
  process.exit(1);
}
const uri = match[1].trim();

const projectImages = {
  "nextjs-commerce-platform": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80",
  "nextjs-saas-starter": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
  "vercel-ai-chatbot": "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80",
  "librechat-ai-workspace": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  "payload-cms-mern": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
  "freecodecamp-mern-platform": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
  "habitica-mern-gamification": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
  "dub-link-management": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
  "excalidraw-collaborative-canvas": "https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=1200&auto=format&fit=crop&q=80",
  "calcom-scheduling-platform": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80",
  "next-js-project-3377": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80"
};

async function syncImages() {
  await mongoose.connect(uri);
  const col = mongoose.connection.collection("projects");

  for (const [slug, image] of Object.entries(projectImages)) {
    const res = await col.updateOne({ slug }, { $set: { image } });
    console.log(`Updated project [${slug}]: matched ${res.matchedCount}, modified ${res.modifiedCount}`);
  }

  // Also update any project with gym in slug or title
  await col.updateMany(
    { $or: [{ slug: /gym/i }, { title: /gym/i }] },
    { $set: { image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80" } }
  );

  const updatedDocs = await col.find({}, { projection: { slug: 1, title: 1, image: 1 } }).toArray();
  console.log("\n=== ALL PROJECTS IN MONGODB WITH IMAGES ===");
  updatedDocs.forEach(p => {
    console.log(`- ${p.title} (${p.slug}): ${p.image ? "IMAGE SET" : "NO IMAGE"}`);
  });

  await mongoose.disconnect();
}

syncImages().catch(err => {
  console.error("Error syncing images:", err);
  process.exit(1);
});
