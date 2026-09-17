# DevPulse ⚡ | Full-Stack Next.js & MERN Platform

> **Developed by Pathan Nafisa Khanam**

A full-stack web application showcasing **Next.js (App Router)** unified with the **MERN** technology stack (MongoDB, Express-equivalent Route Handlers, React 19 Canary, Node.js).

---

## 🌟 Highlights & Next.js Concepts Covered

- **Next.js App Router Architecture**: Root layout (`app/layout.tsx`), nested dashboard layouts (`app/dashboard/layout.tsx`), loading skeletons (`loading.tsx`), and error boundaries (`error.tsx`).
- **React Server Components (RSC)**: Zero-bundle server-rendered catalog and metrics feeds.
- **Client Components (`"use client"`)**: Interactive filtering, dark/light theme switching, live card preview, and interactive API console.
- **Server Actions (`"use server"`)**: Type-safe mutations for publishing projects and posting peer reviews with `revalidatePath` and `useActionState`.
- **Optimistic UI Updates**: React 19 `useOptimistic` and `useTransition` for instantaneous project upvoting.
- **RESTful Route Handlers**: Endpoints supporting `GET`, `POST`, `PUT`, `DELETE` at `/api/projects`, `/api/projects/[id]`, and `/api/stats`.
- **Static Site Generation (SSG) & Dynamic Segments**: `generateStaticParams()` pre-rendering dynamic project pages (`/projects/[id]`).
- **Incremental Static Regeneration (ISR)**: On-demand and timed revalidation (`revalidate = 60`).
- **Metadata & Dynamic SEO**: `generateMetadata()`, dynamic Open Graph cards, `sitemap.ts`, and `robots.ts`.
- **MERN Stack Database Integration**: Mongoose schemas (`models/Project.ts`, `models/Review.ts`) with connection pooling and an automated, resilient in-memory fallback.
- **Next.js Middleware**: Edge request tracing, header enrichment (`x-pathname`, `x-response-time`, `x-request-id`), and route interception.
- **Tailwind CSS v4 & Glassmorphism**: Custom glass surfaces, glowing gradients, responsive layout, and dark/light mode toggle.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB (Optional)
DevPulse has a built-in **resilient fallback layer** that pre-seeds rich full-stack data out of the box. 

If you have a MongoDB instance (local or MongoDB Atlas), configure `.env.local`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/devpulse?retryWrites=true&w=majority
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Interactive API Playground

DevPulse includes an interactive API console at `/api-docs`. You can trigger live HTTP requests to test:
- `GET /api/projects` - Filter by stack or search keywords
- `POST /api/projects` - Create a project document
- `GET /api/projects/[id]` - Retrieve single project & reviews
- `DELETE /api/projects/[id]` - Remove project document
- `GET /api/stats` - Platform KPIs and MongoDB status
