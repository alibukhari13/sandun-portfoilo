import PortfolioLayout from "@/components/PortfolioLayout";
import ProjectsPage from "@/components/pages/projects";
import { getPortfolioProjects, getPortfolioSettings } from "@/lib/portfolio-content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [projects, settings] = await Promise.all([getPortfolioProjects(), getPortfolioSettings()]);
  return <PortfolioLayout settings={settings} pageHref="/projects"><ProjectsPage projects={projects} /></PortfolioLayout>;
}
