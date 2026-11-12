import Link from "next/link";
import { caveat } from "@/components/duc-font";
import { messaggioNatale, natale } from "@/data/natale";
import { site } from "@/content/site";
import { nataleAttivo } from "@/lib/natale";
import { whatsappLink } from "@/lib/whatsapp";

export function CeneNatale() {
  if (!nataleAttivo()) return null;

  return (
    <section id="natale" className={`${caveat.variable} natale`} aria-labelledby="natale-title">
      <svg className="natale-luci" aria-hidden="true" viewBox="0 0 1200 72">
        <path d="M-10 18C90 58 190 0 290 28S490 62 590 24 790 0 890 30 1090 64 1210 16" />
        {[80, 200, 320, 440, 560, 680, 800, 920, 1040].map((cx) => (
          <g key={cx} transform={`translate(${cx} 34)`}>
            <path d="M0-16v10" />
            <circle cx="0" cy="2" r="7" />
          </g>
        ))}
      </svg>
      <svg className="natale-stelle" aria-hidden="true" viewBox="0 0 1200 640">
        <path d="M40 80l8 18 18 8-18 8-8 18-8-18-18-8 18-8z" />
        <path d="M1120 140l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" />
        <path d="M180 520l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" />
        <path d="M980 480l7 16 16 7-16 7-7 16-7-16-16-7 16-7z" />
      </svg>
      <div className="natale-wrap">
        <p className="natale-kicker">Natale a bordo</p>
        <h2 id="natale-title" className="natale-title">
          <span className="natale-soft">Il giro del Natale</span>
          <span className="natale-hard">in tre menù</span>
        </h2>
        <p className="natale-lead">{natale.sottotitolo}</p>
        <p className="natale-condizioni">{natale.condizioni}</p>
        <div className="natale-grid">
          {natale.proposte.map((proposta) => {
            const semplice = proposta.numero === "III";
            return (
              <article key={proposta.id} className="natale-card">
                <p className="natale-proposta">Proposta {proposta.numero}</p>
                <h3>{proposta.nome}</h3>
                <p className="natale-frase">{proposta.frase}</p>
                <ul>
                  {proposta.voci.map((voce, index) => (
                    <li key={voce}>{!semplice && index > 0 ? `+ ${voce}` : voce}</li>
                  ))}
                </ul>
                {"incluso" in proposta ? <p className="natale-incluso">{proposta.incluso}</p> : null}
                <p className="natale-prezzo">
                  <span>{proposta.prezzo} €</span>
                  <small>a persona</small>
                </p>
                <a className="natale-book" href={whatsappLink(messaggioNatale(proposta.nome))}>
                  Prenota questa
                </a>
              </article>
            );
          })}
        </div>
        <div className="natale-azioni">
          <a className="natale-info" href={site.phone.tel}>
            Chiedi info
          </a>
          <Link className="natale-dettagli" href="/cene-di-natale">
            Tutti i dettagli
          </Link>
        </div>
      </div>
    </section>
  );
}
