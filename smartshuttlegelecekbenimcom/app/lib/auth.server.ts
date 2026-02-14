import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { redirect } from "react-router";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const COOKIE_NAME = "auth_token";

export interface AuthUser {
  userId: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createToken(payload: AuthUser): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, JWT_SECRET) as AuthUser;
}

export function createAuthCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === "production";
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (isProduction) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function createLogoutCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, ...rest] = cookie.trim().split("=");
      acc[key] = rest.join("=");
      return acc;
    },
    {} as Record<string, string>
  );

  return cookies[COOKIE_NAME] || null;
}

export function getAuthUser(request: Request): AuthUser | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function requireAuth(request: Request): AuthUser {
  const user = getAuthUser(request);
  if (!user) {
    throw redirect("/login");
  }
  return user;
}

export function requireAdmin(request: Request): AuthUser {
  const user = requireAuth(request);
  if (user.role !== "admin") {
    throw new Response("Forbidden", { status: 403 });
  }
  return user;
}
