import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Archivio",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page admin-body">
      <header className="site-header">
        <div className="header-inner">
          <Link className="logo" href="/">
            DOWN UNDER <span className="logo-cafe">cafè</span>
          </Link>
          <span className="admin-mark">archivio</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
