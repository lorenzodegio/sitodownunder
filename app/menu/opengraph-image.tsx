import { ogSize, renderOg } from "@/lib/og-card";

export const alt = "Menù del Down Under Cafè a Vanzago";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Il menù", "Burger, pizza, cocktail · Vanzago");
}
