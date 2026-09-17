import fs from "fs";
import mongoose from "mongoose";

const envLocal = fs.readFileSync(".env.local", "utf8");
const match = envLocal.match(/MONGODB_URI=(.+)/);
if (!match) {
  console.error("No MONGODB_URI found in .env.local");
  process.exit(1);
}
const uri = match[1].trim();

async function run() {
  await mongoose.connect(uri);
  const col = mongoose.connection.collection("projects");

  // 1. Update Next.js Commerce image to /projects/commerce.png
  const comRes = await col.updateMany(
    { $or: [{ slug: /commerce/i }, { title: /commerce/i }] },
    { $set: { image: "/projects/commerce.png" } }
  );
  console.log(`Updated Next.js Commerce image: matched ${comRes.matchedCount}, modified ${comRes.modifiedCount}`);

  // 2. Remove FreeCodeCamp
  const fccDel = await col.deleteMany({
    $or: [{ slug: /freecodecamp/i }, { title: /freecodecamp/i }]
  });
  console.log(`Removed FreeCodeCamp: deleted ${fccDel.deletedCount}`);

  // 3. Remove next.js project (next-js-project-3377 or title 'next.js project')
  const gymDel = await col.deleteMany({
    $or: [
      { slug: "next-js-project-3377" },
      { title: "next.js project" },
      { liveUrl: "https://gym-exercise.netlify.app" }
    ]
  });
  console.log(`Removed next.js project: deleted ${gymDel.deletedCount}`);

  // 4. Add Plane project in place of next.js project
  const existingPlane = await col.findOne({ slug: "plane-workspace-tracking" });
  if (!existingPlane) {
    await col.insertOne({
      title: "Plane - Open-Source Workspace & Issue Tracking",
      slug: "plane-workspace-tracking",
      description: "Modern open-source Jira and Linear alternative built with Next.js App Router, TypeScript, and Docker microservices.",
      longDescription: "Plane is an open-source project management tool to track issues, epics, and product cycles. It features modular Next.js architecture, real-time sync, customizable workflows, board and list views, and self-hosted deployment options.",
      stack: "Next.js",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Docker", "Redis"],
      githubUrl: "https://github.com/makeplane/plane",
      liveUrl: "https://plane.so",
      image: "/projects/plane.png",
      stars: 33500,
      featured: true,
      author: {
        name: "Vihan Sharma",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        role: "Core Systems Architect"
      },
      metrics: {
        views: 41200,
        downloads: 13500,
        likes: 3200
      },
      architecture: [
        "Next.js App Router for modular issue tracking views (Kanban, List, Calendar)",
        "Type-safe APIs orchestrating asynchronous task queues with Redis",
        "Optimistic state management for instant cycle and issue mutations",
        "Self-hosted Docker orchestration with PostgreSQL relational schemas"
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log("Inserted Plane project into MongoDB");
  } else {
    await col.updateOne(
      { slug: "plane-workspace-tracking" },
      { $set: { image: "/projects/plane.png" } }
    );
    console.log("Updated Plane project in MongoDB");
  }

  // Print all projects in MongoDB
  const all = await col.find({}, { projection: { title: 1, slug: 1, image: 1, stack: 1 } }).toArray();
  console.log(`\n=== ALL PROJECTS IN MONGODB NOW (${all.length}) ===`);
  all.forEach((p, idx) => {
    console.log(`${idx + 1}. [${p.stack}] ${p.title} (${p.slug}) => ${p.image}`);
  });

  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
