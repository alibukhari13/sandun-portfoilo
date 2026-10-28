import {
  createSupabaseAdminClient,
  hasBlogDataConfig,
  safeSupabaseRequest,
} from "@/lib/supabase";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { listLocalPosts } from "@/lib/local-blog-store";
import { defaultPortfolioSettings } from "@/lib/portfolio-content";
import { login } from "@/app/admin/actions";
import AdminDashboard from "./AdminDashboard";
import styles from "./admin.module.css";

const statusMessages = {
  created: "Draft saved.",
  updated: "Changes saved.",
  published: "Post published on the public blog.",
  unpublished: "Post returned to drafts.",
  deleted: "Post deleted.",
  "project-created": "Project added to the portfolio.",
  "project-updated": "Project changes saved.",
  "project-deleted": "Project deleted.",
  "settings-updated": "Site details saved.",
};

const errorMessages = {
  login: "Sign-in failed. Check the email and password.",
  unauthorized: "This account is not authorized to manage the blog.",
  "auth-config":
    "Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in the server environment.",
  supabase: "Add the Supabase URL and service-role key to enable blog storage.",
  database:
    "Add the Supabase URL and service-role key, then apply supabase/schema.sql to enable portfolio editing.",
  validation: "Check the title, excerpt, and content fields, then try again.",
  image: "Choose a JPEG, PNG, WebP, or AVIF image no larger than 3 MB.",
  save: "The change could not be saved. Please try again.",
};

const validTabs = new Set(["projects", "settings", "blog"]);

function resolveTab(params) {
  if (validTabs.has(params?.tab)) return params.tab;

  const status = params?.status;
  if (typeof status === "string") {
    if (status.startsWith("project-") || status === "settings-updated") {
      return status === "settings-updated" ? "settings" : "projects";
    }
    if (
      ["created", "updated", "published", "unpublished", "deleted"].includes(
        status,
      )
    ) {
      return "blog";
    }
  }

  return "projects";
}

function resolveView(tab, params) {
  if (tab === "projects") {
    return params?.view === "library" ? "library" : "add";
  }
  if (tab === "blog") {
    if (params?.view === "library") return "library";
    if (
      ["updated", "published", "unpublished", "deleted"].includes(params?.status)
    ) {
      return "library";
    }
    return "write";
  }
  return null;
}

function LoginPanel({ error }) {
  return (
    <main className={styles.loginPage}>
      <div className={styles.loginPanel}>
        <a className={styles.loginBrand} href="/" aria-label="Sandun Munasinghe home">
          <span className={styles.brandWordmark}>
            Sandun
            <span>
              Munasinghe<span className={styles.brandDot}>.</span>
            </span>
          </span>
        </a>
        <span className={styles.kicker}>Admin access</span>
        <h1>Sign in</h1>
        <p className={styles.intro}>
          Manage projects, site details, and blog from one place.
        </p>
        {error && (
          <p className={styles.alert} role="alert">
            {error}
          </p>
        )}
        <form action={login} className={styles.form}>
          <label>
            Email
            <input type="email" name="email" autoComplete="username" required />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
          <div className={styles.formActions}>
            <button className={styles.primaryButton} type="submit">
              Sign in
            </button>
          </div>
        </form>
        <a className={styles.loginBackLink} href="/">
          ← Back to site
        </a>
      </div>
    </main>
  );
}

export default async function AdminPage({ searchParams }) {
  const params = await searchParams;
  const databaseConfigured = hasBlogDataConfig();
  const signedIn = await isAdminSessionValid();
  if (!signedIn || params?.screen === "login") {
    return <LoginPanel error={errorMessages[params?.error]} />;
  }

  const result = databaseConfigured
    ? await safeSupabaseRequest(
        createSupabaseAdminClient()
          .from("blog_posts")
          .select(
            "id, title, excerpt, content, slug, image_path, published, created_at, updated_at, published_at",
          )
          .order("updated_at", { ascending: false }),
      )
    : { data: await listLocalPosts(), error: null };
  const posts = result.data ?? [];
  const postsError = result.error;

  const portfolioResult = databaseConfigured
    ? await Promise.all([
        safeSupabaseRequest(
          createSupabaseAdminClient()
            .from("portfolio_projects")
            .select(
              "id, group_name, title, summary, problem, approach, key_results, result_label, goal, tags, link, kind, label, art, badge, sort_order",
            )
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: true }),
        ),
        safeSupabaseRequest(
          createSupabaseAdminClient()
            .from("portfolio_settings")
            .select("settings")
            .eq("id", "main")
            .maybeSingle(),
        ),
      ])
    : [
        { data: null, error: { message: "Supabase is not configured" } },
        { data: null, error: { message: "Supabase is not configured" } },
      ];

  const projects = portfolioResult[0].data ?? [];
  const portfolioSettings = {
    ...defaultPortfolioSettings,
    ...(portfolioResult[1].data?.settings ?? {}),
  };
  const portfolioError =
    portfolioResult.find((item) => item.error)?.error ?? null;
  const publishedCount = posts.filter((post) => post.published).length;
  const tab = resolveTab(params);
  const view = resolveView(tab, params);

  return (
    <main className={styles.page}>
      <AdminDashboard
        tab={tab}
        view={view}
        statusMessage={
          params?.status && statusMessages[params.status]
            ? statusMessages[params.status]
            : null
        }
        errorMessage={
          params?.error
            ? (errorMessages[params.error] ?? "Something went wrong.")
            : null
        }
        projects={projects}
        portfolioError={portfolioError}
        portfolioSettings={portfolioSettings}
        posts={posts}
        postsError={postsError}
        postsErrorMessage={
          databaseConfigured
            ? "Articles could not be loaded. Check the Supabase schema and service role key."
            : errorMessages.supabase
        }
        databaseErrorMessage={errorMessages.database}
        counts={{
          projects: projects.length,
          posts: posts.length,
          published: publishedCount,
        }}
      />
    </main>
  );
}
