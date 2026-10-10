import { site } from "@/content/site";

export function Stemma() {
  return (
    <svg className="bob stemma" role="img" aria-label={site.stemmaLabel} viewBox="0 0 300 380">
      <path
        d="M40 8H260Q260 40 292 40V340Q260 340 260 372H40Q40 340 8 340V40Q40 40 40 8Z"
        fill="#26343A"
        stroke="#F4F0E6"
        strokeWidth="3"
      />
      <path
        d="M50 22H250Q254 46 278 50V330Q254 334 250 358H50Q46 334 22 330V50Q46 46 50 22Z"
        fill="none"
        stroke="#F4F0E6"
        strokeWidth="1"
        opacity="0.6"
      />
      <text x="150" y="64" textAnchor="middle" className="stemma-kicker">
        LUNCH & HAPPY HOUR
      </text>
      <text x="150" y="98" textAnchor="middle" className="stemma-duc">
        DUC
      </text>
      <path d="M60 116H240M60 246H240" stroke="#F4F0E6" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" />
      <text x="150" y="172" textAnchor="middle" className="stemma-word stemma-down">
        DOWN
      </text>
      <text x="150" y="230" textAnchor="middle" className="stemma-word stemma-under">
        UNDER
      </text>
      <text x="150" y="282" textAnchor="middle" className="stemma-cafe">
        CAFÈ
      </text>
      <text x="150" y="308" textAnchor="middle" className="stemma-since">
        since 2010
      </text>
      <text x="150" y="340" textAnchor="middle" className="stemma-kicker stemma-kicker-wide">
        VANZAGO
      </text>
    </svg>
  );
}
