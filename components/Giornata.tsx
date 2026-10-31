import Image from "next/image";
import { Decorazioni } from "@/components/Decorazioni";
import { Murale } from "@/components/Murale";
import { SlotFrame } from "@/components/SlotFrame";
import { site } from "@/content/site";
import type { SlotVista } from "@/lib/slot-types";

export function Giornata({ vista }: { vista: SlotVista }) {
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
                  I format della settimana →
                </a>
              ) : null}
            </article>
          ))}
        </div>
        <div className="photo-row photo-row-tre">
          <SlotFrame id="08" record={vista.items["08"] ?? null} indicazioni={vista.indicazioni} className="rv" sizes="(max-width: 800px) 90vw, 360px" />
          <div className="photo-frame rv rot-p1 has-fallback">
            <Image
              src="/murales/faro.png"
              alt="Murale del faro con il monogramma DUC, Down Under Cafè Vanzago"
              fill
              sizes="(max-width: 800px) 90vw, 360px"
              className="photo-img photo-fallback"
            />
          </div>
          <SlotFrame id="09" record={vista.items["09"] ?? null} indicazioni={vista.indicazioni} className="rv" sizes="(max-width: 800px) 90vw, 360px" />
        </div>
      </div>
    </section>
  );
}
