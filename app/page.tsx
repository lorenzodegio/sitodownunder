import { Galleria } from "@/components/Galleria";
import { Giornata } from "@/components/Giornata";
import { Eventi } from "@/components/Eventi";
import { Garden } from "@/components/Garden";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { Menu } from "@/components/Menu";
import { Pranzo } from "@/components/Pranzo";
import { Serate } from "@/components/Serate";
import { SiteFrame } from "@/components/SiteFrame";
import { Zona } from "@/components/Zona";
import { loadPublicPhotos } from "@/lib/blob-archive";
import { homeJsonLd } from "@/lib/jsonld";

export const revalidate = 3600;

export default async function HomePage() {
  const photos = await loadPublicPhotos();

  return (
    <SiteFrame id="top">
      <JsonLd data={homeJsonLd(photos)} />
      <Hero />
      <Marquee />
      <Giornata
        burger={photos.burger}
        pizza={photos.pizza}
        bancone={photos.bancone}
      />
      <Pranzo />
      <div className="onda" aria-hidden="true">
        <svg className="wave onda-svg" viewBox="0 0 1700 40" preserveAspectRatio="none">
          <defs>
            <pattern id="wv" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 22q25-22 50 0t50 0V40H0z" fill="#1E282B" />
            </pattern>
          </defs>
          <rect width="1700" height="40" fill="url(#wv)" />
        </svg>
      </div>
      <Menu />
      <Serate />
      <Galleria photos={photos.sala} />
      <Garden photos={photos.garden} />
      <Eventi photos={photos.eventi} />
      <Info />
      <Zona />
    </SiteFrame>
  );
}
