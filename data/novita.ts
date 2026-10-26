import { contieneSegnaposto } from "@/lib/segnaposto";

export type Novita = {
  id: string;
  nome: string;
  provenienza: string;
  peso: string;
  descrizione: string;
  prezzo: string;
  foto: string | null;
};

/**
 * Tagli nuovi, sopra l’elenco di «E tu cosa scegli?».
 * Si compilano qui, non da /admin. In produzione il blocco compare solo senza [parentesi].
 */
export const novita: readonly Novita[] = [
  {
    id: "taglio-1",
    nome: "[nome del taglio]",
    provenienza: "[provenienza]",
    peso: "[peso]",
    descrizione: "[descrizione]",
    prezzo: "[prezzo]",
    foto: null,
  },
];

function compilata(item: Novita): boolean {
  return [item.nome, item.provenienza, item.peso, item.descrizione, item.prezzo].every(
    (testo) => !contieneSegnaposto(testo),
  );
}

export function novitaInPagina(): readonly Novita[] {
  const pronte = novita.filter(compilata);
  if (process.env.VERCEL_ENV === "production") return pronte;
  return novita;
}

