import type { MetadataRoute } from "next";
import { pagineLocali } from "@/data/pagine-locali";
import { loadSlotArchivio, slotPubblicati } from "@/lib/blob-archive";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  let images: string[] = [];
  try {
    images = slotPubblicati(await loadSlotArchivio()).map((slot) => slot.url);
  } catch {
    images = [];
  }
  const pages = ["/", "/menu", ...pagineLocali.map((page) => `/${page.slug}`)];
  return pages.map((path) => ({
    url: `${siteUrl()}${path === "/" ? "/" : path}`,
    lastModified,
    ...(path === "/" && images.length ? { images } : {}),
  }));
}
