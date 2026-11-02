import PortfolioLayout from "@/components/PortfolioLayout";
import OverviewPage from "@/components/pages/overview";
import { getPortfolioProjects, getPortfolioSettings } from "@/lib/portfolio-content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [projects, settings] = await Promise.all([getPortfolioProjects(), getPortfolioSettings()]);
  return <PortfolioLayout settings={settings}><OverviewPage projects={projects} /></PortfolioLayout>;
}
