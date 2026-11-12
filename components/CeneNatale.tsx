import Link from "next/link";
import { caveat } from "@/components/duc-font";
import { messaggioNatale, natale } from "@/data/natale";
import { site } from "@/content/site";
import { nataleAttivo } from "@/lib/natale";
import { whatsappLink } from "@/lib/whatsapp";

const ROSSO = "#B5372E";
const SCURO = "#8E2A23";
const BURRO = "#F3DFA2";
const VERDE = "#2F6B4F";
const CICLO = [ROSSO, BURRO, VERDE, BURRO];

const luci: Array<[number, number]> = [
  [20, 15],
  [80, 19],
  [140, 22],
  [200, 25],
  [260, 27],
  [320, 29],
  [380, 31],
  [440, 33],
  [500, 34],
  [560, 35],
  [620, 36],
  [680, 36],
  [740, 36],
  [800, 36],
  [860, 35],
  [920, 34],
  [980, 33],
  [1040, 32],
  [1100, 30],
  [1160, 28],
  [1220, 25],
  [1280, 23],
  [1340, 20],
  [1400, 16],
];

const tilt = ["natale-tilt-a", "natale-tilt-b", "natale-tilt-c"];

function Fiocco() {
  return (
    <svg className="natale-fiocco" aria-hidden="true" viewBox="0 0 120 70">
      <path d="M60 36C44 14 14 6 8 22s22 26 52 14z" fill={ROSSO} stroke={SCURO} strokeWidth="2" />
      <path d="M60 36C76 14 106 6 112 22s-22 26-52 14z" fill={ROSSO} stroke={SCURO} strokeWidth="2" />
      <path d="M56 40l-14 28M64 40l14 28" stroke={ROSSO} strokeWidth="9" strokeLinecap="round" />
      <rect x="51" y="28" width="18" height="16" rx="5" fill={SCURO} />
    </svg>
  );
}

function WhatsApp() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#FFFCF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.4-1.6-1-2-2l1-1-1-2z" />
    </svg>
  );
}

export function CeneNatale() {
  if (!nataleAttivo()) return null;

  return (
    <section id="natale" className={`${caveat.variable} natale`} aria-labelledby="natale-title">
      <svg className="natale-luci" aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="xMidYMin slice">
        <path d="M0 2 Q720 58 1440 2" fill="none" stroke="#F6EFDF" strokeOpacity="0.35" strokeWidth="1.6" />
        {luci.map(([x, y], index) => (
          <g key={x} transform={`translate(${x} ${y - 8})`}>
            <rect x="-3" y="-2" width="6" height="5" rx="1" fill="#F6EFDF" opacity="0.5" />
            <ellipse
              className="natale-lampadina"
              cx="0"
              cy="10"
              rx="5.5"
              ry="8"
              fill={CICLO[index % CICLO.length]}
              style={{
                animationDuration: `${1.1 + (index % 5) * 0.35}s`,
                animationDelay: `${(index % 7) * 0.17}s`,
              }}
            />
          </g>
        ))}
      </svg>
      <svg className="natale-mongolfiera" aria-hidden="true" viewBox="0 0 300 300" fill="none" stroke="#F6EFDF" strokeOpacity="0.09" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M150 20c-60 0-100 42-100 96c0 46 40 82 70 112h60c30-30 70-66 70-112c0-54-40-96-100-96z" />
        <path d="M150 20c-26 24-36 60-36 96s16 78 36 112M150 20c26 24 36 60 36 96s-16 78-36 112M50 116h200" />
        <path d="M120 228l12 40M180 228l-12 40" />
        <rect x="124" y="268" width="52" height="30" rx="6" />
      </svg>
      <svg className="natale-albero" aria-hidden="true" viewBox="0 0 200 260" fill="none" stroke="#F6EFDF" strokeOpacity="0.09" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 10l-50 76h26l-44 64h30l-48 72h172l-48-72h30l-44-64h26z" />
        <path d="M100 222v30M84 252h32" />
      </svg>

      <div className="natale-wrap">
        <div className="natale-testa">
          <div>
            <p className="natale-kicker">Natale a bordo</p>
            <h2 id="natale-title" className="natale-title">
              <span className="natale-soft">Il giro del Natale</span>
              <span className="natale-hard">in tre menù</span>
            </h2>
            <p className="natale-lead">{natale.sottotitolo}</p>
          </div>
          <p className="natale-condizioni">{natale.condizioni}</p>
        </div>

        <div className="natale-grid">
          {natale.proposte.map((proposta, index) => (
              <article key={proposta.id} className={`natale-card ${tilt[index] ?? ""}`}>
                <div className="natale-nastro" aria-hidden="true" />
                <Fiocco />
                <p className="natale-proposta">Proposta {proposta.numero}</p>
                <h3>{proposta.nome}</h3>
                <p className="natale-frase">{proposta.frase}</p>
                <ul>
                  {proposta.voci.map((voce, voceIndex) => (
                    <li key={voce}>
                      <span className="natale-segno" aria-hidden="true">
                        {voceIndex > 0 ? "+" : ""}
                      </span>
                      <span>{voce}</span>
                    </li>
                  ))}
                </ul>
                <div className="natale-piede">
                  <p className="natale-prezzo">
                    <span>
                      {proposta.prezzo}
                      {"\u00a0"}€
                    </span>
                    <small>
                      a<br />
                      persona
                    </small>
                  </p>
                  <a className="natale-book" href={whatsappLink(messaggioNatale(proposta.nome))}>
                    <WhatsApp />
                    Prenota questa
                  </a>
                </div>
              </article>
          ))}
        </div>

        <div className="natale-azioni">
          <a className="natale-info" href={site.phone.tel}>
            Chiedi info · {site.phone.display}
          </a>
          <Link className="natale-dettagli" href="/cene-di-natale">
            Tutti i dettagli sulla pagina Cene di Natale →
          </Link>
        </div>
      </div>
    </section>
  );
}
