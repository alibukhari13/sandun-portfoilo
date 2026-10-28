"use client";

import { useActionState } from "react";
import styles from "./admin.module.css";

const errorMessages = {
  validation: "Check the email address, secure URLs, and text lengths.",
  database: "Apply the portfolio tables from supabase/schema.sql before saving settings.",
  save: "Settings could not be saved. Please try again.",
};

export default function PortfolioSettingsForm({ action, settings }) {
  const [state, formAction, pending] = useActionState(action, { error: null });
  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.fieldGroup}>
        <p className={styles.fieldGroupTitle}>Contact & social</p>
        <div className={styles.formGrid}>
          <label>
            Contact email (leave blank to remove)
            <input name="contact_email" type="email" defaultValue={settings.contact_email} maxLength={254} />
          </label>
          <label>
            Location
            <input name="location" defaultValue={settings.location} maxLength={160} />
          </label>
          <label>
            GitHub URL (leave blank to remove)
            <input name="github_url" type="url" defaultValue={settings.github_url} maxLength={500} />
          </label>
          <label>
            LinkedIn URL (leave blank to remove)
            <input name="linkedin_url" type="url" defaultValue={settings.linkedin_url} maxLength={500} />
          </label>
          <label className={styles.fullWidth}>
            Contact form endpoint (leave blank to disable)
            <input name="contact_form_endpoint" type="url" defaultValue={settings.contact_form_endpoint} maxLength={500} />
          </label>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <p className={styles.fieldGroupTitle}>Shared copy</p>
        <div className={styles.formGrid}>
          <label className={styles.fullWidth}>
            Availability
            <textarea name="availability" defaultValue={settings.availability} maxLength={500} rows={3} />
          </label>
          <label className={styles.fullWidth}>
            Contact introduction
            <textarea name="contact_intro" defaultValue={settings.contact_intro} maxLength={500} rows={3} required />
          </label>
          <label className={styles.fullWidth}>
            Contact description
            <textarea name="contact_description" defaultValue={settings.contact_description} maxLength={1000} rows={3} required />
          </label>
          <label className={styles.fullWidth}>
            Contact page message
            <textarea name="contact_lede" defaultValue={settings.contact_lede} maxLength={1000} rows={3} required />
          </label>
          <label>
            Footer heading
            <input name="footer_heading" defaultValue={settings.footer_heading} maxLength={160} required />
          </label>
          <label className={styles.fullWidth}>
            Footer description
            <textarea name="footer_description" defaultValue={settings.footer_description} maxLength={500} rows={3} required />
          </label>
        </div>
      </div>

      {state.error && (
        <p className={styles.alert} role="alert">
          {errorMessages[state.error] ?? "Something went wrong."}
        </p>
      )}
      <div className={styles.formActions}>
        <button className={styles.primaryButton} type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save site details"}
        </button>
      </div>
    </form>
  );
}
