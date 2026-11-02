import { blobPronto, erroreApi, guardFotoApi, jsonApi, pubblicaBozze, validaElencoSlot } from "@/lib/foto-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const negato = guardFotoApi(request);
  if (negato) return negato;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return erroreApi("Il corpo non è un JSON valido.", "slots");
  }

  const elenco = validaElencoSlot(body);
  if (!elenco.ok) return elenco.risposta;
  if (!blobPronto()) return jsonApi({ errore: "Manca il token Blob di questo ambiente." }, 503);

  try {
    return jsonApi(await pubblicaBozze(elenco.slots));
  } catch {
    return jsonApi({ errore: "Impossibile pubblicare le foto." }, 500);
  }
}
