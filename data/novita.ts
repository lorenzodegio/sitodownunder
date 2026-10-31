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

/** Tagli nuovi. In produzione il capitolo resta spento finché i dati non sono compilati. */
export const novita: readonly Novita[] = [
  {
    id: "taglio-1",
    slot: "02",
    nome: "[Nome taglio 1]",
    provenienza: "[provenienza]",
    peso: "[peso]",
    cottura: "[cottura consigliata]",
    descrizione: "[una riga]",
    prezzo: "[prezzo]",
    unita: "[a persona / al etto]",
  },
  {
    id: "taglio-2",
    slot: "03",
    nome: "[Nome taglio 2]",
    provenienza: "[provenienza]",
    peso: "[peso]",
    cottura: "[cottura consigliata]",
    descrizione: "[una riga]",
    prezzo: "[prezzo]",
    unita: "[a persona / al etto]",
  },
  {
    id: "taglio-3",
    slot: "04",
    nome: "[Nome taglio 3]",
    provenienza: "[provenienza]",
    peso: "[peso]",
    cottura: "[cottura consigliata]",
    descrizione: "[una riga]",
    prezzo: "[prezzo]",
    unita: "[a persona / al etto]",
  },
];

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

export function meseNovita(data = new Date()): string {
  return new Intl.DateTimeFormat("it-IT", { month: "long", timeZone: "Europe/Rome" }).format(data);
}
