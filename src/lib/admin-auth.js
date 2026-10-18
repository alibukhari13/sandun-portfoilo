import "server-only";

import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/supabase";

const cookieName = "portfolio_admin_session";
const sessionDuration = 8 * 60 * 60;

export function hasAdminLoginConfig() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
    process.env.ADMIN_PASSWORD &&
    process.env.ADMIN_SESSION_SECRET,
  );
}

function digest(value) {
  return createHash("sha256").update(value).digest();
}

function signaturesMatch(left, right) {
  const leftDigest = digest(left);
  const rightDigest = digest(right);
  return timingSafeEqual(leftDigest, rightDigest);
}

export function verifyAdminCredentials(email, password) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword || !email || !password) return false;

  const emailMatches = signaturesMatch(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase());
  const passwordMatches = signaturesMatch(password, expectedPassword);
  return emailMatches && passwordMatches;
}

function sign(payload) {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(payload).digest("base64url");
}

export async function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + sessionDuration;
  const payload = Buffer.from(JSON.stringify({
    email: process.env.ADMIN_EMAIL.toLowerCase(),
    expiresAt,
  })).toString("base64url");

  const cookieStore = await cookies();
  cookieStore.set(cookieName, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: sessionDuration,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminSessionValid() {
  if (!hasAdminLoginConfig()) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return false;

  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length > 0 || !signaturesMatch(signature, sign(payload))) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return isAdminEmail(session.email) && Number.isInteger(session.expiresAt) && session.expiresAt > Date.now() / 1000;
  } catch {
    return false;
  }
}