const TILE = 640;

/** Due gobbe che si incontrano alla stessa altezza, così il bordo non ha un tratto dritto. */
const onda =
  "M0 86C40 86 70 34 150 38C230 42 270 86 320 86C360 86 400 28 490 32C580 36 610 86 640 86V140H0Z";

export function Nuvole({ color }: { color: string }) {
  return (
    <div className="nuvole" aria-hidden="true">
      <svg className="nuvole-svg" viewBox={`0 0 ${TILE * 2} 140`} preserveAspectRatio="none">
        <path fill={color} d={onda} />
        <path fill={color} d={onda} transform={`translate(${TILE} 0)`} />
      </svg>
    </div>
  );
}
