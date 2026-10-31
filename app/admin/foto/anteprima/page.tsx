import { Giornata } from "@/components/Giornata";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { NovitaCapitolo } from "@/components/NovitaCapitolo";
import { Pranzo } from "@/components/Pranzo";
import { Prossimamente } from "@/components/Prossimamente";
import { loadPublicPhotos } from "@/lib/blob-archive";
import { loadSlotVista } from "@/lib/slot-vista";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AnteprimaFoto({ searchParams }: { searchParams: Promise<{ sezione?: string }> }) {
  const { sezione } = await searchParams;
  const vista = await loadSlotVista({ bozze: true, indicazioni: true });
  const photos = sezione === "hero" || sezione === "aperitivo" ? await loadPublicPhotos() : null;

  if (sezione === "hero") {
    return (
      <Hero
        anteprima
        vista={vista}
        novita={[...(photos?.["novita-panino"] ?? []), ...(photos?.["novita-pizza"] ?? []), ...(photos?.["novita-specialita"] ?? [])]}
      />
    );
  }
  if (sezione === "novita") return <NovitaCapitolo vista={vista} forza />;
  if (sezione === "aperitivo") return <Prossimamente photos={photos?.martedi ?? []} vista={vista} />;
  if (sezione === "giornata") return <Giornata vista={vista} />;
  if (sezione === "pranzo") return <Pranzo vista={vista} />;
  if (sezione === "menu") return <Menu vista={vista} />;
  return <p>Scegli una sezione dall&apos;archivio foto.</p>;
}
