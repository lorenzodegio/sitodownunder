/**
 * Indirizzo e contatti. Unica fonte per la UI e il JSON-LD.
 * Minuti da mezzanotte (Europe/Rome). Una chiusura dopo mezzanotte supera 1440.
 */

export type MinuteRange = readonly [start: number, end: number];
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const PLACE_ID = "ChIJ8cRKFpnshkcRO1lNaT-MLcA";

export const locale = {
  name: "Down Under Cafè",
  legalName: "Down Under Sas di Busnelli Eniacos e C.",
  vat: "07081370962",
  pec: "downunder@pec.it",
  streetAddress: "Via I Maggio 1",
  postalCode: "20043",
  addressLocality: "Vanzago",
  addressRegion: "MI",
  addressCountry: "IT",
  addressShort: "Via I Maggio 1, Vanzago",
  addressFull: "Via I Maggio 1, 20043 Vanzago (MI)",
  nap: "Down Under Cafè · Via I Maggio 1, 20043 Vanzago (MI) · 338 439 5727",
  phoneDisplay: "338 439 5727",
  phoneE164: "+393384395727",
  instagram: "https://www.instagram.com/downundercafe/",
  instagramHandle: "@downundercafe",
  /** Scheda Google del locale. Non usare l’indirizzo da solo: esiste anche a Bareggio. */
  placeId: PLACE_ID,
  mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Down Under Cafè, Via I Maggio 1, 20043 Vanzago MI")}&destination_place_id=${PLACE_ID}`,
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Down Under Cafè Vanzago")}&query_place_id=${PLACE_ID}`,
  reviewUrl: `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
  geo: { latitude: "[latitudine]", longitude: "[longitudine]" },
} as const;

export const hoursPlaceholder = "[orari da confermare]";
export const pricePlaceholder = "[prezzo da confermare]";

/** Frase unica per i testi. La tabella legge `hours`. */
export const hoursSummary =
  "lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30";

/** Indice = getDay(): 0 domenica … 6 sabato. */
export const hours: readonly (readonly MinuteRange[])[] = [
  [[18 * 60, 24 * 60 + 30]],
  [[11 * 60 + 30, 15 * 60]],
  [
    [11 * 60 + 30, 15 * 60],
    [18 * 60 + 30, 24 * 60 + 30],
  ],
  [
    [11 * 60 + 30, 15 * 60],
    [18 * 60 + 30, 24 * 60 + 30],
  ],
  [
    [11 * 60 + 30, 15 * 60],
    [18 * 60 + 30, 24 * 60 + 30],
  ],
  [
    [11 * 60 + 30, 15 * 60],
    [18 * 60 + 30, 24 * 60 + 60],
  ],
  [[18 * 60 + 30, 24 * 60 + 60]],
];

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
