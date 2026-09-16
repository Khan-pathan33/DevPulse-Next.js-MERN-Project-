import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_SECRET =
  process.env.SESSION_SECRET || "devpulse_super_secure_session_secret_2026_dusty_pink";
const COOKIE_NAME = "devpulse_session";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar: string;
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  try {
    const computed = hashPassword(password, salt);
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(hash));
  } catch {
    return false;
  }
}

// Encode payload and sign with HMAC SHA-256
export function signSessionPayload(user: SessionUser): string {
  const payload = {
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const jsonStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(jsonStr)
    .digest("base64url");
  return `${jsonStr}.${signature}`;
}

export function verifySessionToken(token: string): SessionUser | null {
  try {
    if (!token || !token.includes(".")) return null;
    const [jsonStr, signature] = token.split(".");
    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(jsonStr)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(jsonStr, "base64url").toString("utf8"));
    if (Date.now() > payload.exp) {
      return null; // Expired
    }

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      avatar: payload.avatar,
    };
  } catch {
    return null;
  }
}

export async function createSessionCookie(user: SessionUser): Promise<void> {
  const token = signSessionPayload(user);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
