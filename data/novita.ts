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
  voce("picanha", "02", "Picanha"),
  voce("bavetta", "03", "Bavetta"),
  voce("pulled-pork", "04", "Pulled pork"),
  voce("costata", "26", "Costata"),
  voce("burger-mese", "27", "Burger del mese"),
];

function voce(id: string, slot: string, nome: string): Novita {
  return {
    id,
    slot,
    nome,
    provenienza: "[provenienza]",
    peso: "[peso]",
    cottura: "[cottura consigliata]",
    descrizione: "[una riga]",
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
