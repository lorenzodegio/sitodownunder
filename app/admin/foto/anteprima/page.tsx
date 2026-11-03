import { Cucitura } from "@/components/Cucitura";
import { Eventi } from "@/components/Eventi";
import { Garden } from "@/components/Garden";
import { Giornata } from "@/components/Giornata";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { Menu } from "@/components/Menu";
import { NovitaCapitolo } from "@/components/NovitaCapitolo";
import { Pranzo } from "@/components/Pranzo";
import { Prossimamente } from "@/components/Prossimamente";
import { SiteFrame } from "@/components/SiteFrame";
import { VivoAscolto } from "@/components/VivoAscolto";
import { Zona } from "@/components/Zona";
import { showGarden } from "@/data/flags";
import { loadPublicPhotos } from "@/lib/blob-archive";
import { loadSlotVista } from "@/lib/slot-vista";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AnteprimaFoto({ searchParams }: { searchParams: Promise<{ sezione?: string }> }) {
  const { sezione } = await searchParams;
  const vista = await loadSlotVista({ bozze: true, indicazioni: true });
  const photos = sezione === "aperitivo" || sezione === "sito" ? await loadPublicPhotos() : null;

  if (sezione === "sito") {
    return (
      <SiteFrame id="top">
        <VivoAscolto />
        <div id="hero">
          <Hero />
        </div>
        <NovitaCapitolo vista={vista} />
        <Prossimamente photos={photos?.martedi ?? []} vista={vista} />
        <Cucitura da="carta" a="biglietto" motivo="mare" />
        <div id="giornata">
          <Giornata />
        </div>
        <Pranzo />
        <Cucitura da="biglietto" a="ink" motivo="onda" />
        <Menu vista={vista} />
        <Cucitura da="ink" a="fondo" motivo="doppia" />
        {showGarden ? <Garden photos={photos?.garden ?? []} /> : null}
        <Eventi />
        <Cucitura da="fondo" a="ink" motivo="cavo" />
        <Info />
        <Cucitura da="ink" a="fondo" motivo="stretta" stacca />
        <Zona />
      </SiteFrame>
    );
  }

  if (sezione === "hero") return <Hero />;
  if (sezione === "novita") return <NovitaCapitolo vista={vista} />;
  if (sezione === "aperitivo") return <Prossimamente photos={photos?.martedi ?? []} vista={vista} />;
  if (sezione === "giornata") return <Giornata />;
  if (sezione === "pranzo") return <Pranzo />;
  if (sezione === "menu") return <Menu vista={vista} />;
  return <p>Scegli una sezione dall&apos;archivio foto.</p>;
}
