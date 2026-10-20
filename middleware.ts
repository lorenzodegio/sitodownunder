import { NextResponse, type NextRequest } from "next/server";
import { adminCookieName, adminToken, requestIsAdmin } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  if (!(await requestIsAdmin(request))) {
    return new NextResponse("Autenticazione richiesta", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Down Under Cafè", charset="UTF-8"',
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const response = NextResponse.next();
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
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
