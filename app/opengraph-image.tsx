import { ogSize, renderOg } from "@/lib/og-card";

export const alt = "Down Under Cafè a Vanzago: burger, pizza e aperitivo";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Burger, pizza e aperitivo a Vanzago", "Via I Maggio 1 · dal 2010");
}
