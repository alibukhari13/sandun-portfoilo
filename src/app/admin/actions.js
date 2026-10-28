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
  deleteLocalPost,
  insertLocalPost,
  isLocalBlogImage,
  listLocalPosts,
  removeLocalBlogImage,
  saveLocalBlogImage,
  uniqueLocalSlug,
  updateLocalPost,
} from "@/lib/local-blog-store";
import {
  createSupabaseAdminClient,
  hasBlogDataConfig,
  safeSupabaseRequest,
} from "@/lib/supabase";
import { defaultPortfolioSettings } from "@/lib/portfolio-content";

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
  if (await isAdminSessionValid()) return;
  redirect("/admin?error=unauthorized");
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

  if (!hasBlogDataConfig()) {
    try {
      return {
        path: await saveLocalBlogImage(image, imageTypes.get(image.type)),
      };
    } catch (error) {
      console.error(
        "Unable to save blog image:",
        error instanceof Error ? error.message : error,
      );
      return { error: "image-upload" };
    }
  }

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
  if (isLocalBlogImage(path)) {
    await removeLocalBlogImage(path);
    return;
  }
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
  const view =
    status === "created" || status === "published" ? "write" : "library";
  redirect(`/admin?tab=blog&view=${view}&status=${status}`);
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

  const published = formData.get("published") === "true";
  if (!hasBlogDataConfig()) {
    try {
      await insertLocalPost({
        ...post,
        image_path: image.path,
        slug: await uniqueLocalSlug(post.title),
        published,
        published_at: published ? new Date().toISOString() : null,
      });
    } catch (error) {
      await removeImage(image.path);
      console.error(
        "Unable to save blog post:",
        error instanceof Error ? error.message : error,
      );
      return returnFormError(state, "save");
    }
    refreshBlogPages(published ? "published" : "created");
  }

  const client = createSupabaseAdminClient();
  const slug = await uniqueSlug(client, post.title);
  if (!slug) {
    await removeImage(image.path);
    return returnFormError(state, "save");
  }

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

  if (!hasBlogDataConfig()) {
    const existing = (await listLocalPosts()).find((item) => item.id === id);
    if (!existing) return returnFormError(state, "save");

    const image = await uploadImage(formData);
    if (image.error) return returnFormError(state, image.error);
    const imagePath =
      image.path ??
      (formData.get("removeImage") === "true" ? null : existing.image_path);
    const published = formData.get("published") === "true";

    try {
      const updated = await updateLocalPost(id, {
        ...post,
        image_path: imagePath,
        slug: await uniqueLocalSlug(post.title, id),
        published,
        published_at: published
          ? (existing.published_at ?? new Date().toISOString())
          : null,
      });
      if (!updated) {
        await removeImage(image.path);
        return returnFormError(state, "save");
      }
    } catch (error) {
      await removeImage(image.path);
      console.error(
        "Unable to update blog post:",
        error instanceof Error ? error.message : error,
      );
      return returnFormError(state, "save");
    }

    if (image.path || imagePath === null)
      await removeImage(existing.image_path);
    refreshBlogPages("updated");
  }

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

  if (!hasBlogDataConfig()) {
    const existing = await deleteLocalPost(id);
    if (!existing) redirect("/admin?error=save");
    await removeImage(existing.image_path);
    refreshBlogPages("deleted");
  }

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

  const projectKinds = new Set(["green", "blue", "violet"]);
  const projectArts = new Set(["chart", "agents", "atom"]);

  function readLines(value, maxItems, maxLength) {
    const lines = String(value ?? "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length > maxItems || lines.some((line) => line.length > maxLength)) {
      return null;
    }
    return lines;
  }

  function readProject(formData) {
    const groupName = String(formData.get("group_name") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const summary = String(formData.get("summary") ?? "").trim();
    const problem = String(formData.get("problem") ?? "").trim();
    const approach = String(formData.get("approach") ?? "").trim();
    const resultLabel = String(formData.get("result_label") ?? "").trim();
    const keyResults = readLines(formData.get("key_results"), 12, 300);
    const tags = readLines(formData.get("tags"), 20, 60);
    const link = String(formData.get("link") ?? "").trim();
    const kind = String(formData.get("kind") ?? "");
    const art = String(formData.get("art") ?? "");
    const label = String(formData.get("label") ?? "").trim();
    const badge = String(formData.get("badge") ?? "").trim();
    const goal = String(formData.get("goal") ?? "").trim();
    const sortOrderValue = String(formData.get("sort_order") ?? "");
    const sortOrder = Number(sortOrderValue);

    if (
      !groupName ||
      groupName.length > 80 ||
      !title ||
      title.length > 160 ||
      !summary ||
      summary.length > 1200 ||
      !problem ||
      problem.length > 3000 ||
      !approach ||
      approach.length > 5000 ||
      !resultLabel ||
      resultLabel.length > 80 ||
      !keyResults ||
      !tags ||
      (!goal && keyResults.length === 0) ||
      (link && !isSecureUrl(link)) ||
      !projectKinds.has(kind) ||
      !projectArts.has(art) ||
      label.length > 100 ||
      badge.length > 40 ||
      goal.length > 1200 ||
      !sortOrderValue ||
      !Number.isInteger(sortOrder) ||
      sortOrder < 0 ||
      sortOrder > 100000
    ) {
      return null;
    }

    return {
      group_name: groupName,
      title,
      summary,
      problem,
      approach,
      key_results: keyResults,
      result_label: resultLabel,
      goal: goal || null,
      tags,
      link,
      kind,
      label: label || `${String(sortOrder + 1).padStart(2, "0")} / ${groupName.toUpperCase()}`,
      art,
      badge,
      sort_order: sortOrder,
    };
  }

  function isSecureUrl(value) {
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  }

  function refreshPortfolio(status) {
    [
      "/",
      "/about",
      "/experience",
      "/projects",
      "/skills",
      "/education",
      "/blog",
      "/recommendations",
      "/contact",
    ].forEach((path) => revalidatePath(path));
    revalidatePath("/admin");
    if (status === "settings-updated") {
      redirect(`/admin?tab=settings&status=${status}`);
    }
    const view = status === "project-created" ? "add" : "library";
    redirect(`/admin?tab=projects&view=${view}&status=${status}`);
  }

  export async function createProject(state, formData) {
    await requireAdmin();
    const project = readProject(formData);
    if (!project) return returnFormError(state, "validation");
    if (!hasBlogDataConfig()) return returnFormError(state, "database");

    const { data, error } = await safeSupabaseRequest(
      createSupabaseAdminClient()
        .from("portfolio_projects")
        .insert(project)
        .select("id")
        .single(),
    );
    if (error || !data) {
      console.error("Unable to create portfolio project:", error?.message ?? "No project was returned");
      return returnFormError(state, "save");
    }
    refreshPortfolio("project-created");
  }

  export async function updateProject(state, formData) {
    await requireAdmin();
    const id = String(formData.get("id") ?? "");
    const project = readProject(formData);
    if (!postIdPattern.test(id) || !project) {
      return returnFormError(state, "validation");
    }
    if (!hasBlogDataConfig()) return returnFormError(state, "database");

    const { data, error } = await safeSupabaseRequest(
      createSupabaseAdminClient()
        .from("portfolio_projects")
        .update({ ...project, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select("id")
        .maybeSingle(),
    );
    if (error || !data) {
      console.error("Unable to update portfolio project:", error?.message ?? "Project not found");
      return returnFormError(state, "save");
    }
    refreshPortfolio("project-updated");
  }

  export async function deleteProject(formData) {
    await requireAdmin();
    const id = String(formData.get("id") ?? "");
    if (!postIdPattern.test(id)) redirect("/admin?error=validation");
    if (!hasBlogDataConfig()) redirect("/admin?error=database");

    const { data, error } = await safeSupabaseRequest(
      createSupabaseAdminClient()
        .from("portfolio_projects")
        .delete()
        .eq("id", id)
        .select("id")
        .maybeSingle(),
    );
    if (error || !data) {
      console.error("Unable to delete portfolio project:", error?.message ?? "Project not found");
      redirect("/admin?error=save");
    }
    refreshPortfolio("project-deleted");
  }

  function readPortfolioSettings(formData) {
    const settings = Object.fromEntries(
      Object.keys(defaultPortfolioSettings).map((key) => [
        key,
        String(formData.get(key) ?? "").trim(),
      ]),
    );

    const email = settings.contact_email;
    const emailValid =
      !email || (email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const socialUrlsValid = ["github_url", "linkedin_url"].every(
      (key) => !settings[key] || (settings[key].length <= 500 && isSecureUrl(settings[key])),
    );
    const formEndpointValid =
      !settings.contact_form_endpoint ||
      (settings.contact_form_endpoint.length <= 500 &&
        isSecureUrl(settings.contact_form_endpoint));
    const textLengthsValid = [
      ["location", 160],
      ["availability", 500],
      ["contact_intro", 500],
      ["contact_description", 1000],
      ["contact_lede", 1000],
      ["footer_heading", 160],
      ["footer_description", 500],
    ].every(([key, maxLength]) => settings[key].length <= maxLength);

    if (
      !emailValid ||
      !socialUrlsValid ||
      !formEndpointValid ||
      !textLengthsValid ||
      !settings.contact_intro ||
      !settings.contact_description ||
      !settings.contact_lede ||
      !settings.footer_heading ||
      !settings.footer_description
    ) {
      return null;
    }
    return settings;
  }

  export async function savePortfolioSettings(state, formData) {
    await requireAdmin();
    const settings = readPortfolioSettings(formData);
    if (!settings) return returnFormError(state, "validation");
    if (!hasBlogDataConfig()) return returnFormError(state, "database");

    const { error } = await safeSupabaseRequest(
      createSupabaseAdminClient()
        .from("portfolio_settings")
        .upsert({ id: "main", settings, updated_at: new Date().toISOString() }),
    );
    if (error) {
      console.error("Unable to save portfolio settings:", error.message);
      return returnFormError(state, "save");
    }
    refreshPortfolio("settings-updated");
  }
