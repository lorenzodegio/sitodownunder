import { NextResponse } from "next/server";
import { getMenuPdfUrl } from "@/lib/blob-archive";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = await getMenuPdfUrl();
  if (!url) {
    return NextResponse.redirect(new URL("/menu?pdf=assente", request.url), 307);
  }
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
