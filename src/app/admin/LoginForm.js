"use client";

import { useState } from "react";
import { login } from "@/app/admin/actions";
import styles from "./admin.module.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={login} className={styles.form}>
      <label>
        Email
        <input type="email" name="email" autoComplete="username" required />
      </label>
      <label>
        Password
        <span className={styles.passwordField}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            required
          />
          <button
            className={styles.passwordToggle}
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 3l18 18M10.5 10.7a2.5 2.5 0 0 0 3.5 3.5M9.9 5.1A10.4 10.4 0 0 1 12 4.8c5.2 0 8.8 4.1 10.2 6.1a1.7 1.7 0 0 1 0 2c-.5.7-1.5 2-3 3.2M6.1 6.3C4.3 7.6 3 9.2 2 10.5a1.7 1.7 0 0 0 0 2c1.2 1.8 4.2 5.3 8.7 5.9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M2.5 12s3.2-6.5 9.5-6.5S21.5 12 21.5 12 18.3 18.5 12 18.5 2.5 12 2.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            )}
          </button>
        </span>
      </label>
      <div className={styles.formActions}>
        <button className={styles.primaryButton} type="submit">
          Sign in
        </button>
      </div>
    </form>
  );
}
