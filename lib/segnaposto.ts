/** Un testo tra [parentesi] non è ancora confermato. */
export function contieneSegnaposto(value: string): boolean {
  return /\[[^\]\n]+\]/.test(value);
}

/**
 * In produzione i blocchi con segnaposto restano nascosti.
 * In preview e in locale si vedono, così si possono compilare.
 */
export function visibileConSegnaposto(testi: readonly string[]): boolean {
  if (testi.every((testo) => !contieneSegnaposto(testo))) return true;
  return process.env.VERCEL_ENV !== "production";
}
