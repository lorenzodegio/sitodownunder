const COOKIE = "du_admin";

function sameString(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < len; i += 1) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export async function adminToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`down-under-admin:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const eq = part.trim().indexOf("=");
    if (eq === -1) continue;
    const key = part.trim().slice(0, eq);
    if (key !== name) continue;
    return decodeURIComponent(part.trim().slice(eq + 1));
  }
  return null;
}

function basicPassword(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    const eq = decoded.indexOf(":");
    if (eq < 0) return null;
    const user = decoded.slice(0, eq);
    const pass = decoded.slice(eq + 1);
    if (user !== "admin") return null;
    return pass;
  } catch {
    return null;
  }
}

export async function requestIsAdmin(request: Request): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const token = await adminToken(password);
  const cookie = readCookie(request, COOKIE);
  if (cookie && sameString(cookie, token)) return true;

  const pass = basicPassword(request);
  return pass !== null && sameString(pass, password);
}

export const adminCookieName = COOKIE;
