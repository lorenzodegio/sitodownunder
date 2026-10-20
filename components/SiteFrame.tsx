import type { ReactNode } from "react";
import { CallBar } from "@/components/CallBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteFrame({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div className="page" id={id}>
      <Header />
      <main>{children}</main>
      <Footer />
      <CallBar />
    </div>
  );
}
