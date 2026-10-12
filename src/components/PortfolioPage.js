"use client";

import { useEffect, useRef } from "react";


export default function PortfolioPage({ children }) {
  const root = useRef(null);
  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    scope.classList.add("motion-ready");
    const menuButton = scope.querySelector(".mobile-menu");
    const nav = scope.querySelector(".profile-tabs");
    const header = scope.querySelector(".header");
    const bodyOverflowBeforeMenu = document.body.style.overflow;
    const setMenuOpen = (open, returnFocus = false) => {
      nav?.classList.toggle("open", open);
      header?.classList.toggle("menu-open", open);
      menuButton?.setAttribute("aria-expanded", String(open));
      menuButton?.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      document.body.style.overflow = open ? "hidden" : bodyOverflowBeforeMenu;
      if (open) requestAnimationFrame(() => nav?.querySelector("a")?.focus());
      else if (returnFocus) menuButton?.focus();
    };
    const themeButton = scope.querySelector(".header .icon-button:not(.mobile-menu)");
    const initialTheme = localStorage.getItem("sandun-theme");
    if (initialTheme === "dark") document.documentElement.dataset.theme = "dark";
    const onMenu = () => setMenuOpen(!nav?.classList.contains("open"));
    const onTheme = () => {
      const dark = document.documentElement.dataset.theme !== "dark";
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      localStorage.setItem("sandun-theme", dark ? "dark" : "light");
      themeButton?.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    };
    const draftForm = scope.querySelector(".reckitt-editor form");
    const draftFields = draftForm ? [...draftForm.querySelectorAll("input, textarea")] : [];
    const draftStatus = draftForm?.querySelector('[role="status"]');
    const draftKey = "sandun-reckitt-experience-draft";
    try {
      const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (saved && draftFields.length) {
        draftFields.forEach((field, index) => { field.value = saved[index] || ""; });
        if (draftStatus) draftStatus.textContent = "Saved local draft restored.";
      }
    } catch { /* Ignore malformed local-only draft data. */ }
    const onDraftSave = (event) => {
      event.preventDefault();
      const values = draftFields.map((field) => field.value);
      localStorage.setItem(draftKey, JSON.stringify(values));
      if (draftStatus) draftStatus.textContent = "Draft saved in this browser.";
    };
    const onFilter = (event) => {
      const button = event.target.closest(".filters button");
      if (!button || !scope.contains(button)) return;
      const filters = button.parentElement;
      filters.querySelectorAll("button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      const filter = button.textContent.trim();
      const cards = [...scope.querySelectorAll(".project-card")];
      let shown = 0;
      cards.forEach((card) => {
        const isChemical = card.classList.contains("showcase-chem") || card.classList.contains("chemical");
        const visible = filter === "All" || (filter === "Chemical Engineering" ? isChemical : !isChemical);
        card.hidden = !visible;
        if (visible) shown++;
      });
      const count = scope.querySelector(".work-result-count");
      if (count) count.textContent = `${shown} project${shown === 1 ? "" : "s"}`;
    };
    const onNav = (event) => {
      if (event.target === nav) setMenuOpen(false, true);
      else if (event.target.closest(".profile-tabs a")) setMenuOpen(false);
    };
    const onEscape = (event) => {
      if (event.key === "Escape" && nav?.classList.contains("open")) {
        event.preventDefault();
        setMenuOpen(false, true);
      }
      if (event.key === "Tab" && nav?.classList.contains("open")) {
        const links = [...nav.querySelectorAll("a[href]")];
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    draftForm?.addEventListener("submit", onDraftSave);
    menuButton?.addEventListener("click", onMenu);
    themeButton?.addEventListener("click", onTheme);
    scope.addEventListener("click", onFilter);
    scope.addEventListener("click", onNav);
    document.addEventListener("keydown", onEscape);
    let observer;
    const sections = [...scope.querySelectorAll("#main > section, .portfolio-footer")];
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });
      sections.forEach((section) => observer.observe(section));
    } else {
      sections.forEach((section) => section.classList.add("is-visible"));
    }
    return () => {
      draftForm?.removeEventListener("submit", onDraftSave);
      menuButton?.removeEventListener("click", onMenu);
      themeButton?.removeEventListener("click", onTheme);
      scope.removeEventListener("click", onFilter);
      scope.removeEventListener("click", onNav);
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = bodyOverflowBeforeMenu;
      observer?.disconnect();
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
