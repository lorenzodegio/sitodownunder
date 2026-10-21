import sharp from "sharp";

const MAX_EDGE = 1600;

export async function toWebp(input: Buffer): Promise<Buffer> {
  return sharp(input, { failOn: "none", limitInputPixels: 40_000_000 })
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}
