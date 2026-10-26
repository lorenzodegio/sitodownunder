import { Cucitura } from "@/components/Cucitura";
import { Eventi } from "@/components/Eventi";
import { Garden } from "@/components/Garden";
import { Giornata } from "@/components/Giornata";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { JsonLd } from "@/components/JsonLd";
import { Menu } from "@/components/Menu";
import { Pranzo } from "@/components/Pranzo";
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
      <Cucitura da="carta" a="biglietto" motivo="scandaglio" />
      <Giornata burger={photos.burger} pizza={photos.pizza} bancone={photos.bancone} />
      <Pranzo />
      <Cucitura da="biglietto" a="ink" motivo="onda" />
      <Menu />
      <Cucitura da="ink" a="fondo" motivo="rotta" />
      {showGarden ? <Garden photos={photos.garden} /> : null}
      <Eventi />
      <Cucitura da="fondo" a="ink" motivo="telegrafo" />
      <Info />
      <Cucitura da="ink" a="fondo" motivo="parallelo" stacca />
      <Zona />
    </SiteFrame>
  );
}
