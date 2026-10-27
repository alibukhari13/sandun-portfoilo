import PortfolioLayout from "@/components/PortfolioLayout";
import SkillsPage from "@/components/pages/skills";

export const dynamic = "force-dynamic";

export default function Page() {
  return <PortfolioLayout><SkillsPage /></PortfolioLayout>;
}
