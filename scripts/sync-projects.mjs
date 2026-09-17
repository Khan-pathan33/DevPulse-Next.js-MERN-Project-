import fs from "fs";
import mongoose from "mongoose";

// Read MONGODB_URI from .env.local
const envLocal = fs.readFileSync(".env.local", "utf8");
const match = envLocal.match(/MONGODB_URI=(.+)/);
if (!match) {
  console.error("No MONGODB_URI found in .env.local");
  process.exit(1);
}
const uri = match[1].trim();

const list = [
  {
    title: "Next.js Commerce - Enterprise Headless Storefront",
    slug: "nextjs-commerce-platform",
    description: "Production-grade headless e-commerce built with Next.js App Router, React Server Components, Server Actions, and dynamic streaming.",
    longDescription: "Next.js Commerce is the industry-standard reference architecture for building ultra-fast online storefronts. It leverages React Server Components for zero client-bundle product pages, edge middleware for dynamic geo-routing, Server Actions for instant cart mutations, and Suspense streaming for non-blocking page loads.",
    stack: "Next.js",
    technologies: ["Next.js 15+", "React 19", "Server Actions", "TypeScript", "Tailwind CSS", "Shopify API", "Edge Runtime"],
    githubUrl: "https://github.com/vercel/commerce",
    liveUrl: "https://demo.vercel.store",
    stars: 16400,
    featured: true,
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Staff Frontend Engineer"
    },
    metrics: { views: 48200, downloads: 14200, likes: 3890 },
    architecture: [
      "React Server Components for instant edge-rendered product catalogs",
      "Next.js Server Actions handling cart mutations with optimistic updates",
      "Streaming with Suspense for non-blocking product reviews and recommendations",
      "Edge Middleware verifying geo-location headers and currency localization"
    ]
  },
  {
    title: "Next.js SaaS Starter - Full-Stack Stripe & Drizzle Template",
    slug: "nextjs-saas-starter",
    description: "Production SaaS boilerplate with Next.js App Router, React 19, Postgres, Drizzle ORM, Stripe subscriptions, and team management.",
    longDescription: "Created by Lee Robinson (VP of Product at Vercel), this high-performance SaaS template provides everything needed to launch a full-scale web application. It includes multi-tenant team accounts, Stripe customer billing portals, secure Auth.js cookie sessions, and optimistic UI mutations.",
    stack: "Next.js",
    technologies: ["Next.js 15+", "React 19", "TypeScript", "Tailwind CSS", "Postgres", "Drizzle ORM", "Stripe", "Auth.js"],
    githubUrl: "https://github.com/leerob/next-saas-starter",
    liveUrl: "https://next-saas-starter-ashy.vercel.app",
    stars: 12800,
    featured: true,
    author: {
      name: "Lee Robinson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "VP of Product"
    },
    metrics: { views: 39100, downloads: 11800, likes: 2940 },
    architecture: [
      "Type-safe database migrations with Drizzle ORM and Neon Serverless Postgres",
      "Stripe Webhook event handling for automated customer subscription lifecycles",
      "Session-based cookie authentication with ironclad security headers",
      "Hierarchical layouts with server-side role and team permission checks"
    ]
  },
  {
    title: "Vercel AI Chatbot - Full-Stack Next.js AI Assistant",
    slug: "vercel-ai-chatbot",
    description: "Open-source AI chat application built with Next.js App Router, the Vercel AI SDK, OpenAI streaming, and Postgres session persistence.",
    longDescription: "A comprehensive reference implementation of modern AI application development. Features streaming chat responses with standard Web Streams, client-side optimistic UI updates, tool calling integrations, multimodal image uploads, and persistent session trees.",
    stack: "AI",
    technologies: ["Next.js", "AI SDK", "OpenAI", "React Server Components", "TypeScript", "Tailwind CSS", "Postgres"],
    githubUrl: "https://github.com/vercel/ai-chatbot",
    liveUrl: "https://chatbot.ai-sdk.dev",
    stars: 14800,
    featured: true,
    author: {
      name: "Maya Lin",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      role: "AI Application Specialist"
    },
    metrics: { views: 52400, downloads: 18900, likes: 4120 },
    architecture: [
      "Streaming text generation using Next.js Route Handlers and Web Streams API",
      "React 19 Server Actions for conversation saving and model configuration",
      "Client-side optimistic chat bubbles with markdown syntax highlighting",
      "Dynamic OpenGraph preview generation for chat sharing"
    ]
  },
  {
    title: "LibreChat - Open-Source Multi-Model AI Studio",
    slug: "librechat-ai-workspace",
    description: "Enterprise-grade AI chat platform integrating OpenAI, Claude, Gemini, and local models with MongoDB persistence and plugins.",
    longDescription: "LibreChat is a premier open-source AI platform uniting every major LLM provider into a single, polished web application. Built with Node.js, Express, MongoDB, and React, it features speech-to-text, generative image workflows, custom presets, file search RAG, and multi-user authentication.",
    stack: "AI",
    technologies: ["React", "Node.js", "Express", "MongoDB", "OpenAI", "Anthropic Claude", "Docker", "Tailwind CSS"],
    githubUrl: "https://github.com/danny-avila/LibreChat",
    liveUrl: "https://librechat.ai",
    stars: 24300,
    featured: true,
    author: {
      name: "Danny Avila",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      role: "AI Systems Architect"
    },
    metrics: { views: 46200, downloads: 15700, likes: 3820 },
    architecture: [
      "Unified provider abstraction layer supporting OpenAI, Anthropic, and Ollama",
      "MongoDB document storage with index-optimized chat message history",
      "Retrieval-Augmented Generation (RAG) pipeline for document analysis",
      "Token-efficient streaming SSE (Server-Sent Events) backend pipeline"
    ]
  },
  {
    title: "Payload CMS - Next.js & MongoDB Full-Stack CMS",
    slug: "payload-cms-mern",
    description: "Enterprise headless CMS and application framework with native MongoDB Mongoose schemas, Express routes, and React 19 admin panel.",
    longDescription: "Payload demonstrates the pinnacle of full-stack TypeScript and MERN architecture. It features native MongoDB database adapters with high-throughput indexing, automated GraphQL and REST endpoint generation, role-based access control, and seamless Next.js App Router integration.",
    stack: "MERN",
    technologies: ["MongoDB", "Mongoose", "Express", "React", "Node.js", "Next.js", "TypeScript", "GraphQL"],
    githubUrl: "https://github.com/payloadcms/payload",
    liveUrl: "https://payloadcms.com",
    stars: 31200,
    featured: true,
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Principal Systems Architect"
    },
    metrics: { views: 39500, downloads: 11400, likes: 2950 },
    architecture: [
      "Native MongoDB Mongoose driver integration with custom connection pooling",
      "Full Express and Next.js Route Handler compatibility for custom endpoints",
      "Zero-config auto-generated GraphQL schema and REST APIs",
      "Granular document-level and field-level access control hooks"
    ]
  },
  {
    title: "FreeCodeCamp - Open-Source MERN Learning Platform",
    slug: "freecodecamp-mern-platform",
    description: "The world's largest open-source developer curriculum platform powered by MongoDB, Express, React, and Node.js microservices.",
    longDescription: "FreeCodeCamp is the world's most acclaimed MERN stack open-source educational system. It demonstrates large-scale MongoDB aggregation pipelines, high-throughput Node.js microservices, interactive code evaluation workers, and progressive web app capabilities serving millions of daily learners.",
    stack: "MERN",
    technologies: ["MongoDB", "Express", "React", "Node.js", "TypeScript", "Docker", "Tailwind CSS", "Jest"],
    githubUrl: "https://github.com/freeCodeCamp/freeCodeCamp",
    liveUrl: "https://www.freecodecamp.org",
    stars: 405000,
    featured: false,
    author: {
      name: "Quincy Larson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "Community Lead Architect"
    },
    metrics: { views: 89000, downloads: 45000, likes: 18200 },
    architecture: [
      "MongoDB distributed cluster handling millions of daily user progress documents",
      "Node.js microservice architecture with asynchronous job queues",
      "Interactive in-browser code editor running in Web Workers",
      "Comprehensive Jest test suites with continuous integration pipelines"
    ]
  },
  {
    title: "Habitica - Gamified MERN Productivity RPG",
    slug: "habitica-mern-gamification",
    description: "Open-source habit building and life RPG application powered by MongoDB, Express, Node.js, and real-time Socket.io quest syncing.",
    longDescription: "Habitica turns real life into a role-playing game. Built on the classic MERN backend architecture with MongoDB document schemas and Node.js Express APIs, it orchestrates complex inventory calculations, party quest damage formulas, and real-time socket events for over 4 million players worldwide.",
    stack: "MERN",
    technologies: ["MongoDB", "Mongoose", "Express", "Node.js", "Vue/React", "Socket.io", "Redis", "TypeScript"],
    githubUrl: "https://github.com/HabitRPG/habitica",
    liveUrl: "https://habitica.com",
    stars: 11900,
    featured: false,
    author: {
      name: "Tyler Renelle",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Core Game Architect"
    },
    metrics: { views: 31200, downloads: 8700, likes: 2450 },
    architecture: [
      "Complex MongoDB document models tracking character stats, gear, and daily habits",
      "Express REST API with fine-grained rate limiting and webhook callbacks",
      "Socket.io real-time party combat and boss health synchronization",
      "Redis caching layer accelerating leaderboard rankings and quest drops"
    ]
  },
  {
    title: "Dub.co - Open-Source Link Management Engine",
    slug: "dub-link-management",
    description: "High-performance link attribution and shortener platform with Next.js App Router, edge redirects, and real-time geo-analytics.",
    longDescription: "Dub is a modern open-source link infrastructure platform. It uses Next.js edge middleware for sub-10ms URL redirects, Upstash Redis for distributed rate-limiting and caching, and Prisma with PostgreSQL for deep click attribution and analytics aggregation.",
    stack: "FullStack",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Upstash Redis", "Tinybird"],
    githubUrl: "https://github.com/dubinc/dub",
    liveUrl: "https://dub.co",
    stars: 20500,
    featured: false,
    author: {
      name: "Steven Tey",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      role: "Staff Systems Engineer"
    },
    metrics: { views: 29800, downloads: 7200, likes: 2150 },
    architecture: [
      "Edge Middleware routing for instant global URL redirection",
      "Upstash Redis caching layer preventing origin database overload",
      "Real-time streaming click telemetry with Tinybird clickhouse backend",
      "Custom domain verification with automatic SSL certificate provisioning"
    ]
  },
  {
    title: "Excalidraw - Virtual Whiteboard & Real-Time Canvas",
    slug: "excalidraw-collaborative-canvas",
    description: "Hand-drawn virtual whiteboard with end-to-end encryption, local-first offline persistence, and real-time multiplayer rooms.",
    longDescription: "Excalidraw is an open-source virtual whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel. Features end-to-end encrypted collaboration via WebSockets, Canvas 2D rendering optimizations, and PWA offline support.",
    stack: "FullStack",
    technologies: ["React", "TypeScript", "Canvas API", "WebSockets", "Node.js", "WebRTC", "Rough.js"],
    githubUrl: "https://github.com/excalidraw/excalidraw",
    liveUrl: "https://excalidraw.com",
    stars: 92400,
    featured: false,
    author: {
      name: "Sophie Zhang",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      role: "Frontend Graphics Engineer"
    },
    metrics: { views: 64100, downloads: 22000, likes: 5400 },
    architecture: [
      "Custom 60fps Canvas 2D rendering engine using Rough.js vector algorithms",
      "End-to-end encryption via WebSockets and WebCrypto API",
      "Local-first IndexedDB persistence for offline whiteboard diagramming",
      "Multiplayer cursor interpolation with delta compression"
    ]
  },
  {
    title: "Cal.com - Open-Source Scheduling Infrastructure",
    slug: "calcom-scheduling-platform",
    description: "Self-hostable enterprise appointment scheduling infrastructure with calendar integrations, video room triggers, and team routing.",
    longDescription: "Cal.com is the open-source Calendly alternative. Engineered with Next.js, React, TypeScript, and Prisma, it features multi-calendar synchronization, dynamic availability calculation algorithms, payment collection, and enterprise webhooks.",
    stack: "FullStack",
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "tRPC", "Tailwind CSS", "Node.js"],
    githubUrl: "https://github.com/calcom/cal.com",
    liveUrl: "https://cal.com",
    stars: 35000,
    featured: false,
    author: {
      name: "Peer Richelsen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Infrastructure Lead"
    },
    metrics: { views: 37400, downloads: 9800, likes: 2840 },
    architecture: [
      "Modular Next.js monorepo with tRPC for end-to-end type safety",
      "Complex recurring calendar collision algorithms with timezone calculations",
      "Webhook trigger system dispatching meeting confirmations and reminders",
      "App store architecture for third-party Zoom, Google Meet, and Stripe plugins"
    ]
  }
];

async function sync() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  const col = mongoose.connection.collection("projects");

  // Delete legacy dummy projects
  const delRes = await col.deleteMany({
    $or: [
      { githubUrl: { $regex: "example" } },
      { slug: { $in: [
        "nexusflow-mern-saas",
        "auracommerce-nextjs",
        "cryptopulse-mern-defi",
        "neurodoc-nextjs-ai",
        "cloudmatrix-devops-portal",
        "pulsesync-mern-community",
        "taxonomy-nextjs-app"
      ] } }
    ]
  });
  console.log("Deleted dummy projects count:", delRes.deletedCount);

  for (const item of list) {
    const existing = await col.findOne({ slug: item.slug });
    if (!existing) {
      await col.insertOne({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log("Inserted new project:", item.slug);
    } else {
      await col.updateOne(
        { slug: item.slug },
        {
          $set: {
            title: item.title,
            description: item.description,
            longDescription: item.longDescription,
            stack: item.stack,
            technologies: item.technologies,
            githubUrl: item.githubUrl,
            liveUrl: item.liveUrl,
            author: item.author,
            architecture: item.architecture,
            updatedAt: new Date()
          }
        }
      );
      console.log("Updated existing project:", item.slug);
    }
  }

  // Print all projects in MongoDB now
  const all = await col.find({}).toArray();
  console.log("\n=== ALL PROJECTS IN MONGODB NOW (" + all.length + ") ===");
  all.forEach(p => {
    console.log(`- [${p.stack}] ${p.title} (${p.slug})`);
    console.log(`    GitHub: ${p.githubUrl}`);
    console.log(`    Live:   ${p.liveUrl}`);
  });

  await mongoose.disconnect();
}

sync().catch(err => {
  console.error("Sync error:", err);
  process.exit(1);
});
