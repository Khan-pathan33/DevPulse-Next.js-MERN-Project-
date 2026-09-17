import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    stack: { type: String, required: true },
    technologies: [{ type: String }],
    githubUrl: { type: String, required: true },
    liveUrl: { type: String },
    image: { type: String },
    stars: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    author: {
      userId: { type: String },
      email: { type: String },
      name: { type: String, required: true },
      avatar: { type: String },
      role: { type: String },
    },
    metrics: {
      views: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
    },
    architecture: [{ type: String }],
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

const newProjects = [
  {
    title: "Dify - Open-Source LLM App & Workflow Platform",
    slug: "dify-agentic-platform",
    description: "Production-ready open-source platform for agentic workflows, RAG knowledge pipelines, model routing, and visual AI orchestration.",
    longDescription: "Dify is an open-source LLM application development platform that combines AI Workflow, RAG pipelines, Agent capabilities, Model Management, and Observability features. Built with a Next.js web interface and a scalable Python/Flask/Celery backend, Dify enables developers to visually craft complex multi-agent workflows, connect vector databases, and deploy production APIs in minutes.",
    stack: "AI",
    technologies: ["Next.js", "Python", "Flask", "Celery", "Vector DB", "PostgreSQL", "Redis", "RAG", "Agentic AI"],
    githubUrl: "https://github.com/langgenius/dify",
    liveUrl: "https://dify.ai",
    image: "/projects/dify.png",
    stars: 72000,
    featured: true,
    author: {
      name: "Dify Core Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Full-Stack AI Engineering",
    },
    metrics: {
      views: 89400,
      downloads: 31200,
      likes: 8400,
    },
    architecture: [
      "Next.js App Router & React Flow canvas for drag-and-drop agentic workflow graphs",
      "Distributed Python Flask & Celery workers executing asynchronous LLM chain invocations",
      "Hybrid retrieval engine integrating dense vector embeddings and BM25 full-text indexing",
      "Comprehensive enterprise LLMOps observability, token tracking, and fine-grained role permissions",
    ],
  },
  {
    title: "Open WebUI - Self-Hosted Multi-Model AI Platform",
    slug: "openwebui-ai-platform",
    description: "User-friendly, feature-rich self-hosted AI workspace with multi-model support, offline RAG, web search, and fine-grained access control.",
    longDescription: "Open WebUI is an extensible, self-hosted AI interface designed to operate entirely offline or connected to cloud providers. Built with SvelteKit and a high-performance Python FastAPI backend, it supports Ollama, OpenAI-compatible APIs, document ingestion with semantic citations, Python code execution sandboxes, and granular multi-user permissions.",
    stack: "AI",
    technologies: ["Full-Stack", "SvelteKit", "Python", "FastAPI", "Ollama", "OpenAI", "ChromaDB", "RAG"],
    githubUrl: "https://github.com/open-webui/open-webui",
    liveUrl: "https://openwebui.com",
    image: "/projects/openwebui.png",
    stars: 94000,
    featured: true,
    author: {
      name: "Tim Baek",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Open Source Creator",
    },
    metrics: {
      views: 112000,
      downloads: 45000,
      likes: 12100,
    },
    architecture: [
      "SvelteKit reactive frontend with markdown streaming, LaTeX rendering, and code syntax highlighting",
      "High-concurrency FastAPI Python server managing persistent WebSocket streaming and chat sessions",
      "Integrated ChromaDB vector store enabling contextual retrieval across uploaded PDFs and documents",
      "Pluggable tool calling architecture supporting web browsing, image generation, and custom Python functions",
    ],
  },
  {
    title: "AnythingLLM - Full-Stack Private AI Workspace & Document Intelligence",
    slug: "anythingllm-workspace",
    description: "The all-in-one desktop and web AI workspace with built-in vector database, full document chat (RAG), and zero-configuration local LLM privacy.",
    longDescription: "AnythingLLM is a full-stack open-source artificial intelligence application designed for high privacy and flexible document interaction. Featuring a modern React UI and Node.js/Express backend with embedded LanceDB vector storage, it transforms documents, PDFs, and media into queryable knowledge bases with zero data leakage.",
    stack: "AI",
    technologies: ["React", "Node.js", "Express", "LanceDB", "Vector Embeddings", "Tailwind CSS", "Full-Stack AI"],
    githubUrl: "https://github.com/Mintplex-Labs/anything-llm",
    liveUrl: "https://useanything.com",
    image: "/projects/anythingllm.png",
    stars: 35000,
    featured: false,
    author: {
      name: "Mintplex Labs",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "Core Maintainers",
    },
    metrics: {
      views: 52300,
      downloads: 18400,
      likes: 4750,
    },
    architecture: [
      "React single-page frontend with responsive conversation threading and document management",
      "Node.js & Express API backend handling multi-tenant workspaces and system configuration",
      "Embedded serverless LanceDB vector database for blazing-fast localized similarity searches",
      "Custom agent skills and connector pipeline for web scrapers, GitHub repos, and cloud storage",
    ],
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB Atlas.");

  for (const p of newProjects) {
    const res = await Project.findOneAndUpdate(
      { slug: p.slug },
      { $set: p },
      { upsert: true, new: true }
    );
    console.log(`Upserted project: ${res.title} (slug: ${res.slug}, stack: ${res.stack})`);
  }

  const total = await Project.countDocuments();
  console.log(`Total projects in database now: ${total}`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
