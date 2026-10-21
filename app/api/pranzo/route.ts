import { NextResponse } from "next/server";
import { requestIsAdmin } from "@/lib/admin-auth";
import { revalidatePublic, saveMenuPranzo } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";
import { parseMenuPranzo } from "@/lib/pranzo-settimana";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requestIsAdmin(request))) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  if (!readBlobToken()) {
    return NextResponse.json({ error: "Manca il token Blob di questo ambiente." }, { status: 503 });
  }

  const menu = parseMenuPranzo(await request.json().catch(() => null));
  if (!menu) {
    return NextResponse.json({ error: "Settimana o voci non valide." }, { status: 400 });
  }

  try {
    await saveMenuPranzo(menu);
    revalidatePublic();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Salvataggio non riuscito." }, { status: 500 });
  }
}
