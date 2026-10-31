import { FOTO_SLOTS, isSlotId } from "@/data/foto-slot";

export const REGOLA_NOME_FILE =
  "Se rinomini la foto prima di caricarla, usa {numero slot}-{nome-del-piatto}.jpg, per esempio 14-burger-il-signore-degli-anelli.jpg. Il numero sceglie lo slot, il resto diventa il nome del piatto.";

const CODA = "al Down Under Cafè di Vanzago";

export function slugPiatto(nome: string): string {
  const cleaned = nome
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return cleaned || "foto";
}

export function nomeFileSlot(prefisso: string, slug: string): string {
  const corpo = slug === prefisso || slug.startsWith(`${prefisso}-`) ? slug : `${prefisso}-${slug}`;
  return `${corpo}.webp`;
}

export function percorsoSlot(sezione: string, prefisso: string, slug: string): string {
  return `foto/${sezione}/${nomeFileSlot(prefisso, slug)}`;
}

export function percorsoUnivoco(percorso: string, occupati: ReadonlySet<string>): string {
  if (!occupati.has(percorso)) return percorso;
  const stem = percorso.replace(/\.webp$/, "");
  for (let n = 2; n < 50; n += 1) {
    const candidate = `${stem}-${n}.webp`;
    if (!occupati.has(candidate)) return candidate;
  }
  return `${stem}-${Date.now()}.webp`;
}

export function descrizioneFoto(piatto: string, dalMenu?: string): string {
  const nome = piatto.trim();
  const breve = dalMenu?.trim();
  if (breve) return `${nome}: ${breve}, ${CODA}`;
  return `${nome} ${CODA}`;
}

export function leggiNomeFile(filename: string): { slot: string; piatto: string } | null {
  const base = filename.split(/[/\\]/).pop() || filename;
  const match = base.match(/^(\d{1,2})-(.+)\.(jpe?g|png|webp|heic|heif)$/i);
  if (!match) return null;
  const slot = match[1].padStart(2, "0");
  if (!isSlotId(slot)) return null;
  const words = match[2].replace(/-/g, " ").replace(/\s+/g, " ").trim();
  if (!words) return null;
  const piatto = words.charAt(0).toUpperCase() + words.slice(1);
  return { slot, piatto };
}

export function piattoDaMenu(nome: string, voci: readonly { nome: string; testo: string }[]): string {
  const chiave = slugPiatto(nome);
  const voce = voci.find((item) => slugPiatto(item.nome) === chiave);
  return voce?.testo ?? "";
}

export function slotsNoti(): readonly string[] {
  return FOTO_SLOTS.map((item) => item.id);
}
