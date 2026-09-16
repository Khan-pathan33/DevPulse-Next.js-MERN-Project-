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
  stars: number;
  featured: boolean;
  author: {
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
    _id: "mern-saas-nexus",
    title: "NexusFlow - MERN SaaS Workspace",
    slug: "nexusflow-mern-saas",
    description: "Enterprise project management suite with MongoDB aggregation, Express micro-services, React 19 Kanban, and Node cluster workers.",
    longDescription: "NexusFlow demonstrates a production-grade MERN architecture. It features high-throughput MongoDB change streams for real-time collaboration, JWT token rotation with Redis session cache, dynamic role-based access control, and optimized indexing for sub-10ms query execution across 100k+ documents.",
    stack: "MERN",
    technologies: ["MongoDB", "Express.js", "React 19", "Node.js", "Mongoose", "Socket.io", "Tailwind CSS", "Redis"],
    githubUrl: "https://github.com/example/nexusflow-mern",
    liveUrl: "https://nexusflow-demo.vercel.app",
    stars: 1240,
    featured: true,
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Principal Systems Architect",
    },
    metrics: {
      views: 18450,
      downloads: 4230,
      likes: 890,
    },
    architecture: [
      "MongoDB Replica Set with Read Preference 'secondaryPreferred'",
      "Express REST API with custom rate-limiting and validation middleware",
      "React 19 with Optimistic UI updates & Server-Sent Events",
      "Node.js Worker Threads for background report compilation",
    ],
    createdAt: "2026-01-15T08:30:00.000Z",
    updatedAt: "2026-03-01T14:20:00.000Z",
  },
  {
    _id: "nextjs-craft-ecommerce",
    title: "AuraCommerce - Next.js App Router Platform",
    slug: "auracommerce-nextjs",
    description: "Ultra-fast headless commerce built with Next.js App Router, Server Actions, Dynamic Segments, and Incremental Static Regeneration.",
    longDescription: "AuraCommerce leverages Next.js App Router capabilities including generateStaticParams for instant edge-rendered product catalogs, React Server Components for zero client-bundle payload on catalog pages, and Server Actions for frictionless cart checkout and optimistic inventory updates.",
    stack: "Next.js",
    technologies: ["Next.js 15+", "React 19", "TypeScript", "Tailwind CSS v4", "Server Actions", "PostgreSQL", "Prisma"],
    githubUrl: "https://github.com/example/auracommerce",
    liveUrl: "https://auracommerce-demo.vercel.app",
    stars: 2890,
    featured: true,
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Staff Frontend Engineer",
    },
    metrics: {
      views: 34200,
      downloads: 8720,
      likes: 1950,
    },
    architecture: [
      "Next.js App Router with Route Handlers and Edge runtime middleware",
      "ISR with 60-second revalidation tags for instant stale-while-revalidate",
      "Streaming with Suspense for non-blocking product reviews",
      "Parallel routes for simultaneous cart modal and product gallery",
    ],
    createdAt: "2026-02-10T11:15:00.000Z",
    updatedAt: "2026-03-08T09:45:00.000Z",
  },
  {
    _id: "mern-crypto-pulse",
    title: "CryptoPulse - MERN DeFi Analytics",
    slug: "cryptopulse-mern-defi",
    description: "Live cryptocurrency portfolio tracker with MongoDB time-series collections, Express streaming endpoints, and high-DPI canvas charts.",
    longDescription: "Built specifically to demonstrate MongoDB 7.0+ Time Series collections paired with Node.js async iterators. Provides real-time order-book analytics, gas fee trend predictions, and secure multi-wallet OAuth aggregation.",
    stack: "MERN",
    technologies: ["MongoDB TimeSeries", "Express", "React", "Node.js", "WebSockets", "Chart.js", "Ethers.js"],
    githubUrl: "https://github.com/example/cryptopulse",
    liveUrl: "https://cryptopulse-demo.vercel.app",
    stars: 940,
    featured: false,
    author: {
      name: "Siddharth Nair",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "Full Stack Blockchain Dev",
    },
    metrics: {
      views: 12100,
      downloads: 2150,
      likes: 620,
    },
    architecture: [
      "MongoDB Time-Series bucket optimization for ticker metrics",
      "Express streaming API via chunked transfer encoding",
      "React Canvas virtualized rendering for 60fps market depth",
      "Node.js microservice pub/sub via Redis",
    ],
    createdAt: "2026-02-18T16:00:00.000Z",
    updatedAt: "2026-03-05T12:00:00.000Z",
  },
  {
    _id: "nextjs-ai-copilot",
    title: "NeuroDoc - Next.js AI Knowledge Studio",
    slug: "neurodoc-nextjs-ai",
    description: "RAG-powered conversational engine and code doc generator with Next.js streaming route handlers, vector embeddings, and LangChain.",
    longDescription: "NeuroDoc brings together Next.js AI SDK with vector database querying. It demonstrates streaming responses directly from Route Handlers using standard Web Streams, client-side optimistic chat threads, and metadata extraction via AST parsers.",
    stack: "AI",
    technologies: ["Next.js", "OpenAI API", "Pinecone", "LangChain", "Tailwind CSS", "TypeScript", "React Markdown"],
    githubUrl: "https://github.com/example/neurodoc-ai",
    liveUrl: "https://neurodoc-preview.vercel.app",
    stars: 3410,
    featured: true,
    author: {
      name: "Maya Lin",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      role: "AI Application Specialist",
    },
    metrics: {
      views: 45900,
      downloads: 11200,
      likes: 2740,
    },
    architecture: [
      "Next.js App Router streaming text with ReadableStream API",
      "Route Handlers with token authentication & rate throttling",
      "Server Actions for dynamic vector collection indexing",
      "Dynamic OpenGraph preview generation for query sharing",
    ],
    createdAt: "2026-01-28T14:40:00.000Z",
    updatedAt: "2026-03-10T18:10:00.000Z",
  },
  {
    _id: "fullstack-cloud-ops",
    title: "CloudMatrix - Full-Stack DevOps Portal",
    slug: "cloudmatrix-devops-portal",
    description: "Multi-cloud Kubernetes cluster monitor with automated rollback triggers, audit trails, and live terminal streaming.",
    longDescription: "A comprehensive control plane bridging Node.js gRPC pipelines with Next.js administrative dashboards. Includes instant telemetry visualizer, secret manager integration, and customizable incident webhook triggers.",
    stack: "FullStack",
    technologies: ["Node.js", "Next.js", "Docker", "Kubernetes API", "MongoDB", "Tailwind CSS", "WebRTC"],
    githubUrl: "https://github.com/example/cloudmatrix",
    liveUrl: "https://cloudmatrix-hub.vercel.app",
    stars: 1560,
    featured: false,
    author: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      role: "DevOps & Infrastructure Lead",
    },
    metrics: {
      views: 16800,
      downloads: 3800,
      likes: 1120,
    },
    architecture: [
      "Next.js nested layouts for deep cloud cluster navigation",
      "MongoDB document versioning for immutable deployment history",
      "WebSocket gateway to Kubernetes metrics-server",
      "Next.js middleware verifying signed HMAC headers",
    ],
    createdAt: "2026-02-05T09:00:00.000Z",
    updatedAt: "2026-03-02T15:30:00.000Z",
  },
  {
    _id: "mern-social-threads",
    title: "PulseSync - MERN Real-time Community",
    slug: "pulsesync-mern-community",
    description: "High-concurrency developer forum and discussion platform with nested threads, markdown previews, and instant push notifications.",
    longDescription: "Demonstrates advanced MongoDB $graphLookup queries for recursive tree retrieval in nested comment threads. Uses Express for WebSocket connection handling and React 19 for optimistic comment voting and markdown compilation.",
    stack: "MERN",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "Lucide React", "Redis"],
    githubUrl: "https://github.com/example/pulsesync",
    liveUrl: "https://pulsesync.vercel.app",
    stars: 870,
    featured: false,
    author: {
      name: "Sophie Zhang",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      role: "Senior Community Platform Engineer",
    },
    metrics: {
      views: 9400,
      downloads: 1890,
      likes: 540,
    },
    architecture: [
      "MongoDB aggregation pipeline with $graphLookup for nested discussion trees",
      "Node.js EventEmitter bridge for real-time notification dispatching",
      "Express secure cookie session authentication",
      "Client-side virtualization with infinite scroll",
    ],
    createdAt: "2026-02-22T10:00:00.000Z",
    updatedAt: "2026-03-06T11:20:00.000Z",
  }
];

export const INITIAL_REVIEWS = [
  {
    _id: "rev-1",
    projectId: "mern-saas-nexus",
    authorName: "Sarah Jenkins",
    authorEmail: "sarah@techcorp.io",
    rating: 5,
    comment: "The MongoDB change stream implementation is flawlessly organized. Clean MERN separation!",
    createdAt: "2026-02-01T12:00:00.000Z",
  },
  {
    _id: "rev-2",
    projectId: "nextjs-craft-ecommerce",
    authorName: "David Cole",
    authorEmail: "david@ecomscale.com",
    rating: 5,
    comment: "Server actions combined with generateStaticParams reduced our bounce rate drastically.",
    createdAt: "2026-02-15T15:30:00.000Z",
  },
  {
    _id: "rev-3",
    projectId: "nextjs-ai-copilot",
    authorName: "Priya Sharma",
    authorEmail: "priya@deepintel.ai",
    rating: 5,
    comment: "Streaming responses from Next.js Route Handlers feel instant. Incredible work!",
    createdAt: "2026-02-20T08:15:00.000Z",
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
    name: "Nafisa Khanam (Admin)",
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
    details: "Flagged 'NexusFlow - MERN SaaS Workspace' as featured template.",
    target: "mern-saas-nexus",
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

