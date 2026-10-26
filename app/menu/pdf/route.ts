import { NextResponse } from "next/server";
import { readMenuPdf } from "@/lib/blob-archive";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<NextResponse> {
  const file = await readMenuPdf();
  if (!file) return NextResponse.redirect(new URL("/menu", request.url), 307);
  return new NextResponse(Buffer.from(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="menu-down-under.pdf"',
      "Cache-Control": "private, no-store",
    },
  });
}
