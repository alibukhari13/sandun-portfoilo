import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const dataFile = path.join(process.cwd(), "data", "blog-posts.json");
const uploadDir = path.join(process.cwd(), "public", "blog-uploads");

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

async function readPosts() {
  try {
    const posts = JSON.parse(await readFile(dataFile, "utf8"));
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

async function writePosts(posts) {
  await mkdir(path.dirname(dataFile), { recursive: true });
  const temporaryFile = `${dataFile}.${process.pid}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(posts, null, 2)}\n`);
  await rename(temporaryFile, dataFile);
}

export function isLocalBlogImage(imagePath) {
  return typeof imagePath === "string" && imagePath.startsWith("blog-uploads/");
}

export function localBlogImageUrl(imagePath) {
  return isLocalBlogImage(imagePath) ? `/${imagePath}` : null;
}

export async function listLocalPosts() {
  const posts = await readPosts();
  return posts.sort((left, right) => String(right.updated_at).localeCompare(String(left.updated_at)));
}

export async function saveLocalBlogImage(image, extension) {
  await mkdir(uploadDir, { recursive: true });
  const filename = `${randomUUID()}.${extension}`;
  await writeFile(path.join(uploadDir, filename), Buffer.from(await image.arrayBuffer()));
  return `blog-uploads/${filename}`;
}

export async function removeLocalBlogImage(imagePath) {
  if (!isLocalBlogImage(imagePath)) return;
  await unlink(path.join(uploadDir, path.basename(imagePath))).catch(() => {});
}

export async function uniqueLocalSlug(title, currentId) {
  const usedSlugs = new Set(
    (await readPosts()).filter((post) => post.id !== currentId).map((post) => post.slug),
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

export async function insertLocalPost(post) {
  const posts = await readPosts();
  const now = new Date().toISOString();
  posts.unshift({
    id: randomUUID(),
    created_at: now,
    ...post,
    updated_at: now,
  });
  await writePosts(posts);
}

export async function updateLocalPost(id, changes) {
  const posts = await readPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index < 0) return null;
  posts[index] = { ...posts[index], ...changes, id, updated_at: new Date().toISOString() };
  await writePosts(posts);
  return posts[index];
}

export async function deleteLocalPost(id) {
  const posts = await readPosts();
  const existing = posts.find((post) => post.id === id) ?? null;
  if (!existing) return null;
  await writePosts(posts.filter((post) => post.id !== id));
  return existing;
}
