import type { CSSProperties } from "react";
import type { ColoriNeve } from "@/data/stagioni";
import type { SlotDecorazione } from "@/components/Foglie";

/** Mucchi piccoli, sul bordo della sezione. Non coprono titoli né foto. */
const mucchi: Record<SlotDecorazione, CSSProperties[]> = {
  hero: [
    { left: "3%", bottom: 14, width: 52 },
    { right: "7%", bottom: 22, width: 34 },
  ],
  paper: [
    { left: "2%", bottom: 12, width: 40 },
    { right: "4%", bottom: 20, width: 28 },
  ],
  menu: [{ right: "3%", bottom: 16, width: 44 }],
  pareti: [{ left: "3%", bottom: 18, width: 32 }],
  feste: [{ left: "4%", bottom: 14, width: 46 }],
  faq: [{ right: "5%", bottom: 12, width: 30 }],
  info: [{ left: "3%", bottom: 16, width: 36 }],
  giornata: [{ right: "4%", bottom: 14, width: 38 }],
  pranzo: [{ left: "3%", bottom: 18, width: 42 }],
  serate: [{ right: "6%", bottom: 12, width: 28 }],
  garden: [{ left: "4%", bottom: 16, width: 34 }],
};

function Mucchio({ style }: { style: CSSProperties }) {
  return (
    <svg className="neve-posata" style={style} viewBox="0 0 80 24" aria-hidden="true">
      <path
        d="M0 24h80v-2C74 22 70 14 62 14c-6 0-8 6-16 5-7-1-9-9-18-8-8 1-10 8-18 7C4 17 2 22 0 22z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Neve posata al posto delle foglie. Solo decorativa. */
export function Neve({ dove }: { dove: SlotDecorazione; colori: ColoriNeve }) {
  const tratti = mucchi[dove];
  if (!tratti?.length) return null;
  return (
    <div className="foglie" aria-hidden="true">
      {tratti.map((style, index) => (
        <Mucchio key={index} style={style} />
      ))}
    </div>
  );
}
