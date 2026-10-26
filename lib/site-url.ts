function withProtocol(value: string): string {
  const trimmed = value.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/** Dominio definitivo, altrimenti l’URL di questo deployment Vercel. */
export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return withProtocol(configured);

  const deployment = process.env.VERCEL_URL?.trim();
  if (deployment) return withProtocol(deployment);

  return "http://localhost:3000";
}

/** Indicizzazione solo in produzione, e solo dopo NEXT_PUBLIC_SITE_URL. */
export function indexingEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()) && process.env.VERCEL_ENV === "production";
}

export function absoluteUrl(pathname: string): string {
  if (/^https?:\/\//.test(pathname)) return pathname;
  return `${siteUrl()}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
