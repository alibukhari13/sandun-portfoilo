import PortfolioPage from "@/components/PortfolioPage";
import { getPortfolioSettings } from "@/lib/portfolio-content";

export default async function PortfolioLayout({ children, settings: initialSettings }) {
  const settings = initialSettings ?? await getPortfolioSettings();
  return <PortfolioPage settings={settings}>{children}</PortfolioPage>;
}
