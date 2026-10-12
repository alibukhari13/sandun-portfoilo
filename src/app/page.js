import { readFileSync } from "node:fs";
import { join } from "node:path";
import PortfolioPage from "@/components/PortfolioPage";

export default function Page() {
  const markup = readFileSync(join(process.cwd(), "src/content/pages/overview.html"), "utf8");
  return <PortfolioPage markup={markup} />;
}
