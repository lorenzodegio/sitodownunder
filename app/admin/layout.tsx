import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminChrome } from "@/components/AdminChrome";

export const metadata: Metadata = {
  title: "Archivio",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page admin-body">
      <AdminChrome />
      <main>{children}</main>
    </div>
  );
}
