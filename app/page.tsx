import { Cucitura } from "@/components/Cucitura";
import { Eventi } from "@/components/Eventi";
import { Garden } from "@/components/Garden";
import { Giornata } from "@/components/Giornata";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { JsonLd } from "@/components/JsonLd";
import { Menu } from "@/components/Menu";
import { NovitaCapitolo } from "@/components/NovitaCapitolo";
import { Pranzo } from "@/components/Pranzo";
import { Prossimamente } from "@/components/Prossimamente";
import { SiteFrame } from "@/components/SiteFrame";
import { Zona } from "@/components/Zona";
import { showGarden } from "@/data/flags";
import { loadPublicPhotos, loadSlotArchivio, slotPubblicati } from "@/lib/blob-archive";
import { homeJsonLd } from "@/lib/jsonld";
import { loadSlotVista } from "@/lib/slot-vista";

export const revalidate = 3600;

export default async function HomePage() {
  const [photos, vista, slots] = await Promise.all([loadPublicPhotos(), loadSlotVista(), loadSlotArchivio()]);

  return (
    <SiteFrame id="top">
      <JsonLd data={homeJsonLd(photos, slotPubblicati(slots))} />
      <Hero
        novita={[...photos["novita-panino"], ...photos["novita-pizza"], ...photos["novita-specialita"]]}
        vista={vista}
      />
      <NovitaCapitolo vista={vista} />
      <Prossimamente photos={photos.martedi} vista={vista} />
      <Cucitura da="carta" a="biglietto" motivo="mare" />
      <Giornata vista={vista} />
      <Pranzo vista={vista} />
      <Cucitura da="biglietto" a="ink" motivo="onda" />
      <Menu vista={vista} />
      <Cucitura da="ink" a="fondo" motivo="doppia" />
      {showGarden ? <Garden photos={photos.garden} /> : null}
      <Eventi />
      <Cucitura da="fondo" a="ink" motivo="cavo" />
      <Info />
      <Cucitura da="ink" a="fondo" motivo="stretta" stacca />
      <Zona />
    </SiteFrame>
  );
}
