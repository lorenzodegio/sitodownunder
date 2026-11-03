import { elencoSlot, guardFotoApi, jsonApi } from "@/lib/foto-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const negato = guardFotoApi(request);
  if (negato) return negato;
  return jsonApi({ slots: await elencoSlot() });
}
