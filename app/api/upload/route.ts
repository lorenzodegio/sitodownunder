import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { requestIsAdmin } from "@/lib/admin-auth";
import {
  isAllowedFotoPath,
  isFotoSection,
  isMenuPath,
  sectionFromPath,
  type FotoSection,
} from "@/lib/archivio-shared";
import { revalidatePublic, upsertFotoMeta } from "@/lib/blob-archive";

export const runtime = "nodejs";

const PDF_LIMIT = 15 * 1024 * 1024;
const FOTO_LIMIT = 8 * 1024 * 1024;

function readPayload(clientPayload: string | null): { alt: string; section: FotoSection | null } {
  if (!clientPayload) return { alt: "", section: null };
  try {
    const parsed = JSON.parse(clientPayload) as { alt?: unknown; section?: unknown };
    const section = typeof parsed.section === "string" && isFotoSection(parsed.section) ? parsed.section : null;
    const alt = typeof parsed.alt === "string" ? parsed.alt.slice(0, 180) : "";
    return { alt, section };
  } catch {
    return { alt: "", section: null };
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!(await requestIsAdmin(request))) {
          throw new Error("Non autorizzato");
        }

        if (isMenuPath(pathname)) {
          return {
            allowedContentTypes: ["application/pdf"],
            maximumSizeInBytes: PDF_LIMIT,
            addRandomSuffix: false,
            allowOverwrite: true,
            tokenPayload: JSON.stringify({ kind: "menu" }),
          };
        }

        if (!isAllowedFotoPath(pathname)) {
          throw new Error("Percorso non consentito");
        }

        const meta = readPayload(clientPayload);
        const section = sectionFromPath(pathname);
        if (!section || (meta.section && meta.section !== section)) {
          throw new Error("Sezione non consentita");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: FOTO_LIMIT,
          addRandomSuffix: false,
          allowOverwrite: true,
          tokenPayload: JSON.stringify({ alt: meta.alt, section }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          if (blob.pathname.startsWith("foto/")) {
            const meta = tokenPayload ? (JSON.parse(tokenPayload) as { alt?: string; section?: string }) : {};
            const section = sectionFromPath(blob.pathname);
            if (section) {
              await upsertFotoMeta(blob.pathname, meta.alt || "Foto del Down Under Cafè a Vanzago", section);
            }
          }
          revalidatePublic();
        } catch (error) {
          console.error("Aggiornamento archivio dopo l’upload non riuscito");
          if (process.env.NODE_ENV === "development") console.error(error);
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload non riuscito";
    const status = message === "Non autorizzato" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
