import PortfolioPage from "@/components/PortfolioPage";
import BlogPage from "@/components/pages/blog";
import { getPublishedBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export default async function Page() {
  const posts = await getPublishedBlogs();
  return <PortfolioPage><BlogPage posts={posts} /></PortfolioPage>;
}
