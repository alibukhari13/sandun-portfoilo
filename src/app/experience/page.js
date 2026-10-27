import PortfolioLayout from "@/components/PortfolioLayout";
import ExperiencePage from "@/components/pages/experience";

export const dynamic = "force-dynamic";

export default function Page() {
  return <PortfolioLayout><ExperiencePage /></PortfolioLayout>;
}
