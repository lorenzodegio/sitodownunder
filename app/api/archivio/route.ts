import { NextResponse } from "next/server";
import { requestIsAdmin } from "@/lib/admin-auth";
import { isAllowedFotoPath, isFotoSection, isMenuPath, sectionFromPath } from "@/lib/archivio-shared";
import { removeFoto, revalidatePublic, upsertFotoMeta } from "@/lib/blob-archive";

export const runtime = "nodejs";

async function guard(request: Request) {
  if (await requestIsAdmin(request)) return null;
  return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
}

export async function POST(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;

  const body = (await request.json()) as { pathname?: unknown; alt?: unknown; section?: unknown };
  const pathname = typeof body.pathname === "string" ? body.pathname : "";
  const alt = typeof body.alt === "string" ? body.alt.slice(0, 180) : "";

  if (isMenuPath(pathname)) {
    revalidatePublic();
    return NextResponse.json({ ok: true });
  }

  const section = sectionFromPath(pathname);
  if (!isAllowedFotoPath(pathname) || !section) {
    return NextResponse.json({ error: "Percorso non consentito" }, { status: 400 });
  }
  if (typeof body.section === "string" && isFotoSection(body.section) && body.section !== section) {
    return NextResponse.json({ error: "Sezione non consentita" }, { status: 400 });
  }

  await upsertFotoMeta(pathname, alt, section);
  revalidatePublic();
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;

  const body = (await request.json()) as { pathname?: unknown };
  const pathname = typeof body.pathname === "string" ? body.pathname : "";
  if (!isAllowedFotoPath(pathname)) {
    return NextResponse.json({ error: "Percorso non consentito" }, { status: 400 });
  }

  await removeFoto(pathname);
  revalidatePublic();
  return NextResponse.json({ ok: true });
}
