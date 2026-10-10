export function Polpo() {
  return (
    <svg
      className="sway polpo"
      aria-hidden="true"
      viewBox="0 0 360 300"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <path
          id="tn"
          d="M112 150c-30 20-72 8-82 48s30 52 46 30M136 165c-20 40-62 50-56 90s42 30 40 8M166 172c-6 40-30 70-14 100s40 10 30-12M196 172c6 40 30 70 14 100s-40 10-30-12M226 165c20 40 62 50 56 90s-42 30-40 8M250 150c30 20 72 8 82 48s-30 52-46 30"
        />
      </defs>
      <use href="#tn" stroke="#F4F0E6" strokeWidth="15" />
      <use href="#tn" stroke="#1E282B" strokeWidth="9.5" />
      <path
        d="M108 160C92 84 136 26 181 26s89 58 73 134c-20 18-126 18-146 0z"
        fill="#1E282B"
        stroke="#F4F0E6"
        strokeWidth="2.8"
      />
      <circle cx="158" cy="118" r="11" fill="#1E282B" stroke="#F4F0E6" strokeWidth="2.8" />
      <circle cx="204" cy="118" r="11" fill="#1E282B" stroke="#F4F0E6" strokeWidth="2.8" />
      <circle cx="160" cy="120" r="4" fill="#F4F0E6" />
      <circle cx="206" cy="120" r="4" fill="#F4F0E6" />
      <path d="M140 60c10-12 26-18 40-18M128 84c2-6 4-10 8-14" stroke="#F4F0E6" strokeWidth="2.4" />
      <text x="181" y="296" textAnchor="middle" className="polpo-caption">
        Jules Verne · 1870
      </text>
    </svg>
  );
}
