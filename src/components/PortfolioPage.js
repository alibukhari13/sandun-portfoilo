"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";

const pages = [
  ["Overview", "/"], ["About", "/about"], ["Experience", "/experience"],
  ["Projects", "/projects"], ["Skills", "/skills"], ["Education", "/education"],
  ["Blog", "/blog"], ["Recommendations", "/recommendations"], ["Contact", "/contact"],
];

function Arrow({ diagonal = true }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M5 12h14m-6-6 6 6-6 6"} /></svg>;
}

function MenuIcon({ open }) {
  return (
    <svg
      width="22" height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {/* Top line — rotates to first diagonal */}
      <line
        x1="3" y1="6" x2="19" y2="6"
        style={{
          transformOrigin: "11px 6px",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s",
          transform: open ? "translateY(5px) rotate(45deg)" : "none",
        }}
      />
      {/* Middle line — fades out */}
      <line
        x1="3" y1="11" x2="19" y2="11"
        style={{
          transformOrigin: "11px 11px",
          transition: "opacity 0.2s, transform 0.35s",
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0)" : "scaleX(1)",
        }}
      />
      {/* Bottom line — rotates to second diagonal */}
      <line
        x1="3" y1="16" x2="19" y2="16"
        style={{
          transformOrigin: "11px 16px",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s",
          transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
        }}
      />
    </svg>
  );
}

function readThemePreference() {
  try {
    const saved = window.localStorage.getItem("sandun-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("sandun-theme="))?.split("=")[1] || "dark";
}

function saveThemePreference(theme) {
  try { window.localStorage.setItem("sandun-theme", theme); } catch {}
  document.cookie = `sandun-theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

function Header({ path }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const saved = readThemePreference() === "dark";
    setDark(saved);
    document.documentElement.dataset.theme = saved ? "dark" : "light";
  }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    saveThemePreference(next ? "dark" : "light");
  }
  const visiblePages = pages;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`header site-header ${menuOpen ? "menu-open" : ""}`}>
      <Link className="wordmark" href="/">Sandun<span>Munasinghe<span className="brand-dot">.</span></span></Link>
      <nav className="main-nav" aria-label="Main navigation">
        {visiblePages.map(([label, href]) => <Link key={href} className={path === href ? "active" : ""} aria-current={path === href ? "page" : undefined} href={href}>{label}</Link>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-button theme-toggle" onClick={toggleTheme} aria-pressed={dark} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z"/></svg> : "☀"}</button>
        <Link className="nav-contact" href="/contact">Let’s talk <Arrow /></Link>
        <button className="icon-button mobile-menu" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><MenuIcon open={menuOpen} /></button>
      </div>
    </header>
    <nav className={`profile-tabs ${menuOpen ? "open" : ""}`} aria-label="Portfolio pages">
      <div className="container">{visiblePages.map(([label, href]) => <Link key={href} className={path === href ? "active" : ""} aria-current={path === href ? "page" : undefined} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}</div>
    </nav>
  </>;
}

function Footer({ path }) {
  return <>
    <footer className={`portfolio-footer site-footer${path === "/about" ? " about-site-footer" : ""}`}>
    <div className="footer-network"><NeuralNetwork density="dense" /></div>
    <div className="container footer-inner">
      {(path === "/" || path === "/experience") ? <>
        <div className="footer-top"><div className="footer-invitation"><span className="footer-label">OPEN TO OPPORTUNITIES</span><h2>Let’s build something<br/><span>meaningful.</span></h2><p>Open to opportunities in machine learning, AI, and chemical engineering.</p><div className="footer-buttons"><Link className="button footer-email-button" href="/contact">Email Sandun <Arrow /></Link><a className="button footer-resume-button" href="/assets/Sandun_Munasinghe.pdf" target="_blank" rel="noreferrer">Download Resume <span aria-hidden="true">↓</span></a></div></div><div className="footer-contact"><span className="footer-label">START A CONVERSATION</span><a href="mailto:sandunmunasinghe2017@gmail.com">sandunmunasinghe2017@gmail.com <Arrow /></a><p>Great ideas begin with a connection.</p></div></div>
        <div className="footer-bottom"><div className="footer-socials"><a href="https://github.com/sandunmunasinghe91?tab=repositories" target="_blank" rel="noreferrer" aria-label="Sandun on GitHub"><svg viewBox="0 0 24 24"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.03 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg></a><a href="https://www.linkedin.com/in/sandun-munasinghe-268a1a27b" target="_blank" rel="noreferrer" aria-label="Sandun on LinkedIn"><svg viewBox="0 0 24 24"><path d="M5.1 8.3H1.8V22h3.3V8.3ZM3.45 2a1.92 1.92 0 1 0 0 3.84 1.92 1.92 0 0 0 0-3.84ZM22.2 14.15c0-4.12-2.2-6.04-5.14-6.04a4.44 4.44 0 0 0-4 2.2V8.3H9.8V22h3.27v-6.78c0-1.79.34-3.52 2.55-3.52 2.17 0 2.2 2.04 2.2 3.64V22h3.28l1.1-7.85Z"/></svg></a><a href="mailto:sandunmunasinghe2017@gmail.com" aria-label="Email Sandun"><svg viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg></a></div><p>© 2026 Sandun Munasinghe</p><a className="footer-back-top" href="#main">Back to top <span aria-hidden="true">↑</span></a></div>
      </> : <div className="footer-top inner-footer-top"><div className="footer-invitation"><span className="footer-label">{path === "/contact" ? "04 / LET’S CONNECT" : path === "/about" ? "06 / LET’S CONNECT" : "LET’S CONNECT"}</span><h2>Let’s build something<br/><span>meaningful.</span></h2><p>Open to opportunities in machine learning, AI, and chemical engineering.{path === "/about" ? " Great ideas begin with a conversation." : ""}</p><div className="footer-buttons"><Link className="button footer-email-button" href="/contact">{path === "/contact" ? "Send a Message" : path === "/about" ? "Email Sandun" : path === "/education" ? "Get in Touch" : "Get in Touch"} <Arrow /></Link><a className="button footer-resume-button" href="/assets/Sandun_Munasinghe.pdf" target="_blank" rel="noreferrer">{path === "/about" ? "View Resume" : "Download Resume"} {path === "/about" ? <svg className="footer-download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 19h14" /></svg> : <span aria-hidden="true">↓</span>}</a></div></div></div>}
    </div>
    </footer>
    {path !== "/" && <div className={`contact-subfooter${path === "/about" ? " about-subfooter" : ""}`}><Link className="wordmark" href="/">Sandun<span>Munasinghe<span className="brand-dot">.</span></span></Link><nav aria-label="Footer navigation">{pages.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>)}</nav><div className="contact-subfooter-socials"><a href="https://github.com/sandunmunasinghe91?tab=repositories" aria-label="Sandun on GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg></a><a href="https://www.linkedin.com/in/sandun-munasinghe-268a1a27b" aria-label="Sandun on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.1 8.3H1.8V22h3.3V8.3ZM3.45 2a1.92 1.92 0 1 0 0 3.84 1.92 1.92 0 0 0 0-3.84ZM22.2 14.15c0-4.12-2.2-6.04-5.14-6.04a4.44 4.44 0 0 0-4 2.2V8.3H9.8V22h3.27v-6.78c0-1.79.34-3.52 2.55-3.52 2.17 0 2.2 2.04 2.2 3.64V22h3.28l1.1-7.85Z"/></svg></a><a href="mailto:sandunmunasinghe2017@gmail.com" aria-label="Email Sandun"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg></a></div>{path === "/about" && <p className="subfooter-copy">© 2026 Sandun Munasinghe.<br />All rights reserved.</p>}</div>}
  </>;
}

export default function PortfolioPage({ children }) {
  const path = usePathname();
  const [showIntro, setShowIntro] = useState(false);
  const [landingReveal, setLandingReveal] = useState(false);
  useLayoutEffect(() => {
    if (path === "/") {
      let playIntro = document.documentElement.dataset.startup === "play";
      if (!playIntro) {
        try {
          playIntro = !window.sessionStorage.getItem("sandun-startup-seen");
          if (playIntro) window.sessionStorage.setItem("sandun-startup-seen", "1");
        } catch {}
      }

      if (playIntro) {
        // Set state FIRST so neural-intro renders, THEN remove the CSS lock
        // This prevents the blink (flash of unstyled content)
        setShowIntro(true);
        setLandingReveal(false);
        // Use rAF to wait for paint — neural-intro is in DOM before CSS hiding lifts
        requestAnimationFrame(() => {
          delete document.documentElement.dataset.startup;
        });
        const timer = setTimeout(() => {
          setShowIntro(false);
          setLandingReveal(true);
        }, 2100);
        return () => clearTimeout(timer);
      } else {
        // No intro — remove lock immediately, reveal page
        delete document.documentElement.dataset.startup;
        setShowIntro(false);
        setLandingReveal(true);
        return;
      }
    }
    setShowIntro(false);
    setLandingReveal(false);
  }, [path]);
  useLayoutEffect(() => {
    const root = document.getElementById("main");
    if (!root) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    document.documentElement.classList.add("js-reveal");
    const nodes = [...root.querySelectorAll(".home-hero-copy, .home-portrait-stage, .hero-metrics > div, .credential-item, .focus-inner > div, .home-project-card, .xp-hero-copy, .xp-globe, .xp-role, .xp-panel, .xp-quote, .about-photo, .about-copy, .about-pillars article, .stats-strip > div, .about-record-grid > article, .skill-detail-card, .detailed-project, .degree-card, .coursework-grid > article, .beyond-row, .contact-copy, .message-card, .topic-grid article, .faq-block, .skills-in-action, .upcoming-card")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    nodes.forEach((node, index) => {
      node.classList.add("reveal");
      node.style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) node.classList.add("reveal-in");
      else observer.observe(node);
    });
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, [path]);
  return <div id="root" className={`site-root ${landingReveal ? "landing-reveal" : ""}`}>
    {showIntro && <div className="neural-intro" aria-hidden="true"><NeuralNetwork density="dense" /><div className="intro-brand"><span className="intro-mark"><svg viewBox="0 0 48 48"><path d="M8 25 19 11l10 7 11-8M8 25l10 12 11-10 11 6M19 11l-1 26M29 18l0 9M8 25l32 6"/><circle cx="8" cy="25" r="3"/><circle cx="19" cy="11" r="3"/><circle cx="29" cy="18" r="3"/><circle cx="40" cy="10" r="3"/><circle cx="18" cy="37" r="3"/><circle cx="29" cy="27" r="3"/><circle cx="40" cy="33" r="3"/></svg></span><span className="intro-wordmark">Sandun<br/>Munasinghe<span>.</span></span></div><span className="intro-caption">CONNECTING IDEAS</span><span className="intro-progress"><i/></span></div>}
    <Header path={path} />
    <div className="route-stage" key={path}><main id="main" tabIndex="-1" className="page-content">{children}</main></div>
    <Footer path={path} />
  </div>;
}
