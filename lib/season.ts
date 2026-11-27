import { season as configuredSeason } from "@/data/flags";
import { leggiStagione, type Stagione } from "@/data/stagioni";
import { calcolaFase, fineNatale, giornoRomaISO, type FaseInverno } from "@/lib/fase";

/** Stagione effettiva di questa richiesta. In produzione il parametro non conta. */
export async function activeSeason(): Promise<string | null> {
  const value = configuredSeason?.trim() || null;
  if (!value || process.env.VERCEL_ENV === "production") return value;
  const { headers } = await import("next/headers");
  const requestHeaders = await headers();
  if (requestHeaders.get("x-du-season") === "off") return null;
  return value;
}

/** Oggetto della stagione attiva. Null se è spenta o il nome non esiste. */
export async function stagioneAttiva(): Promise<Stagione | null> {
  return leggiStagione(await activeSeason());
}

/**
 * Fase delle decorazioni invernali. Null se la stagione non è inverno.
 * In produzione `?fase=` non conta: lo ignora già il middleware, e anche qui.
 */
export async function faseDecorazione(now: Date = new Date()): Promise<FaseInverno | null> {
  if ((await activeSeason()) !== "inverno") return null;
  const produzione = process.env.VERCEL_ENV === "production";
  let richiesta: string | null = null;
  if (!produzione) {
    const { headers } = await import("next/headers");
    richiesta = (await headers()).get("x-du-fase");
  }
  return calcolaFase({
    giorno: giornoRomaISO(now),
    fine: fineNatale(),
    faseRichiesta: richiesta,
    produzione,
  });
}
