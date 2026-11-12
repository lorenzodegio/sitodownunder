import { locale } from "@/data/locale";

export function whatsappLink(testo: string): string {
  const numero = locale.phoneE164.replace(/^\+/, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(testo)}`;
}
