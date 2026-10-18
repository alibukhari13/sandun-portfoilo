"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  hasAdminLoginConfig,
  isAdminSessionValid,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import {
  createSupabaseAdminClient,
  hasBlogDataConfig,
  safeSupabaseRequest,
} from "@/lib/supabase";

const postIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const imageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);
const maxImageSize = 3 * 1024 * 1024;

async function hasValidImageSignature(image) {
  const bytes = new Uint8Array(await image.slice(0, 12).arrayBuffer());
  const ascii = (start, end) => String.fromCharCode(...bytes.slice(start, end));

  switch (image.type) {
    case "image/jpeg":
      return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    case "image/png":
      return [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
        (byte, index) => bytes[index] === byte,
      );
    case "image/webp":
      return ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP";
    case "image/avif":
      return ascii(4, 8) === "ftyp" && ["avif", "avis"].includes(ascii(8, 12));
    default:
      return false;
  }
}

async function requireAdmin() {
  if (!(await isAdminSessionValid())) redirect("/admin?error=unauthorized");
  if (!hasBlogDataConfig()) redirect("/admin?error=supabase");
}

function readPost(formData) {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (
    !title ||
    title.length > 160 ||
    excerpt.length > 500 ||
    !content ||
    content.length > 50000
  ) {
    return null;
  }

  return { title, excerpt, content };
}

function returnFormError(state, error) {
  return { ...state, error };
}

async function uploadImage(formData) {
  const image = formData.get("image");
  if (!image || typeof image !== "object" || image.size === 0)
    return { path: null };
  if (
    !(image instanceof File) ||
    image.size > maxImageSize ||
    !imageTypes.has(image.type)
  ) {
    return { error: "image" };
  }
  if (!(await hasValidImageSignature(image))) return { error: "image" };

  const path = `${crypto.randomUUID()}.${imageTypes.get(image.type)}`;
  try {
    const { error } = await createSupabaseAdminClient()
      .storage.from("blog-images")
      .upload(path, image, {
        contentType: image.type,
        cacheControl: "31536000",
        upsert: false,
      });
    if (error) {
      console.error("Unable to upload blog image:", error.message);
      return {
        error: /bucket not found/i.test(error.message)
          ? "image-bucket"
          : "image-upload",
      };
    }
    return { path };
  } catch (error) {
    console.error(
      "Unable to upload blog image:",
      error instanceof Error ? error.message : error,
    );
    return { error: "image-upload" };
  }
}

async function removeImage(path) {
  if (!path) return;
  try {
    const { error } = await createSupabaseAdminClient()
      .storage.from("blog-images")
      .remove([path]);
    if (error) console.error("Unable to remove blog image:", error.message);
  } catch (error) {
    console.error("Unable to remove blog image:", error);
  }
}

function slugBase(title) {
  return (
    title
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "post"
  );
}

async function uniqueSlug(client, title, currentId) {
  const { data, error } = await safeSupabaseRequest(
    client.from("blog_posts").select("id, slug"),
  );
  if (error || !data) return null;

  const usedSlugs = new Set(
    data.filter((post) => post.id !== currentId).map((post) => post.slug),
  );
  const base = slugBase(title);
  let candidate = base;
  let suffix = 2;

  while (usedSlugs.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function refreshBlogPages(status) {
  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect(`/admin?status=${status}`);
}

export async function login(formData) {
  if (!hasAdminLoginConfig()) redirect("/admin?error=auth-config");

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!verifyAdminCredentials(email, password)) redirect("/admin?error=login");

  await createAdminSession();
  redirect("/admin");
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin");
}

export async function createBlog(state, formData) {
  await requireAdmin();
  const post = readPost(formData);
  if (!post) return returnFormError(state, "validation");

  const image = await uploadImage(formData);
  if (image.error) return returnFormError(state, image.error);

  const client = createSupabaseAdminClient();
  const slug = await uniqueSlug(client, post.title);
  if (!slug) {
    await removeImage(image.path);
    return returnFormError(state, "save");
  }

  const published = formData.get("published") === "true";
  const { error } = await safeSupabaseRequest(
    client.from("blog_posts").insert({
      ...post,
      image_path: image.path,
      slug,
      published,
      published_at: published ? new Date().toISOString() : null,
    }),
  );
  if (error) {
    await removeImage(image.path);
    return returnFormError(state, "save");
  }

  refreshBlogPages(published ? "published" : "created");
}

export async function updateBlog(state, formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const post = readPost(formData);
  if (!postIdPattern.test(id) || !post)
    return returnFormError(state, "validation");

  const client = createSupabaseAdminClient();
  const { data: existing, error: readError } = await safeSupabaseRequest(
    client
      .from("blog_posts")
      .select("image_path, published_at")
      .eq("id", id)
      .maybeSingle(),
  );
  if (readError || !existing) return returnFormError(state, "save");

  const image = await uploadImage(formData);
  if (image.error) return returnFormError(state, image.error);
  const imagePath =
    image.path ??
    (formData.get("removeImage") === "true" ? null : existing.image_path);
  const published = formData.get("published") === "true";
  const slug = await uniqueSlug(client, post.title, id);
  if (!slug) {
    await removeImage(image.path);
    return returnFormError(state, "save");
  }

  const { error } = await safeSupabaseRequest(
    client
      .from("blog_posts")
      .update({
        ...post,
        image_path: imagePath,
        slug,
        published,
        published_at: published
          ? (existing.published_at ?? new Date().toISOString())
          : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id),
  );
  if (error) {
    await removeImage(image.path);
    return returnFormError(state, "save");
  }

  if (image.path || imagePath === null) await removeImage(existing.image_path);

  refreshBlogPages("updated");
}

export async function deleteBlog(formData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!postIdPattern.test(id)) redirect("/admin?error=validation");

  const client = createSupabaseAdminClient();
  const { data: existing, error: readError } = await safeSupabaseRequest(
    client.from("blog_posts").select("image_path").eq("id", id).maybeSingle(),
  );
  if (readError || !existing) redirect("/admin?error=save");

  const { error } = await safeSupabaseRequest(
    client.from("blog_posts").delete().eq("id", id),
  );
  if (error) redirect("/admin?error=save");

  await removeImage(existing.image_path);
  refreshBlogPages("deleted");
}
