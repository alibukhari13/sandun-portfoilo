import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Sandun Munasinghe — Machine Learning & AI Researcher",
  description: "Research-led. Engineering-grounded. The portfolio of Sandun Munasinghe.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>
    <Script id="portfolio-startup-gate" strategy="beforeInteractive">
      {`try { if (location.pathname === "/" && !sessionStorage.getItem("sandun-startup-seen")) { sessionStorage.setItem("sandun-startup-seen", "1"); document.documentElement.dataset.startup = "play"; } } catch {}`}
    </Script>
    {children}
  </body></html>;
}
