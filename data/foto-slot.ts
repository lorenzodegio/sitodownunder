import type { FotoSection } from "@/lib/archivio-shared";

export type FormatoSlot = "4:5" | "4:3" | "1:1";
export type GruppoSlot = "hero" | "novita" | "aperitivo" | "giornata" | "pranzo" | "burger" | "pizza" | "carne";

export type FotoSlot = {
  id: string;
  gruppo: GruppoSlot;
  sezione: FotoSection;
  prefisso: string;
  formato: FormatoSlot;
  etichetta: string;
  hint: string;
  fallbackSrc: string;
  fallbackAlt: string;
  toneLight?: boolean;
  rotate?: "n15" | "p1" | "n1" | "p15";
  /** In produzione, senza foto: murale, oppure quaderno vuoto per le card novità. */
  vuoto: "murale" | "quaderno";
};

export const GRUPPI_SLOT: readonly { id: GruppoSlot; label: string; anteprima: string }[] = [
  { id: "hero", label: "Hero", anteprima: "hero" },
  { id: "novita", label: "Novità del mese", anteprima: "novita" },
  { id: "aperitivo", label: "Aperitivo della domenica", anteprima: "aperitivo" },
  { id: "giornata", label: "Lunch, Ape e Cena", anteprima: "giornata" },
  { id: "pranzo", label: "Il giro del pranzo", anteprima: "pranzo" },
  { id: "burger", label: "I Burgers", anteprima: "menu" },
  { id: "pizza", label: "Le Pizze", anteprima: "menu" },
  { id: "carne", label: "La carne", anteprima: "menu" },
];

const mongolfieraAlt = "Murale della mongolfiera: Il giro del mondo in 80 giorni, Down Under Cafè Vanzago";
const polpoAlt = "Murale del polpo gigante: 20.000 leghe sotto i mari, Down Under Cafè Vanzago";
const orderAlt = "Murale del bancone: order here, wait the shaking, drink eat enjoy, pay here";
const centroAlt = "Lettering del murale: Voyage au centre de la Terre, Down Under Cafè Vanzago";
const cavernaAlt = "Murale della caverna con il monogramma DUC, Down Under Cafè Vanzago";
const logoAlt = "Stemma Down Under Cafè, since 2010, Vanzago";
const carpeAlt = "Murale carpe diem, Down Under Cafè Vanzago";

export const FOTO_SLOTS: readonly FotoSlot[] = [
  slot("01", "hero", "novita", "carne", "4:5", "Foto 01 · novità · 4:5", "Il piatto nuovo protagonista, a 45° sul tavolo di legno, luce calda di lato, murale sfocato dietro.", "/murales/logo-scudo.png", logoAlt, { toneLight: true, rotate: "p1" }),
  slot("02", "novita", "novita", "carne", "4:3", "Foto 02 · 4:3", "taglio intero sul tagliere, dall'alto, sale grosso", "/murales/centro-terra.png", centroAlt, { vuoto: "quaderno" }),
  slot("03", "novita", "novita", "carne", "4:3", "Foto 03 · 4:3", "fette tagliate, cuore rosa ben visibile", "/murales/centro-terra.png", centroAlt, { vuoto: "quaderno" }),
  slot("04", "novita", "novita", "carne", "4:3", "Foto 04 · 4:3", "sulla griglia con la fiamma, di lato", "/murales/centro-terra.png", centroAlt, { vuoto: "quaderno" }),
  slot("05", "aperitivo", "aperitivo", "aperitivo", "4:5", "Foto 05 · 4:5", "Il piatto abbondante dall'alto, intero nel quadro, due drink ai lati. Deve sembrare tanto.", "/murales/carpe-diem.png", carpeAlt, { rotate: "n1" }),
  slot("06", "aperitivo", "aperitivo", "aperitivo", "1:1", "Foto 06 · 1:1", "Spritz o cocktail sul bancone, mano che lo prende.", "/murales/carpe-diem.png", carpeAlt, { rotate: "p1" }),
  slot("07", "aperitivo", "aperitivo", "aperitivo", "1:1", "Foto 07 · 1:1", "Tavolo pieno, bicchieri che brindano (niente facce).", "/murales/carpe-diem.png", carpeAlt, { rotate: "n15" }),
  slot("08", "giornata", "lunch", "pranzo", "4:5", "Foto 08 · lunch · 4:5", "Sala di giorno, luce dalle vetrate: primo e secondo sul tavolo apparecchiato.", "/murales/mongolfiera.png", mongolfieraAlt, { rotate: "n15" }),
  slot("09", "giornata", "sala", "cena", "4:5", "Foto 09 · cena · 4:5", "Sera, luci basse e murales dietro: burger e pizza sullo stesso tavolo, birra in primo piano.", "/murales/caverna-duc.png", cavernaAlt, { rotate: "n1" }),
  slot("10", "pranzo", "lunch", "pranzo", "4:5", "Foto 10 · 4:5", "Tavolo già apparecchiato, acqua e coperto pronti.", "/murales/mongolfiera.png", mongolfieraAlt, { toneLight: true }),
  slot("11", "pranzo", "lunch", "pranzo", "4:5", "Foto 11 · 4:5", "Il primo del giorno, fumante, a 45°.", "/murales/mongolfiera.png", mongolfieraAlt, { toneLight: true }),
  slot("12", "pranzo", "lunch", "pranzo", "4:5", "Foto 12 · 4:5", "Secondo con contorno, dall'alto.", "/murales/mongolfiera.png", mongolfieraAlt, { toneLight: true }),
  slot("13", "pranzo", "lunch", "pranzo", "4:5", "Foto 13 · 4:5", "Tazzina sul bancone, murale order here dietro.", "/murales/order-here.png", orderAlt, { toneLight: true }),
  slot("14", "burger", "burger", "burger", "4:3", "Foto 14 · 4:3", "Il burger simbolo, frontale ad altezza piatto: strati visibili, formaggio che cola, patatine dietro.", "/murales/mongolfiera.png", mongolfieraAlt, { rotate: "p1" }),
  slot("15", "burger", "burger", "burger", "1:1", "15 · 1:1", "Morso, sezione del burger", "/murales/mongolfiera.png", mongolfieraAlt),
  slot("16", "burger", "burger", "burger", "1:1", "16 · 1:1", "Carne sulla piastra", "/murales/mongolfiera.png", mongolfieraAlt),
  slot("17", "burger", "burger", "burger", "1:1", "17 · 1:1", "Bun pretzel e anelli di cipolla", "/murales/mongolfiera.png", mongolfieraAlt),
  slot("18", "pizza", "pizza", "pizza", "4:3", "Foto 18 · 4:3", "La pizza intera dall'alto sul tagliere, cornicione gonfio, un trancio appena staccato.", "/murales/polpo.png", polpoAlt, { rotate: "p1" }),
  slot("19", "pizza", "pizza", "pizza", "1:1", "19 · 1:1", "Filo di mozzarella che si allunga", "/murales/polpo.png", polpoAlt),
  slot("20", "pizza", "pizza", "pizza", "1:1", "20 · 1:1", "Burrata, crudo e pistacchio", "/murales/polpo.png", polpoAlt),
  slot("21", "pizza", "pizza", "pizza", "1:1", "21 · 1:1", "Pizza che esce dal forno", "/murales/polpo.png", polpoAlt),
  slot("22", "carne", "carne", "carne", "4:3", "Foto 22 · 4:3", "La costata tagliata sul tagliere, cuore rosa, sale grosso e chimichurri a lato.", "/murales/centro-terra.png", centroAlt, { rotate: "p1" }),
  slot("23", "carne", "carne", "carne", "1:1", "23 · 1:1", "Fiamma sulla griglia", "/murales/centro-terra.png", centroAlt),
  slot("24", "carne", "carne", "carne", "1:1", "24 · 1:1", "Pulled pork sfilacciato", "/murales/centro-terra.png", centroAlt),
  slot("25", "carne", "carne", "carne", "1:1", "25 · 1:1", "Taglio crudo, marezzatura", "/murales/centro-terra.png", centroAlt),
];

function slot(
  id: string,
  gruppo: GruppoSlot,
  sezione: FotoSection,
  prefisso: string,
  formato: FormatoSlot,
  etichetta: string,
  hint: string,
  fallbackSrc: string,
  fallbackAlt: string,
  extra?: { toneLight?: boolean; rotate?: FotoSlot["rotate"]; vuoto?: FotoSlot["vuoto"] },
): FotoSlot {
  return {
    id,
    gruppo,
    sezione,
    prefisso,
    formato,
    etichetta,
    hint,
    fallbackSrc,
    fallbackAlt,
    toneLight: extra?.toneLight,
    rotate: extra?.rotate,
    vuoto: extra?.vuoto ?? "murale",
  };
}

export function slotById(id: string): FotoSlot {
  const found = FOTO_SLOTS.find((item) => item.id === id);
  if (!found) throw new Error("Slot foto sconosciuto");
  return found;
}

export function isSlotId(id: string): boolean {
  return FOTO_SLOTS.some((item) => item.id === id);
}
