import type { CSSProperties } from "react";
import type { ColoriFoglie } from "@/data/stagioni";

const oak =
  "M12 1.2c.9 1.4 2.4 1.9 2 3.4 1.6-.3 2.7.7 1.9 2.2 1.8.1 2.5 1.5 1.2 2.8 1.6.7 1.6 2.3 0 3 1.1 1.3.4 2.8-1.4 2.6.3 1.7-1 2.8-2.6 2.1l-.3 5.5h-1.6l-.3-4.5c-1.6.7-2.9-.4-2.6-2.1-1.8.2-2.5-1.3-1.4-2.6-1.6-.7-1.6-2.3 0-3-1.3-1.3-.6-2.7 1.2-2.8-.8-1.5.3-2.5 1.9-2.2C9.6 3.1 11.1 2.6 12 1.2z";
const oval = "M12 2c4.5 2.5 7.5 6.5 7 11.5-.4 4.6-3.6 7.6-7 8.5-3.4-.9-6.6-3.9-7-8.5C4.5 8.5 7.5 4.5 12 2z";
const maple =
  "M12 1.5c1.2 3 3.4 4.6 7.6 4.9-1.6 2.4-1.6 5 .4 8.3-3.6-.2-5.8 1.4-7 5.6l-1-2.8-1 2.8c-1.2-4.2-3.4-5.8-7-5.6 2-3.3 2-5.9.4-8.3C8.6 6.1 10.8 4.5 12 1.5z";

const veins: Record<string, string> = {
  oak: "M12 3.5V23M12 9l-3-2M12 9l3-2M12 13l-3.5-2M12 13l3.5-2",
  oval: "M12 4v18M12 9l-3-2M12 9l3-2M12 14l-4-2.5M12 14l4-2.5",
  maple: "M12 4v18M12 12l-5-4M12 12l5-4",
};

const shapes = { oak, oval, maple };

type Colore = keyof ColoriFoglie;

type Leaf = {
  shape: keyof typeof shapes;
  colore: Colore;
  className: string;
  style: CSSProperties;
};

const falling: Leaf[] = [
  { shape: "oak", colore: "quercia", className: "leaf", style: { left: "7%", top: -30, width: 30, animationDuration: "19s" } },
  { shape: "oval", colore: "rame", className: "leaf", style: { left: "38%", top: -60, width: 22, animationDuration: "24s", animationDelay: "-9s" } },
  { shape: "maple", colore: "oro", className: "leaf", style: { left: "63%", top: -40, width: 26, animationDuration: "21s", animationDelay: "-4s" } },
  { shape: "oak", colore: "mano", className: "leaf", style: { left: "86%", top: -50, width: 28, animationDuration: "26s", animationDelay: "-15s" } },
];

const edges: Record<string, Leaf[]> = {
  paper: [
    { shape: "oak", colore: "rame", className: "fg", style: { right: "4%", top: 48, width: 42, transform: "rotate(25deg)", opacity: 0.75 } },
    { shape: "oval", colore: "oro", className: "fg", style: { right: "9%", top: 96, width: 24, transform: "rotate(-60deg)", opacity: 0.7 } },
    { shape: "maple", colore: "mano", className: "fg", style: { left: "1.5%", bottom: 60, width: 34, transform: "rotate(-110deg)", opacity: 0.7 } },
  ],
  menu: [
    { shape: "oval", colore: "quercia", className: "fg", style: { left: "2%", top: 70, width: 30, transform: "rotate(50deg)", opacity: 0.75 } },
    { shape: "maple", colore: "rame", className: "fg", style: { right: "2.5%", bottom: 50, width: 36, transform: "rotate(-20deg)", opacity: 0.75 } },
  ],
  pareti: [
    { shape: "oak", colore: "quercia", className: "fg", style: { right: "3%", top: 60, width: 30, transform: "rotate(-35deg)", opacity: 0.7 } },
    { shape: "oval", colore: "rame", className: "fg", style: { left: "2%", bottom: 120, width: 26, transform: "rotate(80deg)", opacity: 0.7 } },
  ],
  feste: [
    { shape: "maple", colore: "mano", className: "fg", style: { left: "46%", top: 40, width: 28, transform: "rotate(15deg)", opacity: 0.75 } },
    { shape: "oak", colore: "oro", className: "fg", style: { left: "3%", bottom: 36, width: 32, transform: "rotate(-70deg)", opacity: 0.75 } },
  ],
  faq: [
    { shape: "maple", colore: "rame", className: "fg", style: { right: "4%", top: 72, width: 34, transform: "rotate(120deg)", opacity: 0.7 } },
    { shape: "oval", colore: "terra", className: "fg", style: { left: "3%", bottom: 40, width: 28, transform: "rotate(-30deg)", opacity: 0.75 } },
  ],
  info: [
    { shape: "oak", colore: "quercia", className: "fg", style: { right: "5%", top: 36, width: 30, transform: "rotate(40deg)", opacity: 0.7 } },
    { shape: "maple", colore: "oro", className: "fg", style: { left: "4%", bottom: 28, width: 26, transform: "rotate(-20deg)", opacity: 0.75 } },
  ],
  giornata: [
    { shape: "oak", colore: "rame", className: "fg", style: { right: "3%", top: 36, width: 28, transform: "rotate(18deg)", opacity: 0.55 } },
    { shape: "oval", colore: "quercia", className: "fg", style: { left: "2%", bottom: 48, width: 22, transform: "rotate(-40deg)", opacity: 0.5 } },
  ],
  pranzo: [
    { shape: "maple", colore: "oro", className: "fg", style: { left: "3%", top: 28, width: 26, transform: "rotate(30deg)", opacity: 0.6 } },
    { shape: "oak", colore: "rame", className: "fg", style: { right: "4%", bottom: 40, width: 30, transform: "rotate(-80deg)", opacity: 0.55 } },
  ],
  serate: [
    { shape: "oval", colore: "mano", className: "fg", style: { left: "2%", top: 80, width: 24, transform: "rotate(70deg)", opacity: 0.5 } },
    { shape: "maple", colore: "quercia", className: "fg", style: { right: "18%", bottom: 36, width: 28, transform: "rotate(-15deg)", opacity: 0.5 } },
  ],
  garden: [
    { shape: "oak", colore: "terra", className: "fg", style: { right: "6%", top: 24, width: 26, transform: "rotate(50deg)", opacity: 0.55 } },
    { shape: "oval", colore: "rame", className: "fg", style: { left: "5%", bottom: 32, width: 22, transform: "rotate(-25deg)", opacity: 0.5 } },
  ],
};

export type SlotDecorazione = "hero" | keyof typeof edges;

function LeafSvg({ leaf, colori }: { leaf: Leaf; colori: ColoriFoglie }) {
  return (
    <svg className={leaf.className} style={leaf.style} viewBox="0 0 24 24" aria-hidden="true">
      <path fill={colori[leaf.colore]} d={shapes[leaf.shape]} />
      <path fill="none" stroke="var(--inchiostro)" strokeOpacity={0.35} strokeWidth={0.7} d={veins[leaf.shape]} />
    </svg>
  );
}

export function Foglie({ where, colori }: { where: SlotDecorazione; colori: ColoriFoglie }) {
  const leaves = where === "hero" ? falling : edges[where];
  return (
    <div className="foglie" aria-hidden="true">
      {leaves.map((leaf, index) => (
        <LeafSvg key={`${where}-${index}`} leaf={leaf} colori={colori} />
      ))}
    </div>
  );
}
