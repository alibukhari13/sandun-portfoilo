import PortfolioLayout from "@/components/PortfolioLayout";
import RecommendationsPage from "@/components/pages/recommendations";

export const dynamic = "force-dynamic";

export default function Page() {
  return <PortfolioLayout><RecommendationsPage /></PortfolioLayout>;
}
