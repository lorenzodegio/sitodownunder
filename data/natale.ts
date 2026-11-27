import { locale } from "@/data/locale";

export const natale = {
  titolo: "Il giro del Natale in tre menù",
  sottotitolo:
    "Cene aziendali o tra amici. Tu porti la squadra, noi la rotta: scegli fin dove spingerti.",
  condizioni: "Tutto dicembre · minimo 10 persone",
  proposte: [
    {
      id: "aperitivo",
      numero: "I",
      nome: "Aperitivo al piatto",
      frase: "brindisi, chiacchiere e panettone",
      prezzo: 20,
      voci: [
        "Piatto aperitivo",
        "Una consumazione",
        "Pandoro o panettone con crema al mascarpone fatta in casa",
      ],
    },
    {
      id: "aperitivo-primo",
      numero: "II",
      nome: "Aperitivo + primo caldo",
      frase: "perché a dicembre fa freddo, ok?",
      prezzo: 30,
      voci: [
        "Piatto aperitivo",
        "Una consumazione",
        "Orecchiette al sugo di salsiccia fresca",
        "Pandoro o panettone con crema al mascarpone fatta in casa",
      ],
    },
    {
      id: "cena",
      numero: "III",
      nome: "Menù cena",
      frase: "la rotta completa, dal tagliere al caffè",
      prezzo: 40,
      voci: [
        "Tagliere di salumi con la nostra focaccia alta",
        "Carpaccio di vitello",
        "Orecchiette al sugo di salsiccia fresca",
        "Roast beef di picanha affumicata con patate rustiche",
        "Coperto, acqua, caffè e una bottiglia di vino ogni 5 persone",
      ],
    },
  ],
} as const;

export const nataleFaq = [
  { q: "Per quante persone?", a: "Almeno 10 persone." },
  { q: "Fino a quando?", a: "Per tutto dicembre." },
  { q: "Come si prenota?", a: `Su WhatsApp o al telefono, ${locale.phoneDisplay}.` },
] as const;

export function messaggioNatale(nome: string): string {
  return `Ciao! Vorrei prenotare la proposta di Natale "${nome}" per [numero] persone il [giorno].`;
}
