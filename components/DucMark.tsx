import { caveat } from "@/components/duc-font";

export function DucMark() {
  return (
    <svg className="duc-mark" viewBox="0 0 150 62" role="img" aria-label="DUC">
      <text x="4" y="48" fontFamily={caveat.style.fontFamily} fontSize="52">
        DUC
      </text>
    </svg>
  );
}
