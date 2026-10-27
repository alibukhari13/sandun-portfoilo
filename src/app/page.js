import PortfolioLayout from "@/components/PortfolioLayout";
import OverviewPage from "@/components/pages/overview";
import { getPortfolioProjects } from "@/lib/portfolio-content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = await getPortfolioProjects();
  return <PortfolioLayout><OverviewPage projects={projects} /></PortfolioLayout>;
}
