export type MuraleAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  dove: string;
  tone: "paper" | "ink";
};

export const galleriaMurales: readonly MuraleAsset[] = [
  {
    src: "/murales/gabbie-pesci.png",
    alt: "Murale delle gabbie con i pesci: Vivere ardendo e non bruciarsi mai, Down Under Cafè Vanzago",
    width: 596,
    height: 501,
    title: "Vivere ardendo e non bruciarsi mai",
    dove: "In sala, tra le gabbie e i pesci",
    tone: "paper",
  },
  {
    src: "/murales/gabbie.png",
    alt: "Murale della voliera di gabbie sospese, Down Under Cafè Vanzago",
    width: 1000,
    height: 431,
    title: "La voliera",
    dove: "In sala, sulle gabbie sospese",
    tone: "ink",
  },
  {
    src: "/murales/caverna-duc.png",
    alt: "Murale della caverna con fossili e monogramma DUC, Down Under Cafè Vanzago",
    width: 801,
    height: 477,
    title: "La caverna DUC",
    dove: "In sala, nella caverna con il monogramma",
    tone: "paper",
  },
  {
    src: "/murales/faro-fine-mondo.png",
    alt: "Lettering del murale Il faro alla fine del mondo, Down Under Cafè Vanzago",
    width: 240,
    height: 184,
    title: "Il faro alla fine del mondo",
    dove: "In sala, sul lettering del faro",
    tone: "ink",
  },
  {
    src: "/murales/rosam.png",
    alt: "Cartiglio del murale: Rosam cape, spinam cave, Down Under Cafè Vanzago",
    width: 237,
    height: 423,
    title: "Rosam cape, spinam cave",
    dove: "In sala, sul cartiglio",
    tone: "paper",
  },
  {
    src: "/murales/order-here.png",
    alt: "Murale del bancone: order here, wait the shaking, drink eat enjoy, pay here, Down Under Cafè Vanzago",
    width: 224,
    height: 706,
    title: "Order here",
    dove: "Al bancone, dove si ordina e si paga",
    tone: "ink",
  },
];

export const flyers = [
  {
    src: "/murales/flyer-pranzo.jpg",
    alt: "Volantino del pranzo, inaugurazione del Down Under Cafè, 22 novembre 2010",
    width: 307,
    height: 874,
    className: "flyer flyer-a",
  },
  {
    src: "/murales/flyer-generico.jpg",
    alt: "Volantino dell’inaugurazione del Down Under Cafè, 22 novembre 2010",
    width: 307,
    height: 874,
    className: "flyer flyer-b",
  },
  {
    src: "/murales/flyer-happyhour.jpg",
    alt: "Volantino dell’happy hour, inaugurazione del Down Under Cafè, 22 novembre 2010",
    width: 568,
    height: 800,
    className: "flyer flyer-c",
  },
] as const;
