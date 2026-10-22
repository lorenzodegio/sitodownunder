import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requestIsAdmin } from "@/lib/admin-auth";
import { MENU_PATH } from "@/lib/archivio-shared";
import { readBlobBytes, revalidatePublic, writeBlobFile } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PDF_LIMIT = 15 * 1024 * 1024;
const PART_LIMIT = 3 * 1024 * 1024;
const MAX_PARTS = 8;
const UPLOAD_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function partPath(uploadId: string, index: number): string {
  return `menu/incoming/${uploadId}/${index}`;
}

function jsonError(error: string, status: number): NextResponse {
  return NextResponse.json({ error }, { status });
}

function safeError(error: unknown): string {
  const raw = error instanceof Error ? error.message : "";
  if (!raw || /vercel_blob|eyJ[A-Za-z0-9_-]{8,}|Bearer/i.test(raw)) return "Caricamento non riuscito";
  return raw.replace(/store_[A-Za-z0-9]+/g, "store").slice(0, 180);
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await requestIsAdmin(request))) return jsonError("Non autorizzato", 401);
  if (!readBlobToken()) return jsonError("Manca il token Blob di questo ambiente.", 503);

  const url = new URL(request.url);
  const phase = url.searchParams.get("phase");
  const uploadId = url.searchParams.get("uploadId") ?? "";
  const total = Number(url.searchParams.get("total"));
  if (!UPLOAD_ID.test(uploadId)) return jsonError("Caricamento non riuscito", 400);
  if (!Number.isInteger(total) || total < 1 || total > MAX_PARTS) return jsonError("Il PDF supera i 15 MB.", 400);

  try {
    if (phase === "part") return await savePart(request, url, uploadId, total);
    if (phase === "complete") return await finishPdf(uploadId, total);
    return jsonError("Caricamento non riuscito", 400);
  } catch (error) {
    return jsonError(safeError(error), 400);
  }
}

async function savePart(request: Request, url: URL, uploadId: string, total: number): Promise<NextResponse> {
  const index = Number(url.searchParams.get("index"));
  if (!Number.isInteger(index) || index < 0 || index >= total) return jsonError("Caricamento non riuscito", 400);
  const body = Buffer.from(await request.arrayBuffer());
  if (body.length === 0 || body.length > PART_LIMIT) return jsonError("Il pezzo del PDF è troppo grande.", 400);
  await writeBlobFile(partPath(uploadId, index), body, "application/octet-stream");
  return NextResponse.json({ ok: true });
}

async function finishPdf(uploadId: string, total: number): Promise<NextResponse> {
  const token = readBlobToken();
  if (!token) return jsonError("Manca il token Blob di questo ambiente.", 503);

  const parts: Buffer[] = [];
  for (let index = 0; index < total; index += 1) {
    const bytes = await readBlobBytes(partPath(uploadId, index), token);
    if (!bytes) return jsonError("Manca un pezzo del PDF.", 400);
    parts.push(Buffer.from(bytes));
  }

  const body = Buffer.concat(parts);
  const header = body.subarray(0, 1024).toString("latin1");
  if (body.length > PDF_LIMIT || !header.includes("%PDF")) {
    await removeParts(uploadId, total);
    return jsonError("Il file non risulta un PDF.", 400);
  }

  await writeBlobFile(MENU_PATH, body, "application/pdf");
  await removeParts(uploadId, total);
  revalidatePublic();
  return NextResponse.json({ ok: true });
}

async function removeParts(uploadId: string, total: number): Promise<void> {
  const token = readBlobToken();
  if (!token) return;
  await del(
    Array.from({ length: total }, (_, index) => partPath(uploadId, index)),
    { token },
  ).catch(() => undefined);
}
