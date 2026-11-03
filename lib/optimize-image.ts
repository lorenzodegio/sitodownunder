import sharp from "sharp";

const MAX_EDGE = 1600;

export async function toWebp(input: Buffer): Promise<Buffer> {
  return sharp(input, { failOn: "none", limitInputPixels: 40_000_000 })
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}

const SLOT_EDGE = 2400;

/** Foto degli slot: lato lungo 2400, qualità 82, senza metadati (niente GPS). */
export async function toWebpSlot(input: Buffer): Promise<{ buffer: Buffer; width: number; height: number }> {
  const buffer = await sharp(input, { failOn: "none", limitInputPixels: 160_000_000 })
    .rotate()
    .resize({ width: SLOT_EDGE, height: SLOT_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  const meta = await sharp(buffer).metadata();
  return { buffer, width: meta.width ?? 0, height: meta.height ?? 0 };
}
