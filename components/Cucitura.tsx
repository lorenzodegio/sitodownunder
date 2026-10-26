import { useId } from "react";

const tono = {
  ink: "var(--inchiostro)",
  carta: "var(--carta)",
  fondo: "var(--fondo)",
  biglietto: "var(--biglietto)",
} as const;

type Tono = keyof typeof tono;

/** Segni diversi fra le sezioni. Niente immagini: un tracciato e un’animazione CSS. */
export type Motivo = "onda" | "scandaglio" | "rotta" | "telegrafo" | "parallelo" | "catena";

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
  const segno = da === "ink" ? "var(--carta)" : "var(--inchiostro)";
  const corpo = (
    <div className={`cucitura cucitura-${motivo}`} style={{ background: tono[da], color: segno }} aria-hidden="true">
      {motivo === "onda" ? <Onda id={id} fill={tono[a]} /> : null}
      {motivo === "scandaglio" ? <Tratti id={id} passo={36} tacca /> : null}
      {motivo === "rotta" ? <Rotta /> : null}
      {motivo === "telegrafo" ? <Telegrafo /> : null}
      {motivo === "parallelo" ? <Tratti id={id} passo={72} croce /> : null}
      {motivo === "catena" ? <Catena id={id} /> : null}
    </div>
  );

  if (!stacca) return corpo;
  return (
    <div className="cucitura-stacca" style={{ background: tono[a] }}>
      {corpo}
    </div>
  );
}

function Onda({ id, fill }: { id: string; fill: string }) {
  return (
    <svg className="cucitura-svg cucitura-deriva" viewBox="0 0 2000 40" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="100" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 22q25-22 50 0t50 0V40H0z" fill={fill} />
        </pattern>
      </defs>
      <rect width="2000" height="40" fill={`url(#${id})`} />
    </svg>
  );
}

function Tratti({ id, passo, tacca, croce }: { id: string; passo: number; tacca?: boolean; croce?: boolean }) {
  const taccaPath = tacca ? `M0 8V28` : "";
  const crocePath = croce ? "M8 10V22 M2 16H14" : "";
  return (
    <svg className="cucitura-svg cucitura-deriva" viewBox="0 0 1440 36" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width={passo} height="36" patternUnits="userSpaceOnUse">
          <path d={`M0 18H${passo} ${taccaPath} ${crocePath}`} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </pattern>
      </defs>
      <rect width="1440" height="36" fill={`url(#${id})`} />
    </svg>
  );
}

function Rotta() {
  return (
    <>
      <svg className="cucitura-svg" viewBox="0 0 1200 36" preserveAspectRatio="none">
        <path d="M0 18H1200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="cucitura-punto" />
    </>
  );
}

function Telegrafo() {
  return (
    <svg className="cucitura-svg" viewBox="0 0 1200 32" preserveAspectRatio="none">
      <path className="cucitura-segnale" d="M0 16H1200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="16 20" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Catena({ id }: { id: string }) {
  return (
    <svg className="cucitura-svg cucitura-deriva" viewBox="0 0 1400 36" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="28" height="36" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="18" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </pattern>
      </defs>
      <rect width="1400" height="36" fill={`url(#${id})`} />
    </svg>
  );
}
