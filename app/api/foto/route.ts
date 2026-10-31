import { NextResponse } from "next/server";
import { requestIsAdmin } from "@/lib/admin-auth";
import { fotoWebpPath, isUploadSection } from "@/lib/archivio-shared";
import { putFotoWebp, revalidatePublic, upsertFotoMeta } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";
import { toWebp } from "@/lib/optimize-image";

export const runtime = "nodejs";

const FOTO_LIMIT = 4 * 1024 * 1024;
const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  if (!(await requestIsAdmin(request))) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  if (!readBlobToken()) {
    return NextResponse.json({ error: "Manca il token Blob di questo ambiente." }, { status: 503 });
  }

  const form = await request.formData();
  const file = form.get("foto");
  const section = form.get("sezione");
  const altRaw = form.get("alt");
  const alt = typeof altRaw === "string" ? altRaw.trim().slice(0, 80) : "";

  if (!(file instanceof File) || typeof section !== "string" || !isUploadSection(section)) {
    return NextResponse.json({ error: "Dati della foto non validi." }, { status: 400 });
  }
  if (!TYPES.has(file.type)) {
    return NextResponse.json({ error: "Usa JPG, PNG o WebP." }, { status: 400 });
  }
  if (!alt) {
    return NextResponse.json({ error: "Scrivi il nome." }, { status: 400 });
  }
  if (file.size > FOTO_LIMIT) {
    return NextResponse.json({ error: "La foto supera i 4 MB." }, { status: 400 });
  }

  try {
    const optimized = await toWebp(Buffer.from(await file.arrayBuffer()));
    const pathname = fotoWebpPath(section, file.name);
    await putFotoWebp(pathname, optimized);
    await upsertFotoMeta(pathname, alt, section);
    revalidatePublic();
    return NextResponse.json({ ok: true, pathname });
  } catch {
    return NextResponse.json({ error: "Impossibile ottimizzare o salvare la foto." }, { status: 500 });
  }
}
