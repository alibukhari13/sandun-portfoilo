import PortfolioLayout from "@/components/PortfolioLayout";
import ProjectsPage from "@/components/pages/projects";
import { getPortfolioProjects } from "@/lib/portfolio-content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = await getPortfolioProjects();
  return <PortfolioLayout><ProjectsPage projects={projects} /></PortfolioLayout>;
}
