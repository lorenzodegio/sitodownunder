/**
 * Indirizzo e contatti. Unica fonte per la UI e il JSON-LD.
 * Orari, prezzi e coordinate restano segnaposto finché il locale non li conferma.
 * Quando gli orari ci sono: minuti da mezzanotte (Europe/Rome).
 * Una chiusura dopo mezzanotte supera 1440.
 */

export type MinuteRange = readonly [start: number, end: number];
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const locale = {
  name: "Down Under Cafè",
  streetAddress: "Via Primo Maggio 1",
  postalCode: "20043",
  addressLocality: "Vanzago",
  addressRegion: "MI",
  addressCountry: "IT",
  addressShort: "Via Primo Maggio 1, Vanzago",
  addressFull: "Via Primo Maggio 1, 20043 Vanzago (MI)",
  nap: "Down Under Cafè · Via Primo Maggio 1, 20043 Vanzago (MI) · 338 439 5727",
  phoneDisplay: "338 439 5727",
  phoneE164: "+393384395727",
  instagram: "https://www.instagram.com/downundercafe/",
  instagramHandle: "@downundercafe",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Via+Primo+Maggio+1+20043+Vanzago",
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Down+Under+Caf%C3%A8+Via+Primo+Maggio+1+Vanzago",
  geo: { latitude: "[latitudine]", longitude: "[longitudine]" },
} as const;

export const hoursPlaceholder = "[orari da confermare]";
export const pricePlaceholder = "[prezzo da confermare]";

/** Indice = getDay(): 0 domenica … 6 sabato. Null finché il locale non conferma. */
export const hours: readonly (readonly MinuteRange[])[] | null = null;

export const schemaDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const comuni = [
  "Vanzago",
  "Mantegazza",
  "Rho",
  "Fiera Milano Rho",
  "Pogliano Milanese",
  "Pregnana Milanese",
  "Arluno",
  "Sedriano",
  "Nerviano",
  "Cornaredo",
  "Lainate",
  "Bareggio",
] as const;

export const areaServed: readonly { type: "City" | "Place" | "AdministrativeArea"; name: string }[] = [
  { type: "City", name: "Vanzago" },
  { type: "Place", name: "Mantegazza" },
  { type: "City", name: "Rho" },
  { type: "Place", name: "Fiera Milano Rho" },
  { type: "City", name: "Pogliano Milanese" },
  { type: "City", name: "Pregnana Milanese" },
  { type: "City", name: "Arluno" },
  { type: "City", name: "Sedriano" },
  { type: "City", name: "Nerviano" },
  { type: "City", name: "Cornaredo" },
  { type: "City", name: "Lainate" },
  { type: "City", name: "Bareggio" },
  { type: "AdministrativeArea", name: "Provincia di Milano" },
  { type: "Place", name: "Milano ovest" },
  { type: "Place", name: "Asse del Sempione" },
];
