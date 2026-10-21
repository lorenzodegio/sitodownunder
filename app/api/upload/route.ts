import { del, get, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requestIsAdmin } from "@/lib/admin-auth";
import { MENU_PATH } from "@/lib/archivio-shared";
import { revalidatePublic } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PDF_LIMIT = 15 * 1024 * 1024;
const PART_LIMIT = 4 * 1024 * 1024;
const MAX_PARTS = 8;
const UPLOAD_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function partPath(uploadId: string, index: number): string {
  return `menu/incoming/${uploadId}/${index}`;
}

function jsonError(error: string, status: number): NextResponse {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await requestIsAdmin(request))) return jsonError("Non autorizzato", 401);

  const token = readBlobToken();
  if (!token) return jsonError("Manca il token Blob di questo ambiente.", 503);

  const form = await request.formData().catch(() => null);
  if (!form) return jsonError("Caricamento non riuscito", 400);

  const phase = form.get("phase");
  const uploadId = form.get("uploadId");
  const total = Number(form.get("total"));
  if (typeof uploadId !== "string" || !UPLOAD_ID.test(uploadId)) return jsonError("Caricamento non riuscito", 400);
  if (!Number.isInteger(total) || total < 1 || total > MAX_PARTS) return jsonError("Il PDF supera i 15 MB.", 400);

  try {
    if (phase === "part") return await savePart(form, token, uploadId, total);
    if (phase === "complete") return await finishPdf(token, uploadId, total);
    return jsonError("Caricamento non riuscito", 400);
  } catch {
    return jsonError("Caricamento non riuscito", 400);
  }
}

async function savePart(form: FormData, token: string, uploadId: string, total: number): Promise<NextResponse> {
  const index = Number(form.get("index"));
  const chunk = form.get("chunk");
  if (!Number.isInteger(index) || index < 0 || index >= total) return jsonError("Caricamento non riuscito", 400);
  if (!(chunk instanceof File) || chunk.size === 0 || chunk.size > PART_LIMIT) {
    return jsonError("Caricamento non riuscito", 400);
  }

  await put(partPath(uploadId, index), Buffer.from(await chunk.arrayBuffer()), {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/octet-stream",
  });
  return NextResponse.json({ ok: true });
}

async function finishPdf(token: string, uploadId: string, total: number): Promise<NextResponse> {
  const parts: Buffer[] = [];
  for (let index = 0; index < total; index += 1) {
    const file = await get(partPath(uploadId, index), { access: "public", token });
    if (!file) return jsonError("Caricamento non riuscito", 400);
    parts.push(Buffer.from(await new Response(file.stream).arrayBuffer()));
  }

  const body = Buffer.concat(parts);
  if (body.length > PDF_LIMIT || body.subarray(0, 5).toString() !== "%PDF-") {
    await removeParts(token, uploadId, total);
    return jsonError("Il menù dev’essere un PDF.", 400);
  }

  await put(MENU_PATH, body, {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/pdf",
  });
  await removeParts(token, uploadId, total);
  revalidatePublic();
  return NextResponse.json({ ok: true });
}

async function removeParts(token: string, uploadId: string, total: number): Promise<void> {
  await del(
    Array.from({ length: total }, (_, index) => partPath(uploadId, index)),
    { token },
  ).catch(() => undefined);
}
