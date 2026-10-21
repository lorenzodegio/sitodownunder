const TILE = 640;

const front =
  "M0 92C24 92 36 58 72 54C96 51 108 70 132 68C160 66 168 40 208 38C248 36 260 62 292 64C324 66 340 34 388 32C428 30 444 58 480 60C512 62 528 44 568 48C600 51 616 92 640 92V140H0Z";

const back =
  "M0 104C36 104 52 74 98 70C140 66 156 90 204 88C252 86 268 60 324 56C376 52 396 84 448 82C500 80 516 62 564 66C604 69 620 104 640 104V140H0Z";

function cloudImage(path: string, fill: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} 140"><path fill="${fill}" d="${path}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function lighten(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  const channel = (shift: number) => {
    const current = (value >> shift) & 255;
    return Math.round(current + (255 - current) * 0.42);
  };
  return `#${[channel(16), channel(8), channel(0)].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

export function Nuvole({ color = "#f6efdf" }: { color?: string }) {
  return (
    <div className="nuvole" aria-hidden="true">
      <div
        className="nuvole-layer nuvole-back"
        style={{ backgroundImage: cloudImage(back, lighten(color)) }}
      />
      <div className="nuvole-layer nuvole-front" style={{ backgroundImage: cloudImage(front, color) }} />
    </div>
  );
}
