import { NextResponse, type NextRequest } from "next/server";
import { adminCookieName, adminToken, requestIsAdmin } from "@/lib/admin-auth";

function withSeason(request: NextRequest): Headers {
  const requestHeaders = new Headers(request.headers);
  if (process.env.VERCEL_ENV !== "production" && request.nextUrl.searchParams.get("stagione") === "off") {
    requestHeaders.set("x-du-season", "off");
  }
  return requestHeaders;
}

export async function middleware(request: NextRequest) {
  const requestHeaders = withSeason(request);
  const path = request.nextUrl.pathname;
  const admin = path === "/admin" || path.startsWith("/admin/");

  if (admin && !(await requestIsAdmin(request))) {
    return new NextResponse("Autenticazione richiesta", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Down Under Cafè", charset="UTF-8"',
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (admin) {
    const password = process.env.ADMIN_PASSWORD;
    if (password) {
      response.cookies.set(adminCookieName, await adminToken(password), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
    }
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
