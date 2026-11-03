import { FotoAdmin } from "@/components/FotoAdmin";
import { vociMenu } from "@/data/menu";
import { novitaConfermate } from "@/data/novita";
import { loadSlotArchivio } from "@/lib/blob-archive";
import { blobTokenPresent } from "@/lib/blob-token";
import { contieneSegnaposto } from "@/lib/segnaposto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function FotoPage() {
  const archivio = await loadSlotArchivio();
  const suggerimenti = [
    ...vociMenu.map((voce) => ({ nome: voce.name, testo: voce.text })),
    ...novitaConfermate().map((voce) => ({ nome: voce.nome, testo: voce.descrizione })),
  ].filter((voce) => voce.nome && !contieneSegnaposto(voce.nome));

  return <FotoAdmin connesso={blobTokenPresent()} records={archivio.items} suggerimenti={suggerimenti} />;
}
