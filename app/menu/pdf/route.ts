import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { MENU_PATH } from "@/lib/archivio-shared";
import { readBlobToken } from "@/lib/blob-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = readBlobToken();
  const missing = () => NextResponse.redirect(new URL("/menu?pdf=assente", request.url), 307);
  if (!token) return missing();

  try {
    const file = await get(MENU_PATH, { access: "public", token });
    if (!file) return missing();
    return new NextResponse(file.stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="menu-down-under.pdf"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return missing();
  }
}
