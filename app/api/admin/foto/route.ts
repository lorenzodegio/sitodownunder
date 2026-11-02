import { revalidatePublic } from "@/lib/blob-archive";
import { nomeFileApi, slugPiatto } from "@/lib/foto-nome";
import {
  blobPronto,
  erroreApi,
  erroreSalvataggio,
  guardFotoApi,
  jsonApi,
  provaRichiesta,
  validaCampi,
  validaFile,
} from "@/lib/foto-api";
import { toWebpSlot } from "@/lib/optimize-image";
import { salvaSlot } from "@/lib/slot-comandi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const negato = guardFotoApi(request);
  if (negato) return negato;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return erroreApi("La richiesta deve essere multipart/form-data.", "file");
  }

  const campi = validaCampi({
    slot: form.get("slot"),
    piatto: form.get("piatto"),
    descrizione: form.get("descrizione"),
    stato: form.get("stato"),
  });
  if (!campi.ok) return campi.risposta;

  const foto = validaFile(form.get("file"));
  if (!foto.ok) return foto.risposta;

  let ottimizzata: { buffer: Buffer; width: number; height: number };
  try {
    ottimizzata = await toWebpSlot(Buffer.from(await foto.file.arrayBuffer()));
  } catch {
    if (/\.heic$|\.heif$/i.test(foto.file.name) || /heic|heif/i.test(foto.file.type)) {
      return erroreApi("Questo HEIC non si legge. Esporta un JPG e ricaricalo.", "file");
    }
    return erroreApi("Impossibile leggere la foto.", "file");
  }

  const file = nomeFileApi(campi.slot, slugPiatto(campi.piatto));
  if (provaRichiesta(request)) {
    return jsonApi({
      slot: campi.slot,
      file,
      url: "",
      width: ottimizzata.width,
      height: ottimizzata.height,
      stato: campi.stato,
      prova: true,
    });
  }

  if (!blobPronto()) return jsonApi({ errore: "Manca il token Blob di questo ambiente." }, 503);

  try {
    const record = await salvaSlot({
      slot: campi.slot,
      piatto: campi.piatto,
      descrizione: campi.descrizione,
      focusX: 50,
      focusY: 50,
      stato: campi.stato,
      file: ottimizzata,
    });
    revalidatePublic();
    return jsonApi({
      slot: record.slot,
      file: nomeFileApi(record.slot, record.slug),
      url: record.url,
      width: record.width,
      height: record.height,
      stato: record.stato,
      prova: false,
    });
  } catch (error) {
    return erroreSalvataggio(error);
  }
}
