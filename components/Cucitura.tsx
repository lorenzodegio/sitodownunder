import { useId } from "react";

const tono = {
  ink: "var(--inchiostro)",
  carta: "var(--carta)",
  fondo: "var(--fondo)",
  biglietto: "var(--biglietto)",
} as const;

type Tono = keyof typeof tono;

/** Onda fra due fondi. Il colore `a` è quello della sezione che segue. */
export function Cucitura({ da, a }: { da: Tono; a: Tono }) {
  const id = `cu${useId().replace(/:/g, "")}`;
  return (
    <div className="cucitura" style={{ background: tono[da] }} aria-hidden="true">
      <svg className="cucitura-svg" viewBox="0 0 1700 40" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="100" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 22q25-22 50 0t50 0V40H0z" fill={tono[a]} />
          </pattern>
        </defs>
        <rect width="1700" height="40" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

/** Filetto a onda, quando due sezioni chiare restano dello stesso fondo. */
export function CucituraTratto() {
  const id = `ct${useId().replace(/:/g, "")}`;
  return (
    <div className="cucitura cucitura-tratto" aria-hidden="true">
      <svg className="cucitura-svg" viewBox="0 0 1700 28" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="100" height="28" patternUnits="userSpaceOnUse">
            <path d="M0 18q25-16 50 0t50 0" fill="none" stroke="var(--inchiostro)" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="1700" height="28" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
