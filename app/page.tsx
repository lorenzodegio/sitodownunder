import { Eventi } from "@/components/Eventi";
import { Faq } from "@/components/Faq";
import { Galleria } from "@/components/Galleria";
import { Garden } from "@/components/Garden";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { JsonLd } from "@/components/JsonLd";
import { Menu } from "@/components/Menu";
import { Prossimamente } from "@/components/Prossimamente";
import { SiteFrame } from "@/components/SiteFrame";
import { Zona } from "@/components/Zona";
import { showGarden } from "@/data/flags";
import { loadPublicPhotos } from "@/lib/blob-archive";
import { homeJsonLd } from "@/lib/jsonld";

export const revalidate = 3600;

export default async function HomePage() {
  const photos = await loadPublicPhotos();

  return (
    <SiteFrame id="top">
      <JsonLd data={homeJsonLd(photos)} />
      <Hero />
      <Prossimamente photos={photos.martedi} />
      <Menu />
      <Galleria photos={photos.sala} />
      {showGarden ? <Garden photos={photos.garden} /> : null}
      <Eventi />
      <Faq />
      <Info />
      <Zona />
    </SiteFrame>
  );
}
