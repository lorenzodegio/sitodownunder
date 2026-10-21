/**
 * Un solo punto decide quale store Blob usare.
 * VERCEL_ENV "production": BLOB_READ_WRITE_TOKEN.
 * VERCEL_ENV "preview", e anche development e locale: PREVIEWBLOB_READ_WRITE_TOKEN.
 * Le proprietà vanno lette per nome: process.env[nome] in Next resta vuoto.
 * Se manca il token di quell'ambiente, non si ricade sull'altro.
 */

function productionStore(): boolean {
  return process.env.VERCEL_ENV === "production";
}

export function blobTokenEnvName(): "BLOB_READ_WRITE_TOKEN" | "PREVIEWBLOB_READ_WRITE_TOKEN" {
  return productionStore() ? "BLOB_READ_WRITE_TOKEN" : "PREVIEWBLOB_READ_WRITE_TOKEN";
}

export function blobEnvironmentLabel(): "produzione" | "preview" {
  return productionStore() ? "produzione" : "preview";
}

export function readBlobToken(): string | null {
  const value = productionStore()
    ? process.env.BLOB_READ_WRITE_TOKEN
    : process.env.PREVIEWBLOB_READ_WRITE_TOKEN;
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function blobTokenPresent(): boolean {
  return readBlobToken() !== null;
}
