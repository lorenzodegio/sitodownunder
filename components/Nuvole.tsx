const TILE = 640;

const onda =
  "M0 92C24 92 36 58 72 54C96 51 108 70 132 68C160 66 168 40 208 38C248 36 260 62 292 64C324 66 340 34 388 32C428 30 444 58 480 60C512 62 528 44 568 48C600 51 616 92 640 92V140H0Z";

function cloudImage(fill: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} 140"><path fill="${fill}" d="${onda}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function Nuvole({ color }: { color: string }) {
  return (
    <div className="nuvole" aria-hidden="true">
      <div className="nuvole-layer" style={{ backgroundImage: cloudImage(color) }} />
    </div>
  );
}
