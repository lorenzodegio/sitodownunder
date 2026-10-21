export type VoceMenu = {
  name: string;
  text: string;
  price: string;
};

export const pranzoFisso = {
  name: "Pranzo",
  when: "Dal lunedì al venerdì",
  text: "Primo + secondo con contorno da 14€. Primi e secondi da 7€, bevande escluse. A pranzo c’è anche tutto il menù della sera.",
};

export const vociMenu: readonly VoceMenu[] = [
  {
    name: "I Burgers",
    text: "Il motivo per cui la gente viene. Carne seria, pane ai semi, abbinamenti che non ti aspetti.",
    price: "[prezzo da confermare]",
  },
  {
    name: "Le Pizze",
    text: "Dalla margherita a burrata, crudo e pistacchio. Si mangiano in sala, e si possono ordinare anche d’asporto.",
    price: "[prezzo da confermare]",
  },
  {
    name: "Le Specialità",
    text: "I piatti della cucina. Cambiano spesso, quindi in sala si chiede.",
    price: "[prezzo da confermare]",
  },
  {
    name: "Le Piade Romagnole",
    text: "Farcite al momento. Per chi ha fame ma non troppa.",
    price: "[prezzo da confermare]",
  },
  {
    name: "Club Sandwich & Hotdog",
    text: "I classici da pub, con patatine.",
    price: "[prezzo da confermare]",
  },
  {
    name: "Taglieri & Insalatone",
    text: "Da dividere all’aperitivo. O l’insalatona, se oggi si fa i bravi.",
    price: "[prezzo da confermare]",
  },
  {
    name: "I Dolci",
    text: "Fatti in casa. Il tiramisù ha un seguito fedele.",
    price: "[prezzo da confermare]",
  },
  {
    name: "I Cocktail",
    text: "I classici fatti come si deve, più quello che si inventa il bancone.",
    price: "[prezzo da confermare]",
  },
  {
    name: "Vini, Bolle & Birre",
    text: "Al calice, in bottiglia, alla spina.",
    price: "[prezzo da confermare]",
  },
];

export const serateMenu = [
  {
    day: "Martedì",
    title: "A cena come dalla nonna",
    text: "Comfort food su prenotazione. Il programma del mese può cambiare: la versione aggiornata sta in sala e su Instagram.",
    dishes: ["Polenta taragna e costine", "Pizzoccheri valtellinesi", "Cassoeula", "Polpette al sugo"],
  },
  {
    day: "Giovedì",
    title: "Che gnocchi!",
    text: "Gnocchi freschi, condimento che ruota. Anche questa è una serata su prenotazione.",
    dishes: ["Zucca e salsiccia", "Alla sorrentina", "Porri e gorgonzola", "Al ragù"],
  },
] as const;
