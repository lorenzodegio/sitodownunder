export const FOTO_SECTIONS = ["burger", "pizza", "carne", "bancone", "sala", "garden", "eventi", "martedi", "lunch"] as const;

/** Garden resta nei dati già caricati, ma non si propone più come categoria nuova. */
export const FOTO_UPLOAD_SECTIONS = ["burger", "pizza", "carne", "bancone", "sala", "eventi", "martedi", "lunch"] as const;

export type FotoSection = (typeof FOTO_SECTIONS)[number];
export type FotoUploadSection = (typeof FOTO_UPLOAD_SECTIONS)[number];

export const MENU_PATH = "menu/menu-down-under.pdf";
export const INDEX_PATH = "foto/index.json";

export const sectionLabel: Record<FotoSection, string> = {
  burger: "Burger",
  pizza: "Pizza",
  carne: "Carne",
  bancone: "Bancone",
  sala: "Sala e murales",
  garden: "Garden",
  eventi: "Feste ed eventi",
  martedi: "Martedì della nonna",
  lunch: "Pranzo",
};

export type PublicPhoto = {
  src: string;
  alt: string;
  section: FotoSection;
};

export type ArchivioFoto = PublicPhoto & { pathname: string };

export type FotoIndex = {
  items: Record<string, { alt: string; section: FotoSection }>;
};

const FOTO_PATH = /^foto\/(burger|pizza|carne|bancone|sala|garden|eventi|martedi|lunch)\/[a-z0-9][a-z0-9.-]{0,90}$/;

export function isFotoSection(value: string): value is FotoSection {
  return (FOTO_SECTIONS as readonly string[]).includes(value);
}

export function isUploadSection(value: string): value is FotoUploadSection {
  return (FOTO_UPLOAD_SECTIONS as readonly string[]).includes(value);
}

export function sanitizeFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")).toLowerCase() : "";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".pdf"].includes(ext) ? ext : "";
  let cleaned = base
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  if (!cleaned || !/^[a-z0-9]/.test(cleaned)) cleaned = "foto";
  return `${cleaned}${safeExt === ".jpeg" ? ".jpg" : safeExt || ".jpg"}`;
}

export function fotoPath(section: FotoSection, filename: string): string {
  return `foto/${section}/${sanitizeFilename(filename)}`;
}

export function fotoWebpPath(section: FotoUploadSection, filename: string): string {
  const base = sanitizeFilename(filename).replace(/\.[^.]+$/, "") || "foto";
  return `foto/${section}/${base}.webp`;
}

export function isAllowedFotoPath(pathname: string): boolean {
  return FOTO_PATH.test(pathname);
}

export function isMenuPath(pathname: string): boolean {
  return pathname === MENU_PATH;
}

export function sectionFromPath(pathname: string): FotoSection | null {
  const match = pathname.match(/^foto\/(burger|pizza|carne|bancone|sala|garden|eventi|martedi|lunch)\//);
  return match && isFotoSection(match[1]) ? match[1] : null;
}

export function emptyAlbum(): Record<FotoSection, PublicPhoto[]> {
  return {
    burger: [],
    pizza: [],
    carne: [],
    bancone: [],
    sala: [],
    garden: [],
    eventi: [],
    martedi: [],
    lunch: [],
  };
}
