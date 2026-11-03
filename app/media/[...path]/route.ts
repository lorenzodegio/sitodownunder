import { NextResponse } from "next/server";
import { isAllowedFotoPath } from "@/lib/archivio-shared";
import { readBlobBytes } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const pathname = path.join("/");
  if (pathname.includes("..") || !isAllowedFotoPath(pathname)) {
    return new NextResponse(null, { status: 404 });
  }
  const token = readBlobToken();
  if (!token) return new NextResponse(null, { status: 404 });
  const bytes = await readBlobBytes(pathname, token);
  if (!bytes) return new NextResponse(null, { status: 404 });
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
