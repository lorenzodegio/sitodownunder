function withProtocol(value: string): string {
  const trimmed = value.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/** URL canonico: dominio definitivo, altrimenti l’host Vercel del deploy in corso. */
export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return withProtocol(configured);

  if (process.env.VERCEL_ENV === "production") {
    const host = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
    if (host) return withProtocol(host);
  }

  if (process.env.VERCEL_ENV === "preview") {
    const host = process.env.VERCEL_BRANCH_URL?.trim();
    if (host) return withProtocol(host);
  }

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
