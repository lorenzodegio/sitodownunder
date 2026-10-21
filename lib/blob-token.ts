/**
 * Un solo punto decide quale store Blob usare.
 * Produzione: BLOB_READ_WRITE_TOKEN.
 * Preview, development e locale: PREVIEWBLOB_READ_WRITE_TOKEN.
 * Se manca il token di quell'ambiente, non si ricade sull'altro.
 */

export function blobTokenEnvName(): "BLOB_READ_WRITE_TOKEN" | "PREVIEWBLOB_READ_WRITE_TOKEN" {
  return process.env.VERCEL_ENV === "production" ? "BLOB_READ_WRITE_TOKEN" : "PREVIEWBLOB_READ_WRITE_TOKEN";
}

export function blobEnvironmentLabel(): "produzione" | "preview" {
  return process.env.VERCEL_ENV === "production" ? "produzione" : "preview";
}

export function readBlobToken(): string | null {
  const value = process.env[blobTokenEnvName()]?.trim();
  return value ? value : null;
}
