import "server-only";

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function hasPublicSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function hasBlogDataConfig() {
  return Boolean(supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function isAdminEmail(email) {
  return Boolean(
    email &&
    process.env.ADMIN_EMAIL &&
    email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase(),
  );
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot write cookies; Server Actions can.
        }
      },
    },
  });
}

export function createSupabaseAdminClient() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

export async function safeSupabaseRequest(request) {
  try {
    return await request;
  } catch {
    return { data: null, error: { message: "Supabase request failed" } };
  }
}