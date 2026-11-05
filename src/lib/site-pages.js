export const sitePages = [
  { label: "Overview", href: "/", locked: true },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Education", href: "/education" },
  { label: "Blog", href: "/blog" },
  { label: "Recommendations", href: "/recommendations" },
  { label: "Contact", href: "/contact" },
];

const hideableHrefs = new Set(sitePages.filter((page) => !page.locked).map((page) => page.href));

export function normalizeHiddenPages(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((href) => hideableHrefs.has(href)))];
}

export function getHiddenPages(settings) {
  return normalizeHiddenPages(settings?.hidden_pages);
}

export function isPageVisible(settings, href) {
  return !getHiddenPages(settings).includes(href);
}

export function getVisiblePages(settings) {
  const hidden = new Set(getHiddenPages(settings));
  return sitePages.filter((page) => !hidden.has(page.href));
}
