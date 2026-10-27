import PortfolioLayout from "@/components/PortfolioLayout";
import EducationPage from "@/components/pages/education";

export const dynamic = "force-dynamic";

export default function Page() {
  return <PortfolioLayout><EducationPage /></PortfolioLayout>;
}
