import PortfolioLayout from "@/components/PortfolioLayout";
import AboutPage from "@/components/pages/about";

export const dynamic = "force-dynamic";

export default function Page() {
  return <PortfolioLayout><AboutPage /></PortfolioLayout>;
}
