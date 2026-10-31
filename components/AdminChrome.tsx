"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminChrome() {
  const path = usePathname();
  if (path?.includes("/admin/foto/anteprima")) return null;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="logo" href="/">
          DOWN UNDER <span className="logo-cafe">cafè</span>
        </Link>
        <nav className="admin-nav" aria-label="Archivio">
          <Link href="/admin">Archivio</Link>
          <Link href="/admin/foto">Foto</Link>
        </nav>
      </div>
    </header>
  );
}
