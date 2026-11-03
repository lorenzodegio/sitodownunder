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
    text: "Dalla margherita a burrata, crudo e pistacchio. Sì, puoi fare la foto prima.",
    price: "[prezzo da confermare]",
  },
  {
    name: "La carne",
    text: "I piatti di carne della cucina. I tagli nuovi si annunciano quando arrivano.",
    price: "[prezzo da confermare]",
  },
  {
    name: "Specialità",
    text: "Pulled pork, tartare e roastbeef.",
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
  {
    name: "E altro",
    text: "hot dog · club sandwich · taglieri",
    price: "",
  },
];
