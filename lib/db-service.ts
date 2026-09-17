import mongoose from "mongoose";
import { connectToDatabase, isMongoConfigured } from "./mongodb";
import { Project, IProject } from "../models/Project";
import { Review, IReview } from "../models/Review";
import { User, IUser } from "../models/User";
import { AuditLog, IAuditLog } from "../models/AuditLog";
import {
  INITIAL_PROJECTS,
  INITIAL_REVIEWS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS,
  ProjectData,
  UserData,
  AuditLogData,
} from "./seed-data";

// In-memory mutable repository fallback
class InMemoryDatabase {
  private projects: ProjectData[] = [...INITIAL_PROJECTS];
  private reviews: typeof INITIAL_REVIEWS = [...INITIAL_REVIEWS];
  private users: UserData[] = [...INITIAL_USERS];
  private auditLogs: AuditLogData[] = [...INITIAL_AUDIT_LOGS];

  async getProjects(filter?: {
    stack?: string;
    search?: string;
    featured?: boolean;
    userId?: string;
    userEmail?: string;
    authorName?: string;
  }): Promise<ProjectData[]> {
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

    if (filter?.userId || filter?.userEmail || filter?.authorName) {
      result = result.filter((p) => {
        if (filter.userId && p.author.userId === filter.userId) return true;
        if (filter.userEmail && p.author.email?.toLowerCase() === filter.userEmail.toLowerCase()) return true;
        if (filter.authorName && p.author.name.toLowerCase() === filter.authorName.toLowerCase()) return true;
        return false;
      });
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

  async toggleProjectFeatured(idOrSlug: string): Promise<ProjectData | null> {
    const idx = this.projects.findIndex((p) => p._id === idOrSlug || p.slug === idOrSlug);
    if (idx === -1) return null;
    this.projects[idx].featured = !this.projects[idx].featured;
    return { ...this.projects[idx] };
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

  // User methods
  async getUsers(): Promise<UserData[]> {
    return [...this.users];
  }

  async getUserByEmail(email: string): Promise<UserData | null> {
    const user = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return user ? { ...user } : null;
  }

  async getUserById(id: string): Promise<UserData | null> {
    const user = this.users.find((u) => u._id === id);
    return user ? { ...user } : null;
  }

  async createUser(data: Partial<UserData>): Promise<UserData> {
    const newUser: UserData = {
      _id: `user-${Date.now()}`,
      name: data.name || "Developer",
      email: (data.email || "").toLowerCase(),
      passwordHash: data.passwordHash || "",
      salt: data.salt || "",
      role: data.role || "user",
      avatar:
        data.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      bio: data.bio || "Full-Stack Developer passionate about Next.js & MERN.",
      createdAt: new Date().toISOString(),
    };
    this.users.unshift(newUser);
    return newUser;
  }

  async updateUserRole(userId: string, role: "user" | "admin"): Promise<UserData | null> {
    const idx = this.users.findIndex((u) => u._id === userId);
    if (idx === -1) return null;
    this.users[idx].role = role;
    return { ...this.users[idx] };
  }

  async deleteUser(userId: string): Promise<boolean> {
    const initialLen = this.users.length;
    this.users = this.users.filter((u) => u._id !== userId);
    return this.users.length < initialLen;
  }

  // Audit Logs
  async getAuditLogs(): Promise<AuditLogData[]> {
    return [...this.auditLogs];
  }

  async addAuditLog(entry: Omit<AuditLogData, "_id" | "createdAt">): Promise<AuditLogData> {
    const log: AuditLogData = {
      _id: `log-${Date.now()}`,
      ...entry,
      createdAt: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    return log;
  }

  async getStats() {
    const totalProjects = this.projects.length;
    const totalStars = this.projects.reduce((acc, p) => acc + p.stars, 0);
    const totalViews = this.projects.reduce((acc, p) => acc + p.metrics.views, 0);
    const totalUsers = this.users.length;

    const stackCounts = this.projects.reduce((acc: Record<string, number>, p) => {
      acc[p.stack] = (acc[p.stack] || 0) + 1;
      return acc;
    }, {});

    return {
      totalProjects,
      totalStars,
      totalViews,
      totalUsers,
      stackCounts,
      isMongoLive: false,
    };
  }
}

// In-memory fallback instance
const memoryDb = new InMemoryDatabase();

function getProjectQuery(idOrSlug: string) {
  if (mongoose.Types.ObjectId.isValid(idOrSlug) && idOrSlug.length === 24) {
    return { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] };
  }
  return { slug: idOrSlug };
}

export const dbService = {
  async getProjects(filter?: {
    stack?: string;
    search?: string;
    featured?: boolean;
    userId?: string;
    userEmail?: string;
    authorName?: string;
  }): Promise<ProjectData[]> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          // Clean up legacy dummy projects with example GitHub URLs
          await Project.deleteMany({
            $or: [
              { githubUrl: { $regex: "example" } },
              { slug: { $in: ["nexusflow-mern-saas", "auracommerce-nextjs", "cryptopulse-mern-defi", "neurodoc-nextjs-ai", "cloudmatrix-devops-portal", "pulsesync-mern-community", "taxonomy-nextjs-app"] } }
            ]
          });

          // Auto-seed and sync showcase projects with real live and github URLs
          for (const sp of INITIAL_PROJECTS) {
            const existing = await Project.findOne({ slug: sp.slug });
            if (!existing) {
              const { _id, ...projectData } = sp;
              await Project.create(projectData);
            } else {
              let changed = false;
              if (existing.liveUrl !== sp.liveUrl && sp.liveUrl) {
                existing.liveUrl = sp.liveUrl;
                changed = true;
              }
              if (existing.githubUrl !== sp.githubUrl && sp.githubUrl) {
                existing.githubUrl = sp.githubUrl;
                changed = true;
              }
              if (existing.title !== sp.title && sp.title) {
                existing.title = sp.title;
                changed = true;
              }
              if (!existing.createdAt) {
                existing.createdAt = new Date();
                changed = true;
              }
              if (changed) {
                await existing.save();
              }
            }
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

          if (filter?.userId || filter?.userEmail || filter?.authorName) {
            const authorOr: any[] = [];
            if (filter.userId) authorOr.push({ "author.userId": filter.userId });
            if (filter.userEmail) authorOr.push({ "author.email": filter.userEmail.toLowerCase() });
            if (filter.authorName) authorOr.push({ "author.name": new RegExp(`^${filter.authorName}$`, "i") });

            if (query.$or) {
              query.$and = [{ $or: query.$or }, { $or: authorOr }];
              delete query.$or;
            } else {
              query.$or = authorOr;
            }
          }

          const docs = await Project.find(query).sort({ createdAt: -1 }).lean();
          return JSON.parse(JSON.stringify(docs));
        }
      } catch (err) {
        console.warn("MongoDB query failed, using resilient fallback:", err);
      }
    }
    return memoryDb.getProjects(filter);
  },

  async getUserProjects(user: { id: string; email?: string; name?: string }): Promise<ProjectData[]> {
    return this.getProjects({
      userId: user.id,
      userEmail: user.email,
      authorName: user.name,
    });
  },

  async getProjectByIdOrSlug(idOrSlug: string): Promise<ProjectData | null> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const doc = await Project.findOne(getProjectQuery(idOrSlug)).lean();
          return doc ? JSON.parse(JSON.stringify(doc)) : null;
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
            getProjectQuery(idOrSlug),
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
          const res = await Project.deleteOne(getProjectQuery(idOrSlug));
          if (res.deletedCount && res.deletedCount > 0) return true;
        }
      } catch (err) {
        console.warn("MongoDB delete failed:", err);
      }
    }
    return memoryDb.deleteProject(idOrSlug);
  },

  async toggleProjectFeatured(idOrSlug: string): Promise<ProjectData | null> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const project = await Project.findOne(getProjectQuery(idOrSlug));
          if (project) {
            project.featured = !project.featured;
            await project.save();
            return JSON.parse(JSON.stringify(project));
          }
        }
      } catch (err) {
        console.warn("MongoDB toggleFeatured failed:", err);
      }
    }
    return memoryDb.toggleProjectFeatured(idOrSlug);
  },

  // Review Operations
  async getReviews(projectId: string) {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const docs = await Review.find({ projectId }).sort({ createdAt: -1 }).lean();
          return JSON.parse(JSON.stringify(docs));
        }
      } catch (err) {
        console.warn("MongoDB getReviews failed:", err);
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

  // User Management
  async getUsers(): Promise<UserData[]> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const totalUsers = await User.countDocuments();
          if (totalUsers === 0) {
            const seedUsers = INITIAL_USERS.map(({ _id, ...u }) => u);
            await User.insertMany(seedUsers);
          }
          const users = await User.find().sort({ createdAt: -1 }).lean();
          return JSON.parse(JSON.stringify(users));
        }
      } catch (err) {
        console.warn("MongoDB getUsers failed:", err);
      }
    }
    return memoryDb.getUsers();
  },

  async getUserByEmail(email: string): Promise<UserData | null> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const totalUsers = await User.countDocuments();
          if (totalUsers === 0) {
            const seedUsers = INITIAL_USERS.map(({ _id, ...u }) => u);
            await User.insertMany(seedUsers);
          }
          const user = await User.findOne({ email: email.toLowerCase() }).lean();
          return user ? JSON.parse(JSON.stringify(user)) : null;
        }
      } catch (err) {
        console.warn("MongoDB getUserByEmail failed:", err);
      }
    }
    return memoryDb.getUserByEmail(email);
  },

  async getUserById(id: string): Promise<UserData | null> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const user = await User.findById(id).lean();
          return user ? JSON.parse(JSON.stringify(user)) : null;
        }
      } catch (err) {
        console.warn("MongoDB getUserById failed:", err);
      }
    }
    return memoryDb.getUserById(id);
  },

  async createUser(data: Partial<UserData>): Promise<UserData> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const created = await User.create({
            ...data,
            email: (data.email || "").toLowerCase(),
          });
          return JSON.parse(JSON.stringify(created));
        }
      } catch (err) {
        console.warn("MongoDB createUser failed:", err);
      }
    }
    return memoryDb.createUser(data);
  },

  async updateUserRole(userId: string, role: "user" | "admin"): Promise<UserData | null> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const updated = await User.findByIdAndUpdate(userId, { role }, { new: true }).lean();
          if (updated) return JSON.parse(JSON.stringify(updated));
        }
      } catch (err) {
        console.warn("MongoDB updateUserRole failed:", err);
      }
    }
    return memoryDb.updateUserRole(userId, role);
  },

  async deleteUser(userId: string): Promise<boolean> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const res = await User.findByIdAndDelete(userId);
          if (res) return true;
        }
      } catch (err) {
        console.warn("MongoDB deleteUser failed:", err);
      }
    }
    return memoryDb.deleteUser(userId);
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLogData[]> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const totalLogs = await AuditLog.countDocuments();
          if (totalLogs === 0) {
            const seedLogs = INITIAL_AUDIT_LOGS.map(({ _id, ...l }) => l);
            await AuditLog.insertMany(seedLogs);
          }
          const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(50).lean();
          if (logs.length > 0) return JSON.parse(JSON.stringify(logs));
        }
      } catch (err) {
        console.warn("MongoDB getAuditLogs failed:", err);
      }
    }
    return memoryDb.getAuditLogs();
  },

  async addAuditLog(entry: Omit<AuditLogData, "_id" | "createdAt">): Promise<AuditLogData> {
    if (isMongoConfigured()) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const created = await AuditLog.create(entry);
          return JSON.parse(JSON.stringify(created));
        }
      } catch (err) {
        console.warn("MongoDB addAuditLog failed:", err);
      }
    }
    return memoryDb.addAuditLog(entry);
  },

  async getStats() {
    const isLive = isMongoConfigured();
    const memStats = await memoryDb.getStats();

    if (isLive) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const [totalProjects, totalUsers] = await Promise.all([
            Project.countDocuments(),
            User.countDocuments(),
          ]);
          return {
            ...memStats,
            totalProjects: totalProjects || memStats.totalProjects,
            totalUsers: totalUsers || memStats.totalUsers,
            isMongoLive: true,
          };
        }
      } catch (e) {
        // Fall through
      }
    }

    return {
      ...memStats,
      isMongoLive: isLive,
    };
  },
};
