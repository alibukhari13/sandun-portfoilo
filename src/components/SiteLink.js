"use client";

import Link from "next/link";
import { useOptionalPortfolioSettings } from "@/components/PortfolioSettingsContext";
import { isPageVisible } from "@/lib/site-pages";

export default function SiteLink({ href, children, ...props }) {
  const settings = useOptionalPortfolioSettings();
  if (settings && !isPageVisible(settings, href)) return null;
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
