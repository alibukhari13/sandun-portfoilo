import PortfolioPage from "@/components/PortfolioPage";
import { getPortfolioSettings, guardPublicPage } from "@/lib/portfolio-content";

export default async function PortfolioLayout({ children, settings: initialSettings, pageHref }) {
  const settings = pageHref
    ? await guardPublicPage(pageHref, initialSettings)
    : (initialSettings ?? await getPortfolioSettings());
  return <PortfolioPage settings={settings}>{children}</PortfolioPage>;
}
