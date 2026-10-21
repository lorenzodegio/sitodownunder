import { del, get, head, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { pagineLocali } from "@/data/pagine-locali";
import { readBlobToken } from "@/lib/blob-token";
import {
  INDEX_PATH,
  MENU_PATH,
  emptyAlbum,
  isFotoSection,
  sectionFromPath,
  type ArchivioFoto,
  type FotoIndex,
  type FotoSection,
  type PublicPhoto,
} from "@/lib/archivio-shared";
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
  try {
    const file = await get(INDEX_PATH, { access: "public", token, useCache: false });
    if (!file) return { items: {} };
    const text = await new Response(file.stream).text();
    const parsed = JSON.parse(text) as FotoIndex;
    if (!parsed || typeof parsed !== "object" || !parsed.items) return { items: {} };
    return parsed;
  } catch {
    return { items: {} };
  }
}

async function writeIndex(token: string, index: FotoIndex): Promise<void> {
  await put(INDEX_PATH, JSON.stringify(index), {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getMenuPdfUrl(): Promise<string | null> {
  const token = tokenOrNull();
  if (!token) return null;
  try {
    const blob = await head(MENU_PATH, { token });
    return blob.url;
  } catch {
    return null;
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
  try {
    const file = await get(PRANZO_PATH, { access: "public", token, useCache: false });
    if (!file) return null;
    const text = await new Response(file.stream).text();
    return parseMenuPranzo(JSON.parse(text));
  } catch {
    return null;
  }
}

export async function saveMenuPranzo(menu: MenuPranzo): Promise<void> {
  const token = tokenOrNull();
  if (!token) throw new Error("Blob non configurato");
  await put(PRANZO_PATH, JSON.stringify(menu), {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function putFotoWebp(pathname: string, body: Buffer): Promise<string> {
  const token = tokenOrNull();
  if (!token) throw new Error("Blob non configurato");
  const blob = await put(pathname, body, {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "image/webp",
  });
  return blob.url;
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
  const archivio = await loadArchivio();
  for (const photo of archivio.photos) {
    album[photo.section].push({ src: photo.src, alt: photo.alt, section: photo.section });
  }
  return album;
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
