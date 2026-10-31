import { del, get, head, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { pagineLocali } from "@/data/pagine-locali";
import { readBlobToken } from "@/lib/blob-token";
import {
  INDEX_PATH,
  MENU_PATH,
  SLOT_PATH,
  emptyAlbum,
  isFotoSection,
  sectionFromPath,
  type ArchivioFoto,
  type FotoIndex,
  type FotoSection,
  type PublicPhoto,
} from "@/lib/archivio-shared";
import { pathnamesSlot, type SlotArchivio, type SlotRecord } from "@/lib/slot-types";
import { DEL_MESE_PATH, parseDelMese, type DelMese } from "@/lib/del-mese";
import { PRANZO_PATH, parseMenuPranzo, type MenuPranzo } from "@/lib/pranzo-settimana";

export type Archivio = {
  configured: boolean;
  menuUrl: string | null;
  photos: ArchivioFoto[];
  pranzo: MenuPranzo | null;
};

function tokenOrNull(): string | null {
  return readBlobToken();
}

async function readIndex(token: string): Promise<FotoIndex> {
  for (const access of ["public", "private"] as const) {
    try {
      const file = await get(INDEX_PATH, { access, token, useCache: false });
      if (!file?.stream) continue;
      const text = await new Response(file.stream).text();
      const parsed = JSON.parse(text) as FotoIndex;
      if (!parsed || typeof parsed !== "object" || !parsed.items) return { items: {} };
      return parsed;
    } catch {
      continue;
    }
  }
  return { items: {} };
}

async function writeIndex(token: string, index: FotoIndex): Promise<void> {
  const body = JSON.stringify(index);
  const shared = {
    token,
    addRandomSuffix: false as const,
    allowOverwrite: true,
    contentType: "application/json",
  };
  try {
    await put(INDEX_PATH, body, { ...shared, access: "public" });
  } catch (error) {
    try {
      await put(INDEX_PATH, body, { ...shared, access: "private" });
    } catch {
      throw error;
    }
  }
}

const MENU_CANDIDATES = [MENU_PATH, "menu.pdf", "menu/menu.pdf"] as const;

async function locateMenuPdf(token: string): Promise<string | null> {
  for (const pathname of MENU_CANDIDATES) {
    try {
      await head(pathname, { token });
      return pathname;
    } catch {
      continue;
    }
  }
  try {
    const listed = await listAll(token, "");
    const match = listed.find((blob) => /(^|\/)menu[^/]*\.pdf$/i.test(blob.pathname));
    return match?.pathname ?? null;
  } catch {
    return null;
  }
}

async function copyMenuToCanonical(token: string, pathname: string): Promise<void> {
  if (pathname === MENU_PATH) return;
  const file = await get(pathname, { access: "public", token });
  if (!file) return;
  const body = Buffer.from(await new Response(file.stream).arrayBuffer());
  await put(MENU_PATH, body, {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/pdf",
  });
}

export async function getMenuPdfUrl(): Promise<string | null> {
  const token = tokenOrNull();
  if (!token) return null;
  const pathname = await locateMenuPdf(token);
  if (!pathname) return null;
  if (pathname !== MENU_PATH) {
    try {
      await copyMenuToCanonical(token, pathname);
    } catch {
      const blob = await head(pathname, { token }).catch(() => null);
      return blob?.url ?? null;
    }
  }
  try {
    const blob = await head(pathname === MENU_PATH ? MENU_PATH : pathname, { token });
    return blob.url;
  } catch {
    return null;
  }
}

export async function readMenuPdf(): Promise<Uint8Array | null> {
  const token = tokenOrNull();
  if (!token) return null;
  const pathname = await locateMenuPdf(token);
  if (!pathname) return null;
  const bytes = await readBlobBytes(pathname, token);
  if (!bytes) return null;
  if (pathname !== MENU_PATH) {
    await writeBlobFile(MENU_PATH, Buffer.from(bytes), "application/pdf").catch(() => undefined);
  }
  return bytes;
}

export async function readBlobBytes(pathname: string, token: string): Promise<Uint8Array | null> {
  for (const access of ["public", "private"] as const) {
    try {
      const file = await get(pathname, { access, token, useCache: false });
      if (!file?.stream) continue;
      return new Uint8Array(await new Response(file.stream).arrayBuffer());
    } catch {
      continue;
    }
  }
  return null;
}

export async function writeBlobFile(pathname: string, body: Buffer, contentType: string): Promise<void> {
  const token = tokenOrNull();
  if (!token) throw new Error("Manca il token Blob di questo ambiente.");
  const shared = {
    token,
    addRandomSuffix: false as const,
    allowOverwrite: true,
    contentType,
  };
  try {
    await put(pathname, body, { ...shared, access: "public" });
  } catch (error) {
    try {
      await put(pathname, body, { ...shared, access: "private" });
    } catch {
      throw error;
    }
  }
}

async function listAll(token: string, prefix: string) {
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000, token });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
}

export async function loadMenuPranzo(): Promise<MenuPranzo | null> {
  const token = tokenOrNull();
  if (!token) return null;
  for (const access of ["public", "private"] as const) {
    try {
      const file = await get(PRANZO_PATH, { access, token, useCache: false });
      if (!file?.stream) continue;
      const text = await new Response(file.stream).text();
      return parseMenuPranzo(JSON.parse(text));
    } catch {
      continue;
    }
  }
  return null;
}

export async function saveMenuPranzo(menu: MenuPranzo): Promise<void> {
  const token = tokenOrNull();
  if (!token) throw new Error("Blob non configurato");
  const body = JSON.stringify(menu);
  const shared = {
    token,
    addRandomSuffix: false as const,
    allowOverwrite: true,
    contentType: "application/json",
  };
  try {
    await put(PRANZO_PATH, body, { ...shared, access: "public" });
  } catch (error) {
    try {
      await put(PRANZO_PATH, body, { ...shared, access: "private" });
    } catch {
      throw error;
    }
  }
}

export async function putBlob(pathname: string, body: Buffer | string, contentType: string): Promise<string> {
  const token = tokenOrNull();
  if (!token) throw new Error("Blob non configurato");
  const shared = {
    token,
    addRandomSuffix: false as const,
    allowOverwrite: true,
    contentType,
  };
  try {
    const blob = await put(pathname, body, { ...shared, access: "public" });
    return blob.url;
  } catch (error) {
    try {
      const blob = await put(pathname, body, { ...shared, access: "private" });
      return blob.url;
    } catch {
      throw error;
    }
  }
}

export async function putFotoWebp(pathname: string, body: Buffer): Promise<string> {
  return putBlob(pathname, body, "image/webp");
}

export async function loadDelMese(): Promise<DelMese> {
  const vuoto: DelMese = { panino: null, pizza: null };
  const token = tokenOrNull();
  if (!token) return vuoto;
  for (const access of ["public", "private"] as const) {
    try {
      const file = await get(DEL_MESE_PATH, { access, token, useCache: false });
      if (!file?.stream) continue;
      const text = await new Response(file.stream).text();
      return parseDelMese(JSON.parse(text));
    } catch {
      continue;
    }
  }
  return vuoto;
}

export async function saveDelMese(mese: DelMese): Promise<void> {
  await putBlob(DEL_MESE_PATH, JSON.stringify(mese), "application/json");
}

export async function loadArchivio(): Promise<Archivio> {
  const token = tokenOrNull();
  if (!token) return { configured: false, menuUrl: null, photos: [], pranzo: null };
  try {
    const [index, menuUrl, listed, pranzo] = await Promise.all([
      readIndex(token),
      getMenuPdfUrl(),
      listAll(token, "foto/"),
      loadMenuPranzo(),
    ]);
    const photos = listed
      .filter((blob) => blob.pathname !== INDEX_PATH && sectionFromPath(blob.pathname))
      .map((blob) => {
        const section = sectionFromPath(blob.pathname) as FotoSection;
        const meta = index.items[blob.pathname];
        return {
          pathname: blob.pathname,
          src: blob.url,
          alt: meta?.alt || "Foto del Down Under Cafè a Vanzago",
          section: meta && isFotoSection(meta.section) ? meta.section : section,
          uploadedAt: blob.uploadedAt.getTime(),
        };
      })
      .sort((a, b) => b.uploadedAt - a.uploadedAt)
      .map((photo) => ({
        pathname: photo.pathname,
        src: photo.src,
        alt: photo.alt,
        section: photo.section,
      }));

    return { configured: true, menuUrl, photos, pranzo };
  } catch {
    console.error("Archivio Blob non disponibile");
    return { configured: true, menuUrl: null, photos: [], pranzo: null };
  }
}

export async function loadPublicPhotos(): Promise<Record<FotoSection, PublicPhoto[]>> {
  const album = emptyAlbum();
  const [archivio, slots] = await Promise.all([loadArchivio(), loadSlotArchivio()]);
  const riservati = pathnamesSlot(slots);
  for (const photo of archivio.photos) {
    if (riservati.has(photo.pathname)) continue;
    album[photo.section].push({ src: photo.src, alt: photo.alt, section: photo.section });
  }
  return album;
}

function clampFocus(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.min(100, Math.max(0, Math.round(n)));
}

function parseVersioni(value: unknown): SlotRecord["versioniPrecedenti"] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 3).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const versione = item as SlotRecord["versioniPrecedenti"][number];
    if (!versione.pathname || !versione.url) return [];
    return [
      {
        url: String(versione.url),
        pathname: String(versione.pathname),
        width: Number(versione.width) || 0,
        height: Number(versione.height) || 0,
        aggiornata: String(versione.aggiornata || ""),
      },
    ];
  });
}

export function parseSlotArchivio(value: unknown): SlotArchivio {
  if (!value || typeof value !== "object") return { items: {} };
  const raw = (value as SlotArchivio).items;
  if (!raw || typeof raw !== "object") return { items: {} };
  const items: Record<string, SlotRecord> = {};
  for (const [key, item] of Object.entries(raw)) {
    if (!item || typeof item !== "object") continue;
    if (!isFotoSection(item.sezione) || typeof item.slot !== "string") continue;
    items[key] = {
      slot: item.slot,
      sezione: item.sezione,
      piatto: String(item.piatto || ""),
      slug: String(item.slug || ""),
      descrizione: String(item.descrizione || ""),
      url: String(item.url || ""),
      pathname: String(item.pathname || ""),
      width: Number(item.width) || 0,
      height: Number(item.height) || 0,
      focusX: clampFocus(item.focusX),
      focusY: clampFocus(item.focusY),
      stato: item.stato === "pubblicata" ? "pubblicata" : "bozza",
      aggiornata: String(item.aggiornata || ""),
      versioniPrecedenti: parseVersioni(item.versioniPrecedenti),
    };
  }
  return { items };
}

export async function loadSlotArchivio(): Promise<SlotArchivio> {
  const token = tokenOrNull();
  if (!token) return { items: {} };
  for (const access of ["public", "private"] as const) {
    try {
      const file = await get(SLOT_PATH, { access, token, useCache: false });
      if (!file?.stream) continue;
      const text = await new Response(file.stream).text();
      return parseSlotArchivio(JSON.parse(text));
    } catch {
      continue;
    }
  }
  return { items: {} };
}

export async function saveSlotArchivio(archivio: SlotArchivio): Promise<void> {
  await putBlob(SLOT_PATH, JSON.stringify(archivio), "application/json");
}

export function slotPubblicati(archivio: SlotArchivio): SlotRecord[] {
  return Object.values(archivio.items).filter((item) => item.stato === "pubblicata" && item.url);
}

export async function upsertFotoMeta(pathname: string, alt: string, section: FotoSection): Promise<void> {
  const token = tokenOrNull();
  if (!token) throw new Error("Blob non configurato");
  const index = await readIndex(token);
  index.items[pathname] = { alt: alt.trim() || "Foto del Down Under Cafè a Vanzago", section };
  await writeIndex(token, index);
}

export async function removeFoto(pathname: string): Promise<void> {
  const token = tokenOrNull();
  if (!token) throw new Error("Blob non configurato");
  await del(pathname, { token });
  const index = await readIndex(token);
  delete index.items[pathname];
  await writeIndex(token, index);
}

export function revalidatePublic(): void {
  revalidatePath("/");
  revalidatePath("/menu");
  for (const page of pagineLocali) revalidatePath(`/${page.slug}`);
}
