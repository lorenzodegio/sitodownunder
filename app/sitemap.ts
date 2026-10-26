import type { MetadataRoute } from "next";
import { pagineLocali } from "@/data/pagine-locali";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Solo pagine pubbliche. /admin, /api e il PDF non si indicizzano.
  const pages = ["/", "/menu", ...pagineLocali.map((page) => `/${page.slug}`)];
  return pages.map((path) => ({
    url: `${siteUrl()}${path === "/" ? "/" : path}`,
    lastModified,
  }));
}
