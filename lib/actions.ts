"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { dbService } from "./db-service";

import { getCurrentUser } from "./auth";

export interface ActionState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export async function createProjectAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const longDescription = formData.get("longDescription") as string;
  const stack = formData.get("stack") as "MERN" | "Next.js" | "FullStack" | "AI";
  const technologiesRaw = formData.get("technologies") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const authorName = formData.get("authorName") as string;
  const authorRole = formData.get("authorRole") as string;

  const errors: Record<string, string> = {};

  if (!title || title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long.";
  }
  if (!description || description.trim().length < 10) {
    errors.description = "Short description must be at least 10 characters.";
  }
  if (!githubUrl || !githubUrl.startsWith("http")) {
    errors.githubUrl = "Please provide a valid GitHub repository URL.";
  }
  if (!stack) {
    errors.stack = "Please select a primary tech stack.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the highlighted form errors.",
      errors,
    };
  }

  const technologies = technologiesRaw
    ? technologiesRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : ["Next.js", "React", "Node.js"];

  try {
    const currentUser = await getCurrentUser();

    const newProject = await dbService.createProject({
      title,
      description,
      longDescription: longDescription || description,
      stack,
      technologies,
      githubUrl,
      liveUrl: liveUrl || undefined,
      author: {
        userId: currentUser?.id,
        email: currentUser?.email,
        name: authorName || currentUser?.name || "Community Developer",
        avatar: currentUser?.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
        role: authorRole || (currentUser?.role === "admin" ? "Lead Architect" : "Full Stack Developer"),
      },
      featured: false,
      architecture: [
        `${stack} modular component architecture`,
        "Automated continuous integration & deployment",
        "Type-safe data contracts and schema validation",
      ],
    });

    // Revalidate paths to refresh cache
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/dashboard");
    revalidatePath("/my-projects");
    revalidatePath("/api/projects");

    return {
      success: true,
      message: `Project "${newProject.title}" successfully published!`,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "An unexpected error occurred while creating the project.",
    };
  }
}

export async function upvoteProjectAction(idOrSlug: string) {
  try {
    const updated = await dbService.upvoteProject(idOrSlug);
    revalidatePath("/projects");
    revalidatePath(`/projects/${idOrSlug}`);
    revalidatePath("/dashboard");
    return { success: true, stars: updated?.stars || 0 };
  } catch (err) {
    return { success: false, error: "Failed to upvote" };
  }
}

export async function deleteProjectAction(idOrSlug: string) {
  try {
    await dbService.deleteProject(idOrSlug);
    revalidatePath("/projects");
    revalidatePath("/dashboard");
    revalidatePath("/my-projects");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete project" };
  }
}

export async function submitReviewAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const projectId = formData.get("projectId") as string;
  const authorName = formData.get("authorName") as string;
  const authorEmail = formData.get("authorEmail") as string;
  const rating = Number(formData.get("rating") || 5);
  const comment = formData.get("comment") as string;

  if (!projectId || !authorName || !comment) {
    return {
      success: false,
      message: "Please fill out all required fields.",
    };
  }

  try {
    await dbService.addReview({
      projectId,
      authorName,
      authorEmail: authorEmail || "dev@devpulse.io",
      rating,
      comment,
    });

    revalidatePath(`/projects/${projectId}`);
    return {
      success: true,
      message: "Thank you! Your review has been posted.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to submit review.",
    };
  }
}
