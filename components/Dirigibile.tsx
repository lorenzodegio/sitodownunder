export function Dirigibile() {
  return (
    <svg className="ink fly dirigibile" aria-hidden="true" viewBox="0 0 420 200">
      <ellipse className="w" cx="200" cy="78" rx="170" ry="52" />
      <path d="M32 78h336M70 46c80 22 180 22 260 0M70 110c80-22 180-22 260 0M200 26v104M130 30v96M270 30v96" />
      <path className="w" d="M368 64l38-22v72l-38-22z" />
      <path d="M140 126l18 36h100l18-36" />
      <rect className="w" x="154" y="162" width="108" height="30" rx="10" />
      <path d="M176 177h10M203 177h10M230 177h10" />
      <g className="spin fast">
        <path d="M14 58v40M-6 78h40" />
      </g>
    </svg>
  );
}
