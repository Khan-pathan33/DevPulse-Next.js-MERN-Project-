import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    stack: {
      type: String,
      enum: ["MERN", "Next.js", "FullStack", "AI"],
      required: true,
      index: true,
    },
    technologies: [{ type: String, required: true }],
    githubUrl: { type: String, required: true },
    liveUrl: { type: String },
    image: { type: String },
    stars: { type: Number, default: 0 },
    featured: { type: Boolean, default: false, index: true },
    author: {
      userId: { type: String, index: true },
      email: { type: String, index: true },
      name: { type: String, required: true },
      avatar: { type: String, default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      role: { type: String, default: "Full Stack Engineer" },
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

// Prevent re-compilation of model during Next.js Hot Module Reloading
export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
