import type { CSSProperties } from "react";

type Fiocco = {
  left: string;
  size: number;
  duration: string;
  delay: string;
  deriva: string;
  tono: "bianco";
  extra?: boolean;
};

const fiocchi: Fiocco[] = [
  { left: "4%", size: 18, duration: "13s", delay: "-2s", deriva: "16px", tono: "bianco" },
  { left: "11%", size: 26, duration: "17s", delay: "-8s", deriva: "-22px", tono: "bianco" },
  { left: "18%", size: 14, duration: "11s", delay: "-4s", deriva: "12px", tono: "bianco" },
  { left: "26%", size: 22, duration: "15s", delay: "-11s", deriva: "-14px", tono: "bianco" },
  { left: "34%", size: 16, duration: "12s", delay: "-1s", deriva: "20px", tono: "bianco" },
  { left: "42%", size: 28, duration: "18s", delay: "-7s", deriva: "-18px", tono: "bianco" },
  { left: "50%", size: 15, duration: "14s", delay: "-13s", deriva: "10px", tono: "bianco" },
  { left: "58%", size: 24, duration: "16s", delay: "-3s", deriva: "-24px", tono: "bianco" },
  { left: "66%", size: 17, duration: "12s", delay: "-9s", deriva: "18px", tono: "bianco" },
  { left: "74%", size: 21, duration: "15s", delay: "-5s", deriva: "-12px", tono: "bianco" },
  { left: "82%", size: 14, duration: "11s", delay: "-14s", deriva: "14px", tono: "bianco", extra: true },
  { left: "90%", size: 25, duration: "17s", delay: "-6s", deriva: "-16px", tono: "bianco", extra: true },
  { left: "8%", size: 19, duration: "19s", delay: "-16s", deriva: "22px", tono: "bianco", extra: true },
  { left: "22%", size: 13, duration: "10s", delay: "-2.5s", deriva: "-10px", tono: "bianco", extra: true },
  { left: "38%", size: 20, duration: "14s", delay: "-10s", deriva: "16px", tono: "bianco", extra: true },
  { left: "54%", size: 16, duration: "13s", delay: "-4.5s", deriva: "-20px", tono: "bianco", extra: true },
  { left: "70%", size: 23, duration: "16s", delay: "-12s", deriva: "12px", tono: "bianco", extra: true },
  { left: "96%", size: 15, duration: "12s", delay: "-7.5s", deriva: "-8px", tono: "bianco", extra: true },
];

/** Fiocchi sull'intera finestra. Non intercettano i clic. */
export function NeveCaduta() {
  return (
    <div className="neve-caduta" aria-hidden="true">
      {fiocchi.map((fiocco, index) => (
        <svg
          key={index}
          className={fiocco.extra ? `neve-fiocco neve-fiocco-extra ${fiocco.tono}` : `neve-fiocco ${fiocco.tono}`}
          viewBox="0 0 24 24"
          style={
            {
              left: fiocco.left,
              width: fiocco.size,
              animationDuration: fiocco.duration,
              animationDelay: fiocco.delay,
              "--deriva": fiocco.deriva,
            } as CSSProperties
          }
        >
          <path
            d="M12 1.2v21.6M1.2 12h21.6M4.4 4.4l15.2 15.2M19.6 4.4L4.4 19.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
