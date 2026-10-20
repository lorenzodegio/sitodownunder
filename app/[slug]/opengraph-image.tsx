import { paginaBySlug } from "@/data/pagine-locali";
import { ogSize, renderOg } from "@/lib/og-card";

export const alt = "Down Under Cafè, Vanzago";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = paginaBySlug(slug);
  return renderOg(page?.h1 ?? "Down Under Cafè", "Vanzago · Via Primo Maggio 1");
}
