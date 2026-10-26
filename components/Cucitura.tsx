import { useId } from "react";

const tono = {
  ink: "var(--inchiostro)",
  carta: "var(--carta)",
  fondo: "var(--fondo)",
  biglietto: "var(--biglietto)",
} as const;

type Tono = keyof typeof tono;

/**
 * Fasce piene che si ripetono senza stacco e scorrono di lato.
 * La mattonella divide 1000, metà del viewBox, così il giro non salta.
 */
const fasce = {
  onda: { w: 100, d: "M0 22q25-22 50 0t50 0V40H0Z" },
  mare: { w: 200, d: "M0 26C50 26 50 8 100 8C150 8 150 26 200 26V40H0Z" },
  doppia: { w: 200, d: "M0 24C25 24 25 10 50 10C75 10 75 28 100 28C125 28 125 16 150 16C175 16 175 24 200 24V40H0Z" },
  cavo: { w: 200, d: "M0 14C50 14 50 32 100 32C150 32 150 14 200 14V40H0Z" },
  stretta: { w: 100, d: "M0 28C12 28 12 12 25 12C38 12 38 28 50 28C62 28 62 18 75 18C88 18 88 28 100 28V40H0Z" },
  lunga: { w: 250, d: "M0 24C40 24 40 10 80 10C120 10 120 24 160 24C190 24 190 16 220 16C235 16 235 24 250 24V40H0Z" },
} as const;

export type Motivo = keyof typeof fasce;

export function Cucitura({
  da,
  a,
  motivo = "onda",
  stacca = false,
}: {
  da: Tono;
  a: Tono;
  motivo?: Motivo;
  stacca?: boolean;
}) {
  const id = `cu${useId().replace(/:/g, "")}`;
  const fascia = fasce[motivo];
  const corpo = (
    <div className="cucitura cucitura-onda" style={{ background: tono[da] }} aria-hidden="true">
      <svg className="cucitura-svg cucitura-deriva" viewBox="0 0 2000 40" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width={fascia.w} height="40" patternUnits="userSpaceOnUse">
            <path d={fascia.d} fill={tono[a]} />
          </pattern>
        </defs>
        <rect width="2000" height="40" fill={`url(#${id})`} />
      </svg>
    </div>
  );

  if (!stacca) return corpo;
  return (
    <div className="cucitura-stacca" style={{ background: tono[a] }}>
      {corpo}
    </div>
  );
}
