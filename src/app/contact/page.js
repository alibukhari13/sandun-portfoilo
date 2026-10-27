import PortfolioLayout from "@/components/PortfolioLayout";
import ContactPage from "@/components/pages/contact";

export const dynamic = "force-dynamic";

export default function Page() {
  return <PortfolioLayout><ContactPage /></PortfolioLayout>;
}
