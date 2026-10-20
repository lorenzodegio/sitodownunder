import { del, get, head, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { pagineLocali } from "@/data/pagine-locali";
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

export type Archivio = {
  configured: boolean;
  menuUrl: string | null;
  photos: ArchivioFoto[];
};

function configured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readIndex(): Promise<FotoIndex> {
  if (!configured()) return { items: {} };
  try {
    const file = await get(INDEX_PATH, { access: "public", useCache: false });
    if (!file) return { items: {} };
    const text = await new Response(file.stream).text();
    const parsed = JSON.parse(text) as FotoIndex;
    if (!parsed || typeof parsed !== "object" || !parsed.items) return { items: {} };
    return parsed;
  } catch {
    return { items: {} };
  }
}

async function writeIndex(index: FotoIndex): Promise<void> {
  await put(INDEX_PATH, JSON.stringify(index), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getMenuPdfUrl(): Promise<string | null> {
  if (!configured()) return null;
  try {
    const blob = await head(MENU_PATH);
    return blob.url;
  } catch {
    return null;
  }
}

export async function loadArchivio(): Promise<Archivio> {
  if (!configured()) return { configured: false, menuUrl: null, photos: [] };
  try {
    const [index, menuUrl, listed] = await Promise.all([readIndex(), getMenuPdfUrl(), listAll("foto/")]);
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

    return { configured: true, menuUrl, photos };
  } catch (error) {
    console.error("Archivio Blob non disponibile");
    if (process.env.NODE_ENV === "development") console.error(error);
    return { configured: true, menuUrl: null, photos: [] };
  }
}

async function listAll(prefix: string) {
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
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
  const index = await readIndex();
  index.items[pathname] = { alt: alt.trim() || "Foto del Down Under Cafè a Vanzago", section };
  await writeIndex(index);
}

export async function removeFoto(pathname: string): Promise<void> {
  await del(pathname);
  const index = await readIndex();
  delete index.items[pathname];
  await writeIndex(index);
}

export function revalidatePublic(): void {
  revalidatePath("/");
  revalidatePath("/menu");
  for (const page of pagineLocali) revalidatePath(`/${page.slug}`);
}
