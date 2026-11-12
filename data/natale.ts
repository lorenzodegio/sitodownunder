import { locale } from "@/data/locale";

export const natale = {
  titolo: "Il giro del Natale in tre menù",
  sottotitolo: "Cene aziendali o tra amici. Tu porti la squadra, noi la rotta.",
  condizioni: "Proposte valide per tutto dicembre, per almeno 10 persone.",
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
        "Pandoro o panettone con crema al mascarpone",
      ],
    },
    {
      id: "aperitivo-primo",
      numero: "II",
      nome: "Aperitivo + primo caldo",
      frase: "perché a dicembre fa freddo, ok?",
      prezzo: 30,
      voci: [
        "Piatto aperitivo con consumazione",
        "Primo piatto caldo: orecchiette al ragù di salsiccia fresca",
        "Pandoro o panettone con crema al mascarpone",
      ],
    },
    {
      id: "cena",
      numero: "III",
      nome: "Menù cena",
      frase: "la rotta completa, dal tagliere al caffè",
      prezzo: 40,
      voci: [
        "Tagliere di coppa piacentina, salame felino e prosciutto crudo di Parma, con la nostra focaccia alta",
        "Carpaccio di vitello cotto a bassa temperatura con la sua salsa",
        "Orecchiette al ragù di luganega fresca",
        "Roast beef di picanha affumicata con patate rustiche al forno",
      ],
      incluso: "Coperto, acqua, caffè e una bottiglia di vino ogni 5 persone",
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
