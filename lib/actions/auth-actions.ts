"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbService } from "../db-service";
import {
  hashPassword,
  generateSalt,
  verifyPassword,
  createSessionCookie,
  clearSessionCookie,
  getCurrentUser,
  SessionUser,
} from "../auth";

export interface AuthActionState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export async function loginAction(
  prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const redirectUrl = (formData.get("redirect") as string) || "/dashboard";

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const errors: Record<string, string> = {};
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Please provide a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Invalid credentials.", errors };
  }

  const user = await dbService.getUserByEmail(email);
  if (!user) {
    return {
      success: false,
      message: "No account found with this email address.",
      errors: { email: "Account does not exist." },
    };
  }

  const isValid = verifyPassword(password, user.salt, user.passwordHash);
  if (!isValid) {
    return {
      success: false,
      message: "Incorrect password. Please try again.",
      errors: { password: "Password does not match." },
    };
  }

  // Create signed session cookie
  const sessionUser: SessionUser = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  };

  await createSessionCookie(sessionUser);

  // Record audit log
  await dbService.addAuditLog({
    action: "User Login",
    actor: user.email,
    details: `User authenticated successfully with role '${user.role}'.`,
    type: "security",
  });

  revalidatePath("/", "layout");
  redirect(user.role === "admin" && redirectUrl.startsWith("/admin") ? redirectUrl : redirectUrl);
}

export async function registerAction(
  prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const bio = (formData.get("bio") as string)?.trim();

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const errors: Record<string, string> = {};
  if (!name || name.length < 2) {
    errors.name = "Full name must be at least 2 characters.";
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address (e.g. developer@example.com).";
  }

  const passwordIssues: string[] = [];
  if (!password || password.length < 8) {
    passwordIssues.push("at least 8 characters");
  }
  if (!/[A-Z]/.test(password || "")) {
    passwordIssues.push("at least one capital letter (A-Z)");
  }
  if (!/[^a-zA-Z0-9]/.test(password || "")) {
    passwordIssues.push("at least one special character (e.g. !@#$%^&*)");
  }

  if (passwordIssues.length > 0) {
    errors.password = `Password must contain ${passwordIssues.join(", ")}.`;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please resolve the form errors.", errors };
  }

  const existing = await dbService.getUserByEmail(email);
  if (existing) {
    return {
      success: false,
      message: "An account with this email already exists.",
      errors: { email: "Email is already registered." },
    };
  }

  const salt = generateSalt();
  const passwordHash = hashPassword(password, salt);

  const newUser = await dbService.createUser({
    name,
    email,
    passwordHash,
    salt,
    role: "user",
    bio: bio || "Developer on DevPulse platform.",
    avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
  });

  const sessionUser: SessionUser = {
    id: newUser._id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    avatar: newUser.avatar,
  };

  await createSessionCookie(sessionUser);

  await dbService.addAuditLog({
    action: "User Registered",
    actor: newUser.email,
    details: `New account registered as '${newUser.role}'.`,
    target: newUser.email,
    type: "user",
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  const current = await getCurrentUser();
  if (current) {
    await dbService.addAuditLog({
      action: "User Logout",
      actor: current.email,
      details: "User terminated their active session.",
      type: "security",
    });
  }
  await clearSessionCookie();
  revalidatePath("/", "layout");
  redirect("/");
}

// One-click demo login for effortless testing of User and Admin roles
export async function quickDemoLoginAction(role: "admin" | "user"): Promise<void> {
  const targetEmail = role === "admin" ? "admin@devpulse.io" : "user@devpulse.io";
  const user = await dbService.getUserByEmail(targetEmail);

  if (!user) {
    // If user somehow not found, seed fallback
    const fallbackUser: SessionUser = {
      id: role === "admin" ? "user-admin-1" : "user-dev-1",
      email: targetEmail,
      name: role === "admin" ? "DevPulse Admin" : "Alex Rivera",
      role: role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    };
    await createSessionCookie(fallbackUser);
  } else {
    const sessionUser: SessionUser = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    };
    await createSessionCookie(sessionUser);
  }

  await dbService.addAuditLog({
    action: "Demo Quick-Login",
    actor: targetEmail,
    details: `Fast demo session initialized with role '${role}'.`,
    type: "security",
  });

  revalidatePath("/", "layout");
  if (role === "admin") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

// Admin Operations
export async function updateUserRoleAction(userId: string, newRole: "user" | "admin"): Promise<{ success: boolean; message: string }> {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") {
    return { success: false, message: "Unauthorized. Admin privileges required." };
  }

  const updated = await dbService.updateUserRole(userId, newRole);
  if (!updated) {
    return { success: false, message: "Failed to update user role." };
  }

  await dbService.addAuditLog({
    action: "Role Modified",
    actor: admin.email,
    details: `Updated role for user '${updated.email}' to '${newRole}'.`,
    target: updated.email,
    type: "security",
  });

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  return { success: true, message: `User role updated to ${newRole}.` };
}

export async function deleteUserAction(userId: string): Promise<{ success: boolean; message: string }> {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") {
    return { success: false, message: "Unauthorized. Admin privileges required." };
  }

  const target = await dbService.getUserById(userId);
  if (target?.email === admin.email) {
    return { success: false, message: "You cannot delete your own administrative account." };
  }

  const deleted = await dbService.deleteUser(userId);
  if (!deleted) {
    return { success: false, message: "Failed to delete user." };
  }

  await dbService.addAuditLog({
    action: "User Deleted",
    actor: admin.email,
    details: `Deleted user account '${target?.email || userId}'.`,
    target: target?.email || userId,
    type: "user",
  });

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  return { success: true, message: "User deleted successfully." };
}

export async function toggleProjectFeaturedAction(projectId: string): Promise<{ success: boolean; featured?: boolean }> {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "admin") {
    return { success: false };
  }

  const updated = await dbService.toggleProjectFeatured(projectId);
  if (!updated) {
    return { success: false };
  }

  await dbService.addAuditLog({
    action: updated.featured ? "Project Featured" : "Project Unfeatured",
    actor: admin.email,
    details: `Toggled featured state for '${updated.title}' to ${updated.featured}.`,
    target: updated.slug,
    type: "project",
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  return { success: true, featured: updated.featured };
}
