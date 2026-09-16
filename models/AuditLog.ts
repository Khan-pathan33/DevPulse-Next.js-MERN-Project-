import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog extends Document {
  action: string;
  actor: string;
  details: string;
  target?: string;
  type: "user" | "project" | "system" | "security";
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    action: { type: String, required: true },
    actor: { type: String, required: true },
    details: { type: String, required: true },
    target: { type: String },
    type: {
      type: String,
      enum: ["user", "project", "system", "security"],
      default: "system",
      index: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
