import Image from "next/image";
import { Decorazioni } from "@/components/Decorazioni";
import { Murale } from "@/components/Murale";
import { site } from "@/content/site";

const MURALI_GIORNO = [
  {
    src: "/murales/mongolfiera.png",
    alt: "Murale della mongolfiera: Il giro del mondo in 80 giorni, Down Under Cafè Vanzago",
  },
  {
    src: "/murales/faro.png",
    alt: "Murale del faro con il monogramma DUC, Down Under Cafè Vanzago",
  },
  {
    src: "/murales/caverna-duc.png",
    alt: "Murale della caverna con il monogramma DUC, Down Under Cafè Vanzago",
  },
] as const;

export function Giornata() {
  return (
    <section className="section ground-biglietto" aria-labelledby="giornata-title">
      <Decorazioni dove="giornata" />
      <div className="wrap">
        <Murale
          src="/murales/mano-welcome.png"
          alt="Mano del murale che indica welcome, Down Under Cafè Vanzago"
          width={844}
          height={207}
          className="mano-welcome"
        />
        <span className="rib rv">{site.giornata.kicker}</span>
        <h2 id="giornata-title" className="display rv w-900">
          {site.giornata.title}
        </h2>
        <div className="day-grid">
          {site.giornata.cards.map((card) => (
            <article key={card.title} className={`lift rv day ${card.tone}`}>
              <div className="day-time">{card.time}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {card.title === "Ape" ? (
                <a className="day-more" href="#prossimamente">
                  Gli appuntamenti della settimana →
                </a>
              ) : null}
            </article>
          ))}
        </div>
        <div className="photo-row photo-row-tre">
          {MURALI_GIORNO.map((murale) => (
            <div key={murale.src} className="photo-frame rv has-fallback">
              <Image src={murale.src} alt={murale.alt} fill sizes="(max-width: 800px) 90vw, 360px" className="photo-img photo-fallback" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
