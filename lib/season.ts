import { season as configuredSeason } from "@/data/flags";

/** Stagione effettiva di questa richiesta. In produzione il parametro non conta. */
export async function activeSeason(): Promise<string | null> {
  const value = configuredSeason?.trim() || null;
  if (!value || process.env.VERCEL_ENV === "production") return value;
  const { headers } = await import("next/headers");
  const requestHeaders = await headers();
  if (requestHeaders.get("x-du-season") === "off") return null;
  return value;
}
