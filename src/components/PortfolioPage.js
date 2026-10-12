"use client";

import { useEffect, useRef } from "react";

export default function PortfolioPage({ markup }) {
  const root = useRef(null);
  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    scope.classList.add("motion-ready");
    const menuButton = scope.querySelector(".mobile-menu");
    const nav = scope.querySelector(".profile-tabs");
    const themeButton = scope.querySelector(".header .icon-button:not(.mobile-menu)");
    const initialTheme = localStorage.getItem("sandun-theme");
    if (initialTheme === "dark") document.documentElement.dataset.theme = "dark";
    const onMenu = () => {
      const open = nav?.classList.toggle("open") ?? false;
      menuButton?.setAttribute("aria-expanded", String(open));
      menuButton?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
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
      if (event.target.closest(".profile-tabs a")) {
        nav?.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");
      }
    };
    draftForm?.addEventListener("submit", onDraftSave);
    menuButton?.addEventListener("click", onMenu);
    themeButton?.addEventListener("click", onTheme);
    scope.addEventListener("click", onFilter);
    scope.addEventListener("click", onNav);
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
      observer?.disconnect();
    };
  }, []);
  return <div ref={root} dangerouslySetInnerHTML={{ __html: markup }} />;
}
