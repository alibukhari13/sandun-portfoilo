import "server-only";

import { createClient } from "@supabase/supabase-js";
import { hasPublicSupabaseConfig, safeSupabaseRequest } from "@/lib/supabase";

export async function getPublishedBlogs() {
  if (!hasPublicSupabaseConfig()) return [];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  const { data, error } = await safeSupabaseRequest(supabase
    .from("blog_posts")
    .select("id, title, excerpt, content, slug, image_path, published_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false }));

  if (error) {
    console.error("Unable to load published blog posts:", error.message);
    return [];
  }

  return (data ?? []).map((post) => ({ ...post, imageUrl: getBlogImageUrl(post.image_path) }));
}

export function getBlogImageUrl(path) {
  if (!path || !hasPublicSupabaseConfig()) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  return supabase.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
}