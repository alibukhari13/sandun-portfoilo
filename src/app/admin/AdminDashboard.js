import BlogPostForm from "./BlogPostForm";
import ProjectForm from "./ProjectForm";
import PortfolioSettingsForm from "./PortfolioSettingsForm";
import {
  createBlog,
  createProject,
  deleteBlog,
  deleteProject,
  logout,
  savePortfolioSettings,
  updateBlog,
  updateProject,
} from "@/app/admin/actions";
import { getBlogImageUrl } from "@/lib/blogs";
import styles from "./admin.module.css";

const tabs = [
  {
    id: "projects",
    label: "Projects",
    description: "Portfolio project cards",
  },
  {
    id: "settings",
    label: "Site details",
    description: "Contact and shared copy",
  },
  {
    id: "blog",
    label: "Blog",
    description: "Articles and drafts",
  },
];

function hrefFor({ tab, view, status, error }) {
  const query = new URLSearchParams({ tab });
  if (view) query.set("view", view);
  if (status) query.set("status", status);
  if (error) query.set("error", error);
  return `/admin?${query.toString()}`;
}

function PostRow({ post }) {
  return (
    <article className={styles.itemCard}>
      <div className={styles.itemMain}>
        <span
          className={`${styles.badge} ${post.published ? styles.badgeLive : ""}`}
        >
          {post.published ? "Published" : "Draft"}
        </span>
        <h3>{post.title}</h3>
        <p>
          /{post.slug} · Updated{" "}
          {new Date(post.updated_at).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.itemActions}>
        <details className={styles.disclosure}>
          <summary>Edit</summary>
          <div className={styles.disclosureBody}>
            <BlogPostForm
              action={updateBlog}
              post={post}
              imageUrl={getBlogImageUrl(post.image_path)}
              submitLabel="Save changes"
            />
          </div>
        </details>
        <details className={`${styles.disclosure} ${styles.deleteDisclosure}`}>
          <summary>Delete</summary>
          <form action={deleteBlog} className={styles.deleteConfirm}>
            <input type="hidden" name="id" value={post.id} />
            <span>Delete this post permanently?</span>
            <button className={styles.deleteButton} type="submit">
              Confirm delete
            </button>
          </form>
        </details>
      </div>
    </article>
  );
}

function ProjectRow({ project }) {
  return (
    <article className={styles.itemCard}>
      <div className={styles.itemMain}>
        <span className={styles.badge}>{project.group_name}</span>
        <h3>{project.title}</h3>
        <p>Display order: {project.sort_order}</p>
      </div>
      <div className={styles.itemActions}>
        <details className={styles.disclosure}>
          <summary>Edit</summary>
          <div className={styles.disclosureBody}>
            <ProjectForm
              action={updateProject}
              project={project}
              submitLabel="Save project"
            />
          </div>
        </details>
        <details className={`${styles.disclosure} ${styles.deleteDisclosure}`}>
          <summary>Delete</summary>
          <form action={deleteProject} className={styles.deleteConfirm}>
            <input type="hidden" name="id" value={project.id} />
            <span>Delete this project permanently?</span>
            <button className={styles.deleteButton} type="submit">
              Confirm delete
            </button>
          </form>
        </details>
      </div>
    </article>
  );
}

function ViewSwitch({ tab, view, options }) {
  return (
    <div className={styles.viewSwitch} role="tablist" aria-label="Section views">
      {options.map((option) => {
        const active = option.id === view;
        return (
          <a
            key={option.id}
            href={hrefFor({ tab, view: option.id })}
            className={`${styles.viewChip} ${active ? styles.viewChipActive : ""}`}
            role="tab"
            aria-selected={active}
          >
            {option.label}
          </a>
        );
      })}
    </div>
  );
}

function ProjectsPanel({
  view,
  projects,
  portfolioError,
  databaseErrorMessage,
}) {
  const activeView = view === "library" ? "library" : "add";

  return (
    <div className={styles.panelStack}>
      <ViewSwitch
        tab="projects"
        view={activeView}
        options={[
          { id: "add", label: "Add project" },
          { id: "library", label: `All projects (${projects.length})` },
        ]}
      />

      {activeView === "add" ? (
        <section className={styles.contentCard}>
          <div className={styles.contentHeader}>
            <div>
              <p className={styles.eyebrow}>Projects</p>
              <h2>Add project</h2>
              <p className={styles.lede}>
                Fill in the details below to publish a new project card on the
                portfolio.
              </p>
            </div>
          </div>
          {portfolioError && (
            <p className={styles.alert} role="alert">
              {databaseErrorMessage}
            </p>
          )}
          <ProjectForm action={createProject} submitLabel="Add project" />
        </section>
      ) : (
        <section className={styles.contentCard}>
          <div className={styles.contentHeader}>
            <div>
              <p className={styles.eyebrow}>Library</p>
              <h2>All projects</h2>
              <p className={styles.lede}>
                Edit, reorder, or remove existing portfolio projects.
              </p>
            </div>
            <span className={styles.countPill}>
              {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </span>
          </div>
          {!portfolioError && projects.length === 0 && (
            <p className={styles.emptyState}>
              No projects yet. Switch to Add project to create the first one.
            </p>
          )}
          <div className={styles.itemList}>
            {!portfolioError &&
              projects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SettingsPanel({ settings }) {
  return (
    <section className={styles.contentCard}>
      <div className={styles.contentHeader}>
        <div>
          <p className={styles.eyebrow}>Site details</p>
          <h2>Contact & shared copy</h2>
          <p className={styles.lede}>
            These fields power contact CTAs, footer text, and social links.
          </p>
        </div>
      </div>
      <PortfolioSettingsForm
        action={savePortfolioSettings}
        settings={settings}
      />
    </section>
  );
}

function BlogPanel({
  view,
  posts,
  postsError,
  postsErrorMessage,
}) {
  const activeView = view === "library" ? "library" : "write";

  return (
    <div className={styles.panelStack}>
      <ViewSwitch
        tab="blog"
        view={activeView}
        options={[
          { id: "write", label: "Write a post" },
          { id: "library", label: `All articles (${posts.length})` },
        ]}
      />

      {activeView === "write" ? (
        <section className={styles.contentCard}>
          <div className={styles.contentHeader}>
            <div>
              <p className={styles.eyebrow}>Blog</p>
              <h2>Write a post</h2>
              <p className={styles.lede}>
                Draft an article or publish it straight to the public blog.
              </p>
            </div>
          </div>
          <BlogPostForm action={createBlog} submitLabel="Save article" />
        </section>
      ) : (
        <section className={styles.contentCard}>
          <div className={styles.contentHeader}>
            <div>
              <p className={styles.eyebrow}>Library</p>
              <h2>All articles</h2>
              <p className={styles.lede}>
                Revise, publish, unpublish, or delete existing posts.
              </p>
            </div>
            <span className={styles.countPill}>
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>
          {postsError && (
            <p className={styles.alert} role="alert">
              {postsErrorMessage}
            </p>
          )}
          {!postsError && posts.length === 0 && (
            <p className={styles.emptyState}>
              No articles yet. Switch to Write a post to create the first one.
            </p>
          )}
          <div className={styles.itemList}>
            {!postsError &&
              posts.map((post) => <PostRow key={post.id} post={post} />)}
          </div>
        </section>
      )}
    </div>
  );
}

export default function AdminDashboard({
  tab,
  view,
  statusMessage,
  errorMessage,
  projects,
  portfolioError,
  portfolioSettings,
  posts,
  postsError,
  postsErrorMessage,
  databaseErrorMessage,
  counts,
}) {
  const activeTab = tabs.find((item) => item.id === tab) ?? tabs[0];

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <a className={styles.sidebarBrand} href="/" aria-label="Sandun Munasinghe home">
          <span className={styles.brandWordmark}>
            Sandun
            <span>
              Munasinghe<span className={styles.brandDot}>.</span>
            </span>
          </span>
        </a>
        <p className={styles.sidebarAdminLabel}>Admin panel</p>

        <nav className={styles.sideNav} aria-label="Admin sections">
          {tabs.map((item) => {
            const active = item.id === activeTab.id;
            return (
              <a
                key={item.id}
                href={hrefFor({
                  tab: item.id,
                  view:
                    item.id === "projects"
                      ? "add"
                      : item.id === "blog"
                        ? "write"
                        : undefined,
                })}
                className={`${styles.sideLink} ${active ? styles.sideLinkActive : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span>{item.label}</span>
                <small>{item.description}</small>
              </a>
            );
          })}
        </nav>

        <div className={styles.sidebarMeta}>
          <div className={styles.metaRow}>
            <span>Projects</span>
            <strong>{counts.projects}</strong>
          </div>
          <div className={styles.metaRow}>
            <span>Posts</span>
            <strong>{counts.posts}</strong>
          </div>
          <div className={styles.metaRow}>
            <span>Published</span>
            <strong>{counts.published}</strong>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.quickLinks}>
            <a className={styles.ghostLink} href="/">
              View site
            </a>
            <a className={styles.ghostLink} href="/blog">
              Public blog
            </a>
          </div>

          <form action={logout} className={styles.signOutForm}>
            <div className={styles.sessionCard}>
              <div className={styles.sessionInfo}>
                <div>
                  <strong>Admin session</strong>
                  <span>Signed in securely</span>
                </div>
              </div>
              <button className={styles.signOutButton} type="submit">
                <svg
                  className={styles.signOutIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 7V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C11.52 3 12.08 3 13.2 3h3.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 4.52 20 5.08 20 6.2v11.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C18.48 21 17.92 21 16.8 21h-3.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C10 19.48 10 18.92 10 17.8V17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 12H4m0 0 3-3m-3 3 3 3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Sign out</span>
              </button>
            </div>
          </form>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.workspaceHeader}>
          <div>
            <p className={styles.eyebrow}>Admin / {activeTab.label}</p>
            <h1>{activeTab.label}</h1>
            <p className={styles.lede}>{activeTab.description}</p>
          </div>
        </header>

        {statusMessage && (
          <p className={styles.success} role="status">
            {statusMessage}
          </p>
        )}
        {errorMessage && (
          <p className={styles.alert} role="alert">
            {errorMessage}
          </p>
        )}

        {activeTab.id === "projects" && (
          <ProjectsPanel
            view={view}
            projects={projects}
            portfolioError={portfolioError}
            databaseErrorMessage={databaseErrorMessage}
          />
        )}
        {activeTab.id === "settings" && (
          <SettingsPanel settings={portfolioSettings} />
        )}
        {activeTab.id === "blog" && (
          <BlogPanel
            view={view}
            posts={posts}
            postsError={postsError}
            postsErrorMessage={postsErrorMessage}
          />
        )}
      </div>
    </div>
  );
}
