import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requestIsAdmin } from "@/lib/admin-auth";
import { MENU_PATH } from "@/lib/archivio-shared";
import { revalidatePublic } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PDF_LIMIT = 15 * 1024 * 1024;

function publicError(error: unknown): string {
  const raw = error instanceof Error ? error.message : "";
  if (!raw || /vercel_blob|eyJ[A-Za-z0-9_-]{8,}/.test(raw)) return "Caricamento non riuscito";
  return "Caricamento non riuscito";
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await requestIsAdmin(request))) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const token = readBlobToken();
  if (!token) {
    return NextResponse.json({ error: "Manca il token Blob di questo ambiente." }, { status: 503 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("pdf");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Scegli un PDF." }, { status: 400 });
  }
  const pdfName = file.name.toLowerCase().endsWith(".pdf");
  const pdfType = !file.type || file.type === "application/pdf";
  if (!pdfName || !pdfType) {
    return NextResponse.json({ error: "Il menù dev’essere un PDF." }, { status: 400 });
  }
  if (file.size > PDF_LIMIT) {
    return NextResponse.json({ error: "Il PDF supera i 15 MB." }, { status: 400 });
  }

  try {
    const body = Buffer.from(await file.arrayBuffer());
    await put(MENU_PATH, body, {
      access: "public",
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/pdf",
    });
    revalidatePublic();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: publicError(error) }, { status: 400 });
  }
}
