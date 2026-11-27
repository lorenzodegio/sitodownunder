const CICLO = ["#B5372E", "#F3DFA2", "#2F6B4F", "#F3DFA2"];

const lampadine: Array<[number, number]> = [
  [40, 8],
  [140, 14],
  [240, 18],
  [340, 22],
  [440, 24],
  [540, 26],
  [640, 27],
  [740, 27],
  [840, 26],
  [940, 24],
  [1040, 22],
  [1140, 18],
  [1240, 14],
  [1340, 8],
];

/** Filo di luci sotto l’header. Si accende in sequenza, poi resta un respiro lento. */
export function Lucine() {
  return (
    <svg className="lucine" aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none">
      <path d="M0 2 Q720 38 1440 2" fill="none" stroke="#F6EFDF" strokeOpacity="0.4" strokeWidth="1.6" />
      {lampadine.map(([x, y], index) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <rect x="-2.5" y="-2" width="5" height="4" rx="1" fill="#F6EFDF" opacity="0.45" />
          <ellipse
            className="lucine-lampadina"
            cx="0"
            cy="8"
            rx="4.5"
            ry="6.5"
            fill={CICLO[index % CICLO.length]}
            style={{ animationDuration: "2.4s", animationDelay: `${index * 0.12}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
