import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Instrument_Serif, Rokkitt } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const rokkitt = Rokkitt({
  subsets: ["latin"],
  weight: ["300", "500", "700", "800"],
  style: ["normal"],
  variable: "--font-rokkitt",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    locale: "it_IT",
    type: "website",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${rokkitt.variable} ${instrumentSerif.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
