"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import NeuralNetwork from "@/components/NeuralNetwork";
import ParticleWave from "@/components/ParticleWave";
import { PortfolioSettingsProvider } from "@/components/PortfolioSettingsContext";
import { getVisiblePages, isPageVisible } from "@/lib/site-pages";

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

function StartupIntro() {
  return (
    <div className="neural-intro" aria-hidden="true">
      <NeuralNetwork density="dense" />
      <div className="intro-brand">
        <span className="intro-mark">
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M9 24h10l5-10 6 20 4-10h5" />
            <circle cx="9" cy="24" r="2.5" /><circle cx="19" cy="24" r="2.5" />
            <circle cx="24" cy="14" r="2.5" /><circle cx="30" cy="34" r="2.5" />
            <circle cx="34" cy="24" r="2.5" /><circle cx="39" cy="24" r="2.5" />
          </svg>
        </span>
        <span className="intro-wordmark">Sandun Munasinghe<span>.</span></span>
      </div>
      <p className="intro-caption">AI · RESEARCH · ENGINEERING</p>
      <div className="intro-progress"><i /></div>
    </div>
  );
}

function Header({ path, settings }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const visiblePages = useMemo(() => getVisiblePages(settings), [settings]);
  const showContact = isPageVisible(settings, "/contact");
  useLayoutEffect(() => {
    const saved = readThemePreference();
    document.documentElement.dataset.theme = saved;
    const frame = requestAnimationFrame(() => setDark(saved === "dark"));
    return () => cancelAnimationFrame(frame);
  }, [path]);
  useEffect(() => {
    const sync = () => {
      const saved = readThemePreference();
      const isDark = saved === "dark";
      setDark(isDark);
      document.documentElement.dataset.theme = saved;
    };
    const onStorage = (event) => {
      if (event.key === "sandun-theme" || event.key === null) sync();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("sandun-theme-change", sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("sandun-theme-change", sync);
    };
  }, []);
  useEffect(() => {
    if (menuOpen) visiblePages.forEach((page) => router.prefetch(page.href));
  }, [menuOpen, router, visiblePages]);
  function toggleTheme() {
    const next = !dark;
    const theme = next ? "dark" : "light";
    setDark(next);
    document.documentElement.dataset.theme = theme;
    saveThemePreference(theme);
    window.dispatchEvent(new Event("sandun-theme-change"));
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`header site-header ${menuOpen ? "menu-open" : ""}`}>
      <Link className="wordmark" href="/">Sandun<span>Munasinghe<span className="brand-dot">.</span></span></Link>
      <nav className="main-nav" aria-label="Main navigation">
        {visiblePages.map((page) => <Link key={page.href} prefetch className={path === page.href ? "active" : ""} aria-current={path === page.href ? "page" : undefined} href={page.href}>{page.label}</Link>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-button theme-toggle" onClick={toggleTheme} aria-pressed={dark} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z"/></svg> : "☀"}</button>
        {showContact && <Link className="nav-contact" href="/contact">Let’s talk <Arrow /></Link>}
        <button className="icon-button mobile-menu" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><MenuIcon open={menuOpen} /></button>
      </div>
    </header>
    <nav className={`profile-tabs ${menuOpen ? "open" : ""}`} aria-label="Portfolio pages">
      <div className="container">{visiblePages.map((page) => <Link key={page.href} prefetch className={path === page.href ? "active" : ""} aria-current={path === page.href ? "page" : undefined} href={page.href} onClick={() => setMenuOpen(false)}>{page.label}</Link>)}</div>
    </nav>
  </>;
}

function SocialLinks({ settings, className }) {
  return (
    <div className={className}>
      {settings.github_url && (
        <a href={settings.github_url} target="_blank" rel="noreferrer" aria-label="Sandun on GitHub">
          <FaGithub className="social-github-icon" aria-hidden="true" focusable="false" />
        </a>
      )}
      {settings.linkedin_url && (
        <a href={settings.linkedin_url} target="_blank" rel="noreferrer" aria-label="Sandun on LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.1 8.3H1.8V22h3.3V8.3ZM3.45 2a1.92 1.92 0 1 0 0 3.84 1.92 1.92 0 0 0 0-3.84ZM22.2 14.15c0-4.12-2.2-6.04-5.14-6.04a4.44 4.44 0 0 0-4 2.2V8.3H9.8V22h3.27v-6.78c0-1.79.34-3.52 2.55-3.52 2.17 0 2.2 2.04 2.2 3.64V22h3.28l1.1-7.85Z"/></svg>
        </a>
      )}
      {settings.contact_email && (
        <a href={`mailto:${settings.contact_email}`} aria-label="Email Sandun">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>
        </a>
      )}
    </div>
  );
}

function FooterHeading({ children }) {
  const text = String(children ?? "").trim();
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return <h2>{text}</h2>;
  }
  const highlight = words.pop();
  return (
    <h2>
      {words.join(" ")}
      <br />
      <span>{highlight}</span>
    </h2>
  );
}

function FooterDescription({ children }) {
  const lines = String(children ?? "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length <= 1) {
    const text = lines[0] ?? "";
    const splitAt = text.indexOf(". ");
    if (splitAt === -1) return <p>{text}</p>;
    return (
      <p>
        {text.slice(0, splitAt + 1)}
        <br />
        {text.slice(splitAt + 2)}
      </p>
    );
  }
  return (
    <p>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {index > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </p>
  );
}

function Footer({ path, settings }) {
  const visiblePages = getVisiblePages(settings);
  const showContact = isPageVisible(settings, "/contact");
  return <>
    <footer className="portfolio-footer site-footer">
    <ParticleWave className="footer-wave" rows={22} phase={2.4} lift={-20} amplitude={38} />
    <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-invitation">
            <FooterHeading>{settings.footer_heading}</FooterHeading>
            <FooterDescription>{settings.footer_description}</FooterDescription>
            <SocialLinks settings={settings} className="footer-socials" />
          </div>
          <div className="footer-contact">
            <span className="footer-label">START A CONVERSATION</span>
            {settings.contact_email && <a href={`mailto:${settings.contact_email}`}>{settings.contact_email} <Arrow /></a>}
            <div className="footer-buttons">
              {showContact && <Link className="button footer-email-button" href="/contact">Email Sandun <Arrow /></Link>}
              <a className="button footer-resume-button" href="/assets/Sandun_Munasinghe.pdf" target="_blank" rel="noreferrer">Download Resume <svg className="tray-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v11m-4.5-4.5 4.5 4.5 4.5-4.5M4 15.5v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></svg></a>
            </div>
          </div>
        </div>
    </div>
    </footer>
    <div className="contact-subfooter home-subfooter">
      <Link className="wordmark" href="/">Sandun<span>Munasinghe<span className="brand-dot">.</span></span></Link>
      <nav aria-label="Footer navigation">{visiblePages.map((page) => <Link key={page.href} href={page.href} aria-current={path === page.href ? "page" : undefined}>{page.label}</Link>)}</nav>
      <SocialLinks settings={settings} className="contact-subfooter-socials" />
      <p className="subfooter-copy">© 2026 Sandun Munasinghe.<br />All rights reserved.</p>
    </div>
  </>;
}

export default function PortfolioPage({ children, settings }) {
  const path = usePathname();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);
  useEffect(() => {
    if (document.documentElement.dataset.startup !== "play") return;
    const finishIntro = () => {
      delete document.documentElement.dataset.startup;
      document.getElementById("root")?.classList.add("landing-reveal");
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishIntro();
      return;
    }
    const timer = window.setTimeout(finishIntro, 2100);
    return () => window.clearTimeout(timer);
  }, []);
  return <PortfolioSettingsProvider settings={settings}><div id="root" className="site-root home-footer">
    <StartupIntro />
    <Header path={path} settings={settings} />
    <div className="route-stage" key={path}><main id="main" tabIndex="-1" className="page-content">{children}</main></div>
    <Footer path={path} settings={settings} />
  </div></PortfolioSettingsProvider>;
}
