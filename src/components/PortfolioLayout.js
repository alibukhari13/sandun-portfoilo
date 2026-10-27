import PortfolioPage from "@/components/PortfolioPage";
import { getPortfolioSettings } from "@/lib/portfolio-content";

export default async function PortfolioLayout({ children }) {
  const settings = await getPortfolioSettings();
  return <PortfolioPage settings={settings}>{children}</PortfolioPage>;
}
