import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { LocalArticle } from "@/components/LocalArticle";
import { SiteFrame } from "@/components/SiteFrame";
import { paginaBySlug, pagineLocali } from "@/data/pagine-locali";
import { loadPublicPhotos } from "@/lib/blob-archive";
import { localJsonLd } from "@/lib/jsonld";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return pagineLocali.map((page) => ({ slug: page.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = paginaBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.h1} · Down Under Cafè Vanzago`,
      description: page.description,
      locale: "it_IT",
      type: "website",
      url: `/${page.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: page.h1,
      description: page.description,
    },
  };
}

export default async function PaginaLocale({ params }: Props) {
  const { slug } = await params;
  const page = paginaBySlug(slug);
  if (!page) notFound();
  const photos = await loadPublicPhotos();

  return (
    <SiteFrame>
      <JsonLd data={localJsonLd(page)} />
      <LocalArticle page={page} photos={photos[page.photoSection]} />
    </SiteFrame>
  );
}
