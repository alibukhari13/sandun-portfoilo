"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import styles from "./admin.module.css";

const errorMessages = {
  validation: "Check the title, excerpt, and content fields, then try again.",
  image: "Choose a valid JPEG, PNG, WebP, or AVIF image no larger than 3 MB.",
  "image-bucket":
    "The Supabase blog-images bucket is missing. Apply the setup in supabase/schema.sql, then retry.",
  "image-upload":
    "The image passed validation but could not be uploaded. Check the Supabase service-role key and storage setup.",
  save: "The change could not be saved. Please try again.",
};

export default function BlogPostForm({ action, post, imageUrl, submitLabel }) {
  const [state, formAction, pending] = useActionState(action, { error: null });
  const [fields, setFields] = useState({
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    published: post?.published ?? false,
    removeImage: false,
  });

  function handleFieldChange(event) {
    const { checked, name, type, value } = event.target;
    setFields((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <form
      action={formAction}
      className={styles.form}
      onReset={(event) => event.preventDefault()}
    >
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      <label>
        Title
        <input
          name="title"
          value={fields.title}
          onChange={handleFieldChange}
          maxLength={160}
          required
        />
      </label>
      <label>
        Excerpt
        <input
          name="excerpt"
          value={fields.excerpt}
          onChange={handleFieldChange}
          maxLength={500}
        />
      </label>
      <label>
        Article content
        <textarea
          name="content"
          value={fields.content}
          onChange={handleFieldChange}
          maxLength={50000}
          rows={8}
          required
        />
      </label>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="published"
          value="true"
          checked={fields.published}
          onChange={handleFieldChange}
        />{" "}
        Publish on the public blog
      </label>
      <label>
        Cover image
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
        />
      </label>
      {post?.image_path && (
        <>
          {imageUrl && (
            <Image
              className={styles.imagePreview}
              src={imageUrl}
              alt={`Current cover for ${post.title}`}
              width={640}
              height={400}
              unoptimized
            />
          )}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="removeImage"
              value="true"
              checked={fields.removeImage}
              onChange={handleFieldChange}
            />{" "}
            Remove current cover
          </label>
        </>
      )}
      {state.error && (
        <p className={styles.alert} role="alert">
          {errorMessages[state.error] ?? "Something went wrong."}
        </p>
      )}
      <button className={styles.primaryButton} type="submit" disabled={pending}>
        {submitLabel}
      </button>
    </form>
  );
}
