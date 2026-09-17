export interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  stack: "MERN" | "Next.js" | "FullStack" | "AI";
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  stars: number;
  featured: boolean;
  author: {
    userId?: string;
    email?: string;
    name: string;
    avatar: string;
    role: string;
  };
  metrics: {
    views: number;
    downloads: number;
    likes: number;
  };
  architecture: string[];
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_PROJECTS: ProjectData[] = [
  {
    _id: "nextjs-commerce-store",
    title: "Next.js Commerce - Enterprise Headless Storefront",
    slug: "nextjs-commerce-platform",
    description: "Production-grade headless e-commerce built with Next.js App Router, React Server Components, Server Actions, and dynamic streaming.",
    longDescription: "Next.js Commerce is the industry-standard reference architecture for building ultra-fast online storefronts. It leverages React Server Components for zero client-bundle product pages, edge middleware for dynamic geo-routing, Server Actions for instant cart mutations, and Suspense streaming for non-blocking page loads.",
    stack: "Next.js",
    technologies: ["Next.js 15+", "React 19", "Server Actions", "TypeScript", "Tailwind CSS", "Shopify API", "Edge Runtime"],
    githubUrl: "https://github.com/vercel/commerce",
    liveUrl: "https://demo.vercel.store",
    image: "/projects/commerce.png",
    stars: 16400,
    featured: true,
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Staff Frontend Engineer",
    },
    metrics: {
      views: 48200,
      downloads: 14200,
      likes: 3890,
    },
    architecture: [
      "React Server Components for instant edge-rendered product catalogs",
      "Next.js Server Actions handling cart mutations with optimistic updates",
      "Streaming with Suspense for non-blocking product reviews and recommendations",
      "Edge Middleware verifying geo-location headers and currency localization",
    ],
    createdAt: "2026-01-15T08:30:00.000Z",
    updatedAt: "2026-03-01T14:20:00.000Z",
  },
  {
    _id: "nextjs-saas-starter-pro",
    title: "Next.js SaaS Starter - Full-Stack Stripe & Drizzle Template",
    slug: "nextjs-saas-starter",
    description: "Production SaaS boilerplate with Next.js App Router, React 19, Postgres, Drizzle ORM, Stripe subscriptions, and team management.",
    longDescription: "Created by Lee Robinson (VP of Product at Vercel), this high-performance SaaS template provides everything needed to launch a full-scale web application. It includes multi-tenant team accounts, Stripe customer billing portals, secure Auth.js cookie sessions, and optimistic UI mutations.",
    stack: "Next.js",
    technologies: ["Next.js 15+", "React 19", "TypeScript", "Tailwind CSS", "Postgres", "Drizzle ORM", "Stripe", "Auth.js"],
    githubUrl: "https://github.com/leerob/next-saas-starter",
    liveUrl: "https://next-saas-starter-ashy.vercel.app",
    image: "/projects/saas-starter.png",
    stars: 12800,
    featured: true,
    author: {
      name: "Lee Robinson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "VP of Product",
    },
    metrics: {
      views: 39100,
      downloads: 11800,
      likes: 2940,
    },
    architecture: [
      "Type-safe database migrations with Drizzle ORM and Neon Serverless Postgres",
      "Stripe Webhook event handling for automated customer subscription lifecycles",
      "Session-based cookie authentication with ironclad security headers",
      "Hierarchical layouts with server-side role and team permission checks",
    ],
    createdAt: "2026-01-20T10:15:00.000Z",
    updatedAt: "2026-03-03T11:45:00.000Z",
  },
  {
    _id: "vercel-ai-chatbot",
    title: "Vercel AI Chatbot - Full-Stack Next.js AI Assistant",
    slug: "vercel-ai-chatbot",
    description: "Open-source AI chat application built with Next.js App Router, the Vercel AI SDK, OpenAI streaming, and Postgres session persistence.",
    longDescription: "A comprehensive reference implementation of modern AI application development. Features streaming chat responses with standard Web Streams, client-side optimistic UI updates, tool calling integrations, multimodal image uploads, and persistent session trees.",
    stack: "AI",
    technologies: ["Next.js", "AI SDK", "OpenAI", "React Server Components", "TypeScript", "Tailwind CSS", "Postgres"],
    githubUrl: "https://github.com/vercel/ai-chatbot",
    liveUrl: "https://chatbot.ai-sdk.dev",
    image: "/projects/chatbot.png",
    stars: 14800,
    featured: true,
    author: {
      name: "Maya Lin",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      role: "AI Application Specialist",
    },
    metrics: {
      views: 52400,
      downloads: 18900,
      likes: 4120,
    },
    architecture: [
      "Streaming text generation using Next.js Route Handlers and Web Streams API",
      "React 19 Server Actions for conversation saving and model configuration",
      "Client-side optimistic chat bubbles with markdown syntax highlighting",
      "Dynamic OpenGraph preview generation for chat sharing",
    ],
    createdAt: "2026-01-28T14:40:00.000Z",
    updatedAt: "2026-03-10T18:10:00.000Z",
  },
  {
    _id: "librechat-ai-workspace",
    title: "LibreChat - Open-Source Multi-Model AI Studio",
    slug: "librechat-ai-workspace",
    description: "Enterprise-grade AI chat platform integrating OpenAI, Claude, Gemini, and local models with MongoDB persistence and plugins.",
    longDescription: "LibreChat is a premier open-source AI platform uniting every major LLM provider into a single, polished web application. Built with Node.js, Express, MongoDB, and React, it features speech-to-text, generative image workflows, custom presets, file search RAG, and multi-user authentication.",
    stack: "AI",
    technologies: ["React", "Node.js", "Express", "MongoDB", "OpenAI", "Anthropic Claude", "Docker", "Tailwind CSS"],
    githubUrl: "https://github.com/danny-avila/LibreChat",
    liveUrl: "https://librechat.ai",
    image: "/projects/librechat.png",
    stars: 24300,
    featured: true,
    author: {
      name: "Danny Avila",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      role: "AI Systems Architect",
    },
    metrics: {
      views: 46200,
      downloads: 15700,
      likes: 3820,
    },
    architecture: [
      "Unified provider abstraction layer supporting OpenAI, Anthropic, and Ollama",
      "MongoDB document storage with index-optimized chat message history",
      "Retrieval-Augmented Generation (RAG) pipeline for document analysis",
      "Token-efficient streaming SSE (Server-Sent Events) backend pipeline",
    ],
    createdAt: "2026-02-02T16:00:00.000Z",
    updatedAt: "2026-03-08T09:15:00.000Z",
  },
  {
    _id: "payload-cms-mern",
    title: "Payload CMS - Next.js & MongoDB Full-Stack CMS",
    slug: "payload-cms-mern",
    description: "Enterprise headless CMS and application framework with native MongoDB Mongoose schemas, Express routes, and React 19 admin panel.",
    longDescription: "Payload demonstrates the pinnacle of full-stack TypeScript and MERN architecture. It features native MongoDB database adapters with high-throughput indexing, automated GraphQL and REST endpoint generation, role-based access control, and seamless Next.js App Router integration.",
    stack: "MERN",
    technologies: ["MongoDB", "Mongoose", "Express", "React", "Node.js", "Next.js", "TypeScript", "GraphQL"],
    githubUrl: "https://github.com/payloadcms/payload",
    liveUrl: "https://payloadcms.com",
    image: "/projects/payload.png",
    stars: 31200,
    featured: true,
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Principal Systems Architect",
    },
    metrics: {
      views: 39500,
      downloads: 11400,
      likes: 2950,
    },
    architecture: [
      "Native MongoDB Mongoose driver integration with custom connection pooling",
      "Full Express and Next.js Route Handler compatibility for custom endpoints",
      "Zero-config auto-generated GraphQL schema and REST APIs",
      "Granular document-level and field-level access control hooks",
    ],
    createdAt: "2026-02-01T10:00:00.000Z",
    updatedAt: "2026-03-05T12:00:00.000Z",
  },
  {
    _id: "plane-workspace-tracking",
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
      role: "Core Systems Architect",
    },
    metrics: {
      views: 41200,
      downloads: 13500,
      likes: 3200,
    },
    architecture: [
      "Next.js App Router for modular issue tracking views (Kanban, List, Calendar)",
      "Type-safe APIs orchestrating asynchronous task queues with Redis",
      "Optimistic state management for instant cycle and issue mutations",
      "Self-hosted Docker orchestration with PostgreSQL relational schemas",
    ],
    createdAt: "2026-02-15T09:00:00.000Z",
    updatedAt: "2026-03-02T16:00:00.000Z",
  },
  {
    _id: "habitica-mern-rpg",
    title: "Habitica - Gamified MERN Productivity RPG",
    slug: "habitica-mern-gamification",
    description: "Open-source habit building and life RPG application powered by MongoDB, Express, Node.js, and real-time Socket.io quest syncing.",
    longDescription: "Habitica turns real life into a role-playing game. Built on the classic MERN backend architecture with MongoDB document schemas and Node.js Express APIs, it orchestrates complex inventory calculations, party quest damage formulas, and real-time socket events for over 4 million players worldwide.",
    stack: "MERN",
    technologies: ["MongoDB", "Mongoose", "Express", "Node.js", "Vue/React", "Socket.io", "Redis", "TypeScript"],
    githubUrl: "https://github.com/HabitRPG/habitica",
    liveUrl: "https://habitica.com",
    image: "/projects/habitica.png",
    stars: 11900,
    featured: false,
    author: {
      name: "Tyler Renelle",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Core Game Architect",
    },
    metrics: {
      views: 31200,
      downloads: 8700,
      likes: 2450,
    },
    architecture: [
      "Complex MongoDB document models tracking character stats, gear, and daily habits",
      "Express REST API with fine-grained rate limiting and webhook callbacks",
      "Socket.io real-time party combat and boss health synchronization",
      "Redis caching layer accelerating leaderboard rankings and quest drops",
    ],
    createdAt: "2026-02-16T11:20:00.000Z",
    updatedAt: "2026-03-06T13:40:00.000Z",
  },
  {
    _id: "dub-link-management",
    title: "Dub.co - Open-Source Link Management Engine",
    slug: "dub-link-management",
    description: "High-performance link attribution and shortener platform with Next.js App Router, edge redirects, and real-time geo-analytics.",
    longDescription: "Dub is a modern open-source link infrastructure platform. It uses Next.js edge middleware for sub-10ms URL redirects, Upstash Redis for distributed rate-limiting and caching, and Prisma with PostgreSQL for deep click attribution and analytics aggregation.",
    stack: "FullStack",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Upstash Redis", "Tinybird"],
    githubUrl: "https://github.com/dubinc/dub",
    liveUrl: "https://dub.co",
    image: "/projects/dub.png",
    stars: 20500,
    featured: false,
    author: {
      name: "Steven Tey",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      role: "Staff Systems Engineer",
    },
    metrics: {
      views: 29800,
      downloads: 7200,
      likes: 2150,
    },
    architecture: [
      "Edge Middleware routing for instant global URL redirection",
      "Upstash Redis caching layer preventing origin database overload",
      "Real-time streaming click telemetry with Tinybird clickhouse backend",
      "Custom domain verification with automatic SSL certificate provisioning",
    ],
    createdAt: "2026-02-18T11:00:00.000Z",
    updatedAt: "2026-03-08T14:30:00.000Z",
  },
  {
    _id: "excalidraw-canvas",
    title: "Excalidraw - Virtual Whiteboard & Real-Time Canvas",
    slug: "excalidraw-collaborative-canvas",
    description: "Hand-drawn virtual whiteboard with end-to-end encryption, local-first offline persistence, and real-time multiplayer rooms.",
    longDescription: "Excalidraw is an open-source virtual whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel. Features end-to-end encrypted collaboration via WebSockets, Canvas 2D rendering optimizations, and PWA offline support.",
    stack: "FullStack",
    technologies: ["React", "TypeScript", "Canvas API", "WebSockets", "Node.js", "WebRTC", "Rough.js"],
    githubUrl: "https://github.com/excalidraw/excalidraw",
    liveUrl: "https://excalidraw.com",
    image: "/projects/excalidraw.png",
    stars: 92400,
    featured: false,
    author: {
      name: "Sophie Zhang",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      role: "Frontend Graphics Engineer",
    },
    metrics: {
      views: 64100,
      downloads: 22000,
      likes: 5400,
    },
    architecture: [
      "Custom 60fps Canvas 2D rendering engine using Rough.js vector algorithms",
      "End-to-end encryption via WebSockets and WebCrypto API",
      "Local-first IndexedDB persistence for offline whiteboard diagramming",
      "Multiplayer cursor interpolation with delta compression",
    ],
    createdAt: "2026-02-20T12:00:00.000Z",
    updatedAt: "2026-03-11T15:00:00.000Z",
  },
  {
    _id: "calcom-scheduling",
    title: "Cal.com - Open-Source Scheduling Infrastructure",
    slug: "calcom-scheduling-platform",
    description: "Self-hostable enterprise appointment scheduling infrastructure with calendar integrations, video room triggers, and team routing.",
    longDescription: "Cal.com is the open-source Calendly alternative. Engineered with Next.js, React, TypeScript, and Prisma, it features multi-calendar synchronization, dynamic availability calculation algorithms, payment collection, and enterprise webhooks.",
    stack: "FullStack",
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "tRPC", "Tailwind CSS", "Node.js"],
    githubUrl: "https://github.com/calcom/cal.com",
    liveUrl: "https://cal.com",
    image: "/projects/calcom.png",
    stars: 35000,
    featured: false,
    author: {
      name: "Peer Richelsen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Infrastructure Lead",
    },
    metrics: {
      views: 37400,
      downloads: 9800,
      likes: 2840,
    },
    architecture: [
      "Modular Next.js monorepo with tRPC for end-to-end type safety",
      "Complex recurring calendar collision algorithms with timezone calculations",
      "Webhook trigger system dispatching meeting confirmations and reminders",
      "App store architecture for third-party Zoom, Google Meet, and Stripe plugins",
    ],
    createdAt: "2026-02-25T14:00:00.000Z",
    updatedAt: "2026-03-14T09:30:00.000Z",
  },
  {
    _id: "dify-agentic-platform",
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
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-16T12:00:00.000Z",
  },
  {
    _id: "openwebui-ai-platform",
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
    createdAt: "2026-03-02T11:30:00.000Z",
    updatedAt: "2026-03-16T14:15:00.000Z",
  },
  {
    _id: "anythingllm-workspace",
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
    createdAt: "2026-03-05T09:00:00.000Z",
    updatedAt: "2026-03-16T16:00:00.000Z",
  }
];

export const INITIAL_REVIEWS = [
  {
    _id: "rev-1",
    projectId: "nextjs-commerce-store",
    authorName: "Sarah Jenkins",
    authorEmail: "sarah@techcorp.io",
    rating: 5,
    comment: "Server Actions with optimistic UI updates make the checkout experience lightning fast!",
    createdAt: "2026-02-01T12:00:00.000Z",
  },
  {
    _id: "rev-2",
    projectId: "vercel-ai-chatbot",
    authorName: "David Cole",
    authorEmail: "david@ecomscale.com",
    rating: 5,
    comment: "The streaming Web Streams integration feels instantaneous. Cleanest AI SDK implementation out there.",
    createdAt: "2026-02-15T15:30:00.000Z",
  },
  {
    _id: "rev-3",
    projectId: "payload-cms-mern",
    authorName: "Marcus Vance",
    authorEmail: "marcus@devscale.co",
    rating: 5,
    comment: "Payload's MongoDB schema generation and Next.js App Router admin panel is pure architectural mastery.",
    createdAt: "2026-02-20T09:15:00.000Z",
  },
  {
    _id: "rev-4",
    projectId: "freecodecamp-mern",
    authorName: "Amina K.",
    authorEmail: "amina@fullstack.dev",
    rating: 5,
    comment: "Inspiring MERN architecture at planetary scale. MongoDB aggregation pipelines are so well structured.",
    createdAt: "2026-02-28T11:45:00.000Z",
  },
  {
    _id: "rev-5",
    projectId: "librechat-ai-workspace",
    authorName: "Kenji Sato",
    authorEmail: "kenji@neuralflow.io",
    rating: 5,
    comment: "Connecting multi-modal LLMs through a single self-hosted MERN platform has transformed our workflow.",
    createdAt: "2026-03-02T14:10:00.000Z",
  },
  {
    _id: "rev-6",
    projectId: "nextjs-saas-starter-pro",
    authorName: "Rachel Greene",
    authorEmail: "rachel@cloudventures.co",
    rating: 5,
    comment: "The Drizzle ORM and Stripe integration is rock-solid. Saved us weeks of initial infrastructure code.",
    createdAt: "2026-03-05T16:20:00.000Z",
  }
];

export interface UserData {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: "user" | "admin";
  avatar: string;
  bio: string;
  createdAt: string;
}

export const INITIAL_USERS: UserData[] = [
  {
    _id: "user-admin-1",
    name: "DevPulse Admin",
    email: "admin@devpulse.io",
    passwordHash: "2f0961f785909a954c3be6dcdaa6c6024c5011fc12ac3a48304c097f0519ece2536089007ace5c4d2271b592d8ec43209596e5f98d2160985d5194e5dbed02d1",
    salt: "devpulse_salt_2026",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    bio: "Lead System Architect & DevPulse Platform Administrator.",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "user-dev-1",
    name: "Alex Rivera",
    email: "user@devpulse.io",
    passwordHash: "eab36a112cc349267351468f8eeb0c6a2c14a9f4f1643a503ae13aae519a74023743de4012f74a948e09ba0ed802791cfecf5d7d5caa3fc1a340b68a3a94bab7",
    salt: "devpulse_salt_2026",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    bio: "Senior Full Stack Engineer building high-throughput MERN applications.",
    createdAt: "2026-01-10T12:00:00.000Z",
  },
  {
    _id: "user-dev-2",
    name: "Sarah Chen",
    email: "sarah@devpulse.io",
    passwordHash: "eab36a112cc349267351468f8eeb0c6a2c14a9f4f1643a503ae13aae519a74023743de4012f74a948e09ba0ed802791cfecf5d7d5caa3fc1a340b68a3a94bab7",
    salt: "devpulse_salt_2026",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    bio: "React 19 Specialist & Next.js Performance Optimizer.",
    createdAt: "2026-02-05T09:30:00.000Z",
  }
];

export interface AuditLogData {
  _id: string;
  action: string;
  actor: string;
  details: string;
  target?: string;
  type: "user" | "project" | "system" | "security";
  createdAt: string;
}

export const INITIAL_AUDIT_LOGS: AuditLogData[] = [
  {
    _id: "log-1",
    action: "System Initialization",
    actor: "System Engine",
    details: "DevPulse dual-mode architecture initialized with Next.js 16 and React 19.",
    type: "system",
    createdAt: "2026-03-01T08:00:00.000Z",
  },
  {
    _id: "log-2",
    action: "Staff Role Assigned",
    actor: "SuperAdmin",
    details: "Granted role 'admin' with global moderation privileges.",
    target: "admin@devpulse.io",
    type: "security",
    createdAt: "2026-03-05T10:15:00.000Z",
  },
  {
    _id: "log-3",
    action: "Project Featured",
    actor: "admin@devpulse.io",
    details: "Flagged 'Next.js Commerce' as featured storefront architecture.",
    target: "nextjs-commerce-platform",
    type: "project",
    createdAt: "2026-03-10T14:30:00.000Z",
  },
  {
    _id: "log-4",
    action: "User Registered",
    actor: "user@devpulse.io",
    details: "New developer account created and verified with encrypted credentials.",
    target: "user@devpulse.io",
    type: "user",
    createdAt: "2026-03-12T16:45:00.000Z",
  }
];

export function getProjectFallbackImage(stack?: string, slug?: string): string {
  if (slug?.includes("commerce")) {
    return "/projects/commerce.png";
  }
  if (slug?.includes("plane")) {
    return "/projects/plane.png";
  }
  if (slug?.includes("habitica")) {
    return "/projects/habitica.png";
  }
  if (slug?.includes("librechat")) {
    return "/projects/librechat.png";
  }
  if (slug?.includes("saas")) {
    return "/projects/saas-starter.png";
  }
  if (slug?.includes("calcom") || slug?.includes("cal.com")) {
    return "/projects/calcom.png";
  }
  if (slug?.includes("dub")) {
    return "/projects/dub.png";
  }
  if (slug?.includes("excalidraw")) {
    return "/projects/excalidraw.png";
  }
  if (slug?.includes("payload")) {
    return "/projects/payload.png";
  }
  if (slug?.includes("chatbot") || slug?.includes("ai-chatbot")) {
    return "/projects/chatbot.png";
  }
  if (slug?.includes("dify")) {
    return "/projects/dify.png";
  }
  if (slug?.includes("openwebui") || slug?.includes("open-webui")) {
    return "/projects/openwebui.png";
  }
  if (slug?.includes("anythingllm") || slug?.includes("anything-llm")) {
    return "/projects/anythingllm.png";
  }
  switch (stack) {
    case "Next.js":
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80";
    case "AI":
      return "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80";
    case "MERN":
      return "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80";
    case "FullStack":
    default:
      return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80";
  }
}

