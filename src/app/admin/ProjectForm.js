"use client";

import { useActionState } from "react";
import styles from "./admin.module.css";

const errorMessages = {
  validation: "Check required fields, URLs, and project details.",
  database: "Apply the portfolio tables from supabase/schema.sql before saving projects.",
  save: "The project could not be saved. Please try again.",
};

export default function ProjectForm({ action, project, submitLabel }) {
  const [state, formAction, pending] = useActionState(action, { error: null });
  return (
    <form action={formAction} className={styles.form}>
      {project?.id && <input type="hidden" name="id" value={project.id} />}
      <label>
        Project title
        <input name="title" defaultValue={project?.title ?? ""} maxLength={160} required />
      </label>
      <label>
        Category
        <input name="group_name" defaultValue={project?.group_name ?? ""} maxLength={80} required />
      </label>
      <label>
        Card label
        <input name="label" defaultValue={project?.label ?? ""} maxLength={100} />
      </label>
      <label>
        Summary
        <textarea name="summary" defaultValue={project?.summary ?? ""} maxLength={1200} rows={3} required />
      </label>
      <label>
        Problem
        <textarea name="problem" defaultValue={project?.problem ?? ""} maxLength={3000} rows={3} required />
      </label>
      <label>
        Approach
        <textarea name="approach" defaultValue={project?.approach ?? ""} maxLength={5000} rows={4} required />
      </label>
      <label>
        Results heading
        <input name="result_label" defaultValue={project?.result_label ?? "Key Results"} maxLength={80} required />
      </label>
      <label>
        Key results (one per line)
        <textarea name="key_results" defaultValue={(project?.key_results ?? []).join("\n")} maxLength={3000} rows={4} />
      </label>
      <label>
        Long-term goal (optional)
        <textarea name="goal" defaultValue={project?.goal ?? ""} maxLength={1200} rows={3} />
      </label>
      <label>
        Technologies and tools (one per line)
        <textarea name="tags" defaultValue={(project?.tags ?? []).join("\n")} maxLength={1200} rows={4} />
      </label>
      <label>
        Project URL (optional)
        <input name="link" type="url" defaultValue={project?.link ?? ""} maxLength={500} />
      </label>
      <label>
        Card color
        <select name="kind" defaultValue={project?.kind ?? "green"}>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="violet">Violet</option>
        </select>
      </label>
      <label>
        Card artwork
        <select name="art" defaultValue={project?.art ?? "chart"}>
          <option value="chart">Truthfulness chart</option>
          <option value="agents">Agent workflow</option>
          <option value="atom">Engineering pipeline</option>
        </select>
      </label>
      <label>
        Badge (optional)
        <input name="badge" defaultValue={project?.badge ?? ""} maxLength={40} />
      </label>
      <label>
        Display order
        <input name="sort_order" type="number" min="0" max="100000" defaultValue={project?.sort_order ?? 0} required />
      </label>
      {state.error && (
        <p className={styles.alert} role="alert">
          {errorMessages[state.error] ?? "Something went wrong."}
        </p>
      )}
      <button className={styles.primaryButton} type="submit" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
