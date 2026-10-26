export type Novita = {
  id: string;
  nome: string;
  provenienza: string;
  peso: string;
  descrizione: string;
  prezzo: string;
  foto: string | null;
};

/** Tagli nuovi. Il blocco in pagina resta spento finché non arrivano i dati veri. */
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

export function novitaInPagina(): readonly Novita[] {
  return [];
}

