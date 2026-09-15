import { connectToDatabase, isMongoConfigured } from "./mongodb";
import { Project, IProject } from "../models/Project";
import { Review, IReview } from "../models/Review";
import { INITIAL_PROJECTS, INITIAL_REVIEWS, ProjectData } from "./seed-data";

// In-memory mutable repository fallback
class InMemoryDatabase {
  private projects: ProjectData[] = [...INITIAL_PROJECTS];
  private reviews: typeof INITIAL_REVIEWS = [...INITIAL_REVIEWS];

  async getProjects(filter?: { stack?: string; search?: string; featured?: boolean }): Promise<ProjectData[]> {
    let result = [...this.projects];

    if (filter?.stack && filter.stack !== "All") {
      result = result.filter((p) => p.stack.toLowerCase() === filter.stack!.toLowerCase());
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filter?.featured !== undefined) {
      result = result.filter((p) => p.featured === filter.featured);
    }

    return result;
  }

  async getProjectByIdOrSlug(idOrSlug: string): Promise<ProjectData | null> {
    const project = this.projects.find((p) => p._id === idOrSlug || p.slug === idOrSlug);
    return project ? { ...project } : null;
  }

  async createProject(data: Partial<ProjectData>): Promise<ProjectData> {
    const slug = (data.title || "new-project")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProject: ProjectData = {
      _id: `proj-${Date.now()}`,
      title: data.title || "Untitled Project",
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      description: data.description || "",
      longDescription: data.longDescription || data.description || "",
      stack: (data.stack as any) || "FullStack",
      technologies: data.technologies || ["React", "Node.js"],
      githubUrl: data.githubUrl || "https://github.com",
      liveUrl: data.liveUrl,
      stars: 1,
      featured: Boolean(data.featured),
      author: data.author || {
        name: "DevPulse Builder",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        role: "Full Stack Developer",
      },
      metrics: {
        views: 1,
        downloads: 0,
        likes: 1,
      },
      architecture: data.architecture || ["Modular Clean Architecture", "RESTful API Integration"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.projects.unshift(newProject);
    return newProject;
  }

  async upvoteProject(idOrSlug: string): Promise<ProjectData | null> {
    const idx = this.projects.findIndex((p) => p._id === idOrSlug || p.slug === idOrSlug);
    if (idx === -1) return null;
    this.projects[idx].stars += 1;
    this.projects[idx].metrics.likes += 1;
    return { ...this.projects[idx] };
  }

  async deleteProject(idOrSlug: string): Promise<boolean> {
    const initialLen = this.projects.length;
    this.projects = this.projects.filter((p) => p._id !== idOrSlug && p.slug !== idOrSlug);
    return this.projects.length < initialLen;
  }

  async getReviews(projectId: string) {
    return this.reviews.filter((r) => r.projectId === projectId);
  }

  async addReview(data: { projectId: string; authorName: string; authorEmail: string; rating: number; comment: string }) {
    const review = {
      _id: `rev-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.reviews.unshift(review);
    return review;
  }

  async getStats() {
    const totalProjects = this.projects.length;
    const totalStars = this.projects.reduce((acc, p) => acc + p.stars, 0);
    const totalViews = this.projects.reduce((acc, p) => acc + p.metrics.views, 0);

    const stackCounts = this.projects.reduce((acc: Record<string, number>, p) => {
      acc[p.stack] = (acc[p.stack] || 0) + 1;
      return acc;
    }, {});

    return {
      totalProjects,
      totalStars,
      totalViews,
      stackCounts,
      isMongoLive: false,
    };
  }
}

// Global in-memory singleton to persist across dev reloads
declare global {
  // eslint-disable-next-line no-var
  var devPulseInMemoryDb: InMemoryDatabase | undefined;
}

const memoryDb = global.devPulseInMemoryDb || (global.devPulseInMemoryDb = new InMemoryDatabase());

export const dbService = {
  async getProjects(filter?: { stack?: string; search?: string; featured?: boolean }): Promise<ProjectData[]> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          // Auto-seed empty MongoDB Atlas cluster with showcase projects
          const totalDocs = await Project.countDocuments();
          if (totalDocs === 0) {
            await Project.insertMany(INITIAL_PROJECTS);
          }

          const query: any = {};
          if (filter?.stack && filter.stack !== "All") query.stack = filter.stack;
          if (filter?.featured !== undefined) query.featured = filter.featured;
          if (filter?.search) {
            query.$or = [
              { title: { $regex: filter.search, $options: "i" } },
              { description: { $regex: filter.search, $options: "i" } },
              { technologies: { $in: [new RegExp(filter.search, "i")] } },
            ];
          }
          const docs = await Project.find(query).sort({ createdAt: -1 }).lean();
          if (docs.length > 0) {
            return JSON.parse(JSON.stringify(docs));
          }
        }
      } catch (err) {
        console.warn("MongoDB query failed, using resilient fallback:", err);
      }
    }
    return memoryDb.getProjects(filter);
  },

  async getProjectByIdOrSlug(idOrSlug: string): Promise<ProjectData | null> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const doc = await Project.findOne({
            $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
          }).lean();
          if (doc) return JSON.parse(JSON.stringify(doc));
        }
      } catch (err) {
        console.warn("MongoDB findOne failed, falling back to memory db:", err);
      }
    }
    return memoryDb.getProjectByIdOrSlug(idOrSlug);
  },

  async createProject(data: Partial<ProjectData>): Promise<ProjectData> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const slug = (data.title || "project")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-");
          const created = await Project.create({
            ...data,
            slug: `${slug}-${Date.now().toString().slice(-4)}`,
            stars: 0,
            metrics: { views: 0, downloads: 0, likes: 0 },
          });
          return JSON.parse(JSON.stringify(created));
        }
      } catch (err) {
        console.warn("MongoDB creation failed, writing to fallback memory:", err);
      }
    }
    return memoryDb.createProject(data);
  },

  async upvoteProject(idOrSlug: string): Promise<ProjectData | null> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const updated = await Project.findOneAndUpdate(
            { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] },
            { $inc: { stars: 1, "metrics.likes": 1 } },
            { new: true }
          ).lean();
          if (updated) return JSON.parse(JSON.stringify(updated));
        }
      } catch (err) {
        console.warn("MongoDB upvote failed:", err);
      }
    }
    return memoryDb.upvoteProject(idOrSlug);
  },

  async deleteProject(idOrSlug: string): Promise<boolean> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const res = await Project.deleteOne({
            $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
          });
          if (res.deletedCount && res.deletedCount > 0) return true;
        }
      } catch (err) {
        console.warn("MongoDB delete failed:", err);
      }
    }
    return memoryDb.deleteProject(idOrSlug);
  },

  async getReviews(projectId: string) {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const totalReviews = await Review.countDocuments();
          if (totalReviews === 0) {
            await Review.insertMany(INITIAL_REVIEWS);
          }
          const reviews = await Review.find({ projectId }).sort({ createdAt: -1 }).lean();
          if (reviews.length > 0) return JSON.parse(JSON.stringify(reviews));
        }
      } catch (err) {
        console.warn("MongoDB reviews lookup failed:", err);
      }
    }
    return memoryDb.getReviews(projectId);
  },

  async addReview(data: { projectId: string; authorName: string; authorEmail: string; rating: number; comment: string }) {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const created = await Review.create(data);
          return JSON.parse(JSON.stringify(created));
        }
      } catch (err) {
        console.warn("MongoDB addReview failed:", err);
      }
    }
    return memoryDb.addReview(data);
  },

  async getStats() {
    const isLive = isMongoConfigured();
    const memStats = await memoryDb.getStats();
    return {
      ...memStats,
      isMongoLive: isLive,
    };
  },
};
