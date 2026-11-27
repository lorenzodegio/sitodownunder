import type { CSSProperties } from "react";
import type { ColoriNeve } from "@/data/stagioni";
import type { SlotDecorazione } from "@/components/Foglie";

type Fiocco = {
  style: CSSProperties;
  extra?: boolean;
};

const caduta: Fiocco[] = [
  { style: { left: "4%", width: 5, animationDuration: "22s", opacity: 0.35 } },
  { style: { left: "11%", width: 8, animationDuration: "28s", animationDelay: "-6s", opacity: 0.55 } },
  { style: { left: "18%", width: 4, animationDuration: "19s", animationDelay: "-12s", opacity: 0.3 } },
  { style: { left: "26%", width: 7, animationDuration: "26s", animationDelay: "-3s", opacity: 0.45 } },
  { style: { left: "33%", width: 5, animationDuration: "24s", animationDelay: "-16s", opacity: 0.4 } },
  { style: { left: "41%", width: 9, animationDuration: "31s", animationDelay: "-8s", opacity: 0.5 } },
  { style: { left: "48%", width: 4, animationDuration: "20s", animationDelay: "-2s", opacity: 0.28 } },
  { style: { left: "55%", width: 6, animationDuration: "27s", animationDelay: "-14s", opacity: 0.42 } },
  { style: { left: "63%", width: 5, animationDuration: "23s", animationDelay: "-9s", opacity: 0.36 } },
  { style: { left: "71%", width: 8, animationDuration: "29s", animationDelay: "-18s", opacity: 0.5 } },
  { style: { left: "78%", width: 4, animationDuration: "21s", animationDelay: "-5s", opacity: 0.32 }, extra: true },
  { style: { left: "84%", width: 7, animationDuration: "30s", animationDelay: "-11s", opacity: 0.48 }, extra: true },
  { style: { left: "91%", width: 5, animationDuration: "25s", animationDelay: "-7s", opacity: 0.34 }, extra: true },
  { style: { left: "8%", width: 6, animationDuration: "33s", animationDelay: "-20s", opacity: 0.25 }, extra: true },
  { style: { left: "22%", width: 4, animationDuration: "18s", animationDelay: "-4s", opacity: 0.3 }, extra: true },
  { style: { left: "37%", width: 8, animationDuration: "34s", animationDelay: "-15s", opacity: 0.4 }, extra: true },
  { style: { left: "52%", width: 5, animationDuration: "22s", animationDelay: "-10s", opacity: 0.33 }, extra: true },
  { style: { left: "66%", width: 6, animationDuration: "27s", animationDelay: "-1s", opacity: 0.45 }, extra: true },
  { style: { left: "80%", width: 4, animationDuration: "24s", animationDelay: "-13s", opacity: 0.28 }, extra: true },
  { style: { left: "95%", width: 7, animationDuration: "32s", animationDelay: "-17s", opacity: 0.38 }, extra: true },
];

const angoli: Partial<Record<Exclude<SlotDecorazione, "hero">, CSSProperties[]>> = {
  paper: [
    { right: "3%", top: 36, width: 28, transform: "rotate(12deg)", opacity: 0.45 },
    { left: "2%", bottom: 48, width: 22, transform: "rotate(-20deg)", opacity: 0.35 },
  ],
  menu: [
    { left: "3%", top: 28, width: 24, transform: "rotate(18deg)", opacity: 0.4 },
    { right: "4%", bottom: 40, width: 26, transform: "rotate(-8deg)", opacity: 0.35 },
  ],
  feste: [{ right: "5%", top: 48, width: 26, transform: "rotate(8deg)", opacity: 0.4 }],
};

const stella = "M12 1.5v21M1.5 12h21M4.2 4.2l15.6 15.6M19.8 4.2L4.2 19.8";

function Tratto({ style }: { style: CSSProperties }) {
  return (
    <svg className="fg" style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path d={stella} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Neve al posto delle foglie. Solo decorativa. */
export function Neve({ dove, colori }: { dove: SlotDecorazione; colori: ColoriNeve }) {
  if (dove === "hero") {
    return (
      <div className="foglie neve" aria-hidden="true">
        {caduta.map((fiocco, index) => (
          <span
            key={index}
            className={fiocco.extra ? "flake flake-extra" : "flake"}
            style={{ background: colori.fiocco, ...fiocco.style }}
          />
        ))}
      </div>
    );
  }

  const tratti = angoli[dove];
  if (!tratti) return null;
  return (
    <div className="foglie" aria-hidden="true">
      {tratti.map((style, index) => (
        <Tratto key={index} style={style} />
      ))}
    </div>
  );
}
