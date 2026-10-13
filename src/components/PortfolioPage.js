"use client";

import { useEffect, useState } from "react";
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

function Header({ path }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let saved = false;
    try { saved = localStorage.getItem("sandun-theme") === "dark"; } catch {}
    setDark(saved);
    document.documentElement.dataset.theme = saved ? "dark" : "light";
  }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try { localStorage.setItem("sandun-theme", next ? "dark" : "light"); } catch {}
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
        <button className="icon-button theme-toggle" onClick={toggleTheme} aria-pressed={dark} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? "☀" : "☾"}</button>
        <Link className="nav-contact" href="/contact">Let’s talk <Arrow /></Link>
        <button className="icon-button mobile-menu" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
      </div>
    </header>
    <nav className={`profile-tabs ${menuOpen ? "open" : ""}`} aria-label="Portfolio pages">
      <div className="container">{visiblePages.map(([label, href]) => <Link key={href} className={path === href ? "active" : ""} aria-current={path === href ? "page" : undefined} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}</div>
    </nav>
  </>;
}

function Footer({ path }) {
  return <>
    <footer className="portfolio-footer site-footer">
    <div className="footer-network"><NeuralNetwork density="dense" /></div>
    <div className="container footer-inner">
      {path === "/" ? <>
        <div className="footer-top"><div className="footer-invitation"><span className="footer-label">OPEN TO OPPORTUNITIES</span><h2>Let’s build something<br/><span>meaningful.</span></h2><p>Open to opportunities in machine learning, AI, and chemical engineering.</p><div className="footer-buttons"><Link className="button footer-email-button" href="/contact">Email Sandun <Arrow /></Link><a className="button footer-resume-button" href="https://sandun.figma.site/Sandun-Munasinghe-Resume.pdf" target="_blank" rel="noreferrer">Download Resume <span aria-hidden="true">↓</span></a></div></div><div className="footer-contact"><span className="footer-label">START A CONVERSATION</span><a href="mailto:sandunmunasinghe2017@gmail.com">sandunmunasinghe2017@gmail.com <Arrow /></a><p>Great ideas begin with a connection.</p></div></div>
        <div className="footer-bottom"><div className="footer-socials"><a href="https://github.com/sandunmunasinghe91?tab=repositories" target="_blank" rel="noreferrer" aria-label="Sandun on GitHub"><svg viewBox="0 0 24 24"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.03 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg></a><a href="https://www.linkedin.com/in/sandun-munasinghe-268a1a27b" target="_blank" rel="noreferrer" aria-label="Sandun on LinkedIn"><svg viewBox="0 0 24 24"><path d="M5.1 8.3H1.8V22h3.3V8.3ZM3.45 2a1.92 1.92 0 1 0 0 3.84 1.92 1.92 0 0 0 0-3.84ZM22.2 14.15c0-4.12-2.2-6.04-5.14-6.04a4.44 4.44 0 0 0-4 2.2V8.3H9.8V22h3.27v-6.78c0-1.79.34-3.52 2.55-3.52 2.17 0 2.2 2.04 2.2 3.64V22h3.28l1.1-7.85Z"/></svg></a><a href="mailto:sandunmunasinghe2017@gmail.com" aria-label="Email Sandun"><svg viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg></a></div><p>© 2026 Sandun Munasinghe</p><a className="footer-back-top" href="#main">Back to top <span aria-hidden="true">↑</span></a></div>
      </> : <div className="footer-top inner-footer-top"><div className="footer-invitation"><span className="footer-label">{path === "/contact" ? "04 / LET’S CONNECT" : "LET’S CONNECT"}</span><h2>Let’s build something<br/><span>meaningful.</span></h2><p>Open to opportunities in machine learning, AI, and chemical engineering.</p><div className="footer-buttons"><Link className="button footer-email-button" href="/contact">{path === "/contact" ? "Send a Message" : "Get in Touch"} <Arrow /></Link><a className="button footer-resume-button" href="https://sandun.figma.site/Sandun-Munasinghe-Resume.pdf" target="_blank" rel="noreferrer">View Resume <span aria-hidden="true">↓</span></a></div></div></div>}
    </div>
    </footer>
    {path !== "/" && <div className="contact-subfooter"><Link className="wordmark" href="/">Sandun<span>Munasinghe<span className="brand-dot">.</span></span></Link><nav aria-label="Footer navigation">{pages.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>)}</nav><div className="contact-subfooter-socials"><a href="https://github.com/sandunmunasinghe91?tab=repositories" aria-label="Sandun on GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg></a><a href="https://www.linkedin.com/in/sandun-munasinghe-268a1a27b" aria-label="Sandun on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.1 8.3H1.8V22h3.3V8.3ZM3.45 2a1.92 1.92 0 1 0 0 3.84 1.92 1.92 0 0 0 0-3.84ZM22.2 14.15c0-4.12-2.2-6.04-5.14-6.04a4.44 4.44 0 0 0-4 2.2V8.3H9.8V22h3.27v-6.78c0-1.79.34-3.52 2.55-3.52 2.17 0 2.2 2.04 2.2 3.64V22h3.28l1.1-7.85Z"/></svg></a><a href="mailto:sandunmunasinghe2017@gmail.com" aria-label="Email Sandun"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg></a></div></div>}
  </>;
}

export default function PortfolioPage({ children }) {
  const path = usePathname();
  const [showIntro, setShowIntro] = useState(path === "/");
  const [landingReveal, setLandingReveal] = useState(false);
  useEffect(() => {
    if (path === "/") {
      setShowIntro(true);
      setLandingReveal(false);
      const timer = setTimeout(() => {
        setShowIntro(false);
        setLandingReveal(true);
      }, 2650);
      return () => clearTimeout(timer);
    }
    setShowIntro(false);
    setLandingReveal(false);
  }, [path]);
  return <div id="root" className={`site-root ${landingReveal ? "landing-reveal" : ""}`}>
    {showIntro && <div className="neural-intro" aria-hidden="true"><NeuralNetwork density="dense" /><div className="intro-brand"><span className="intro-mark"><svg viewBox="0 0 48 48"><path d="M8 25 19 11l10 7 11-8M8 25l10 12 11-10 11 6M19 11l-1 26M29 18l0 9M8 25l32 6"/><circle cx="8" cy="25" r="3"/><circle cx="19" cy="11" r="3"/><circle cx="29" cy="18" r="3"/><circle cx="40" cy="10" r="3"/><circle cx="18" cy="37" r="3"/><circle cx="29" cy="27" r="3"/><circle cx="40" cy="33" r="3"/></svg></span><span className="intro-wordmark">Sandun<br/>Munasinghe<span>.</span></span></div><span className="intro-caption">CONNECTING IDEAS</span><span className="intro-progress"><i/></span></div>}
    <Header path={path} />
    <div className="route-stage" key={path}><main id="main" tabIndex="-1" className="page-content">{children}</main></div>
    <Footer path={path} />
  </div>;
}
