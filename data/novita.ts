import { contieneSegnaposto, visibileConSegnaposto } from "@/lib/segnaposto";

export type Novita = {
  id: string;
  slot: string;
  nome: string;
  provenienza: string;
  peso: string;
  cottura: string;
  descrizione: string;
  prezzo: string;
  unita: string;
};

/** Novità del mese. Provenienza, peso, cottura e prezzo restano fuori finché sono tra parentesi. */
export const novita: readonly Novita[] = [
  voce(
    "picanha",
    "02",
    "Tagliata di Picanha",
    "Da 250 grammi alla griglia, condita con olio EVO non filtrato, sale Maldon a scaglie, servita con salsa chimichurri e patata piastrata.",
  ),
  voce(
    "bavetta",
    "03",
    "Bavetta",
    "Flank steak da 250 grammi alla griglia, condita con olio EVO non filtrato, sale Maldon a scaglie, servita con fondo bruno.",
  ),
  voce(
    "pulled-pork",
    "04",
    "Pulled pork",
    "Bun, salsa BBQ, spalla di suino sfilacciata, affumicata e cotta a bassa temperatura, servita insieme all'insalata stile coleslaw. Con patatine fritte.",
  ),
  voce(
    "costata",
    "26",
    "Costata",
    "Di scottona da 400 grammi alla griglia, condita con olio EVO non filtrato, sale Maldon a scaglie, servita con salsa chimichurri.",
  ),
  voce(
    "zuccotto",
    "27",
    "Lo zuccotto",
    "Bun pretzel, crema di zucca stufata condita con sale, olio e pepe, hamburger da 200 g, gorgonzola DOP e speck croccante. Con patatine fritte.",
  ),
];

function voce(id: string, slot: string, nome: string, descrizione: string): Novita {
  return {
    id,
    slot,
    nome,
    provenienza: "[provenienza]",
    peso: "[peso]",
    cottura: "[cottura consigliata]",
    descrizione,
    prezzo: "[prezzo]",
    unita: "[a persona / al etto]",
  };
}

function testi(voce: Novita): string[] {
  return [voce.nome, voce.provenienza, voce.peso, voce.cottura, voce.descrizione, voce.prezzo, voce.unita];
}

export function novitaConfermate(): readonly Novita[] {
  return novita.filter((voce) => !testi(voce).some((testo) => contieneSegnaposto(testo)));
}

export function novitaInPagina(): readonly Novita[] {
  const confermate = novitaConfermate();
  if (process.env.VERCEL_ENV === "production") return confermate;
  return visibileConSegnaposto(novita.flatMap(testi)) ? novita : confermate;
}

/** Voci con il nome già deciso. Si vedono anche se gli altri campi sono ancora tra parentesi. */
export function novitaInElenco(): readonly Novita[] {
  return novita.filter((voce) => voce.nome && !contieneSegnaposto(voce.nome));
}

export function elencoNomi(voci: readonly Novita[]): string {
  const nomi = voci.map((voce) => voce.nome);
  if (nomi.length < 2) return nomi[0] ?? "";
  return `${nomi.slice(0, -1).join(", ")} e ${nomi[nomi.length - 1]}`;
}

const CODA_LOCALE = /,?\s*al Down Under Cafè di Vanzago$/i;

/** Testo da mostrare. Le parentesi non escono. Se manca, si usa il testo della foto. */
export function testoConfermato(value: string | undefined, fallback = ""): string {
  const scelto = (value && !contieneSegnaposto(value) ? value : fallback) ?? "";
  return scelto.replace(CODA_LOCALE, "").trim();
}

export function meseNovita(data = new Date()): string {
  return new Intl.DateTimeFormat("it-IT", { month: "long", timeZone: "Europe/Rome" }).format(data);
}
