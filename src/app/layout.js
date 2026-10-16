import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Sandun Munasinghe — Machine Learning & AI Researcher",
  description: "Research-led. Engineering-grounded. The portfolio of Sandun Munasinghe.",
};

export default function RootLayout({ children }) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><body>
    {/* 1. Anti-blink: hide body until JS confirms theme + startup state */}
    <Script id="portfolio-anti-blink" strategy="beforeInteractive">{`
      (function(){
        try {
          // Apply saved theme instantly — prevents theme flash
          var t = localStorage.getItem('sandun-theme') || (document.cookie.match(/sandun-theme=([^;]+)/)||[])[1] || 'dark';
          document.documentElement.dataset.theme = t;
        } catch(e) {}
        try {
          // Mark for startup animation if first visit
          if (location.pathname === '/' && !sessionStorage.getItem('sandun-startup-seen')) {
            sessionStorage.setItem('sandun-startup-seen', '1');
            document.documentElement.dataset.startup = 'play';
          }
        } catch(e) {}
      })();
    `}</Script>
    {children}
  </body></html>;
}
