import type { CSSProperties } from "react";
import type { ColoriNeve } from "@/data/stagioni";
import type { SlotDecorazione } from "@/components/Foglie";

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
export function Neve({ dove }: { dove: SlotDecorazione; colori: ColoriNeve }) {
  if (dove === "hero") return null;

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
