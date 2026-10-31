import { Decorazioni } from "@/components/Decorazioni";
import { MenuPranzoSettimana } from "@/components/MenuPranzoSettimana";
import { Murale } from "@/components/Murale";
import { SlotFrame } from "@/components/SlotFrame";
import { site } from "@/content/site";
import type { SlotVista } from "@/lib/slot-types";

const TAPPE = [
  { id: "10", nastro: "0' · si salpa", titolo: "Tavolo pronto", testo: "Siete in tanti? Scrivici in mattinata." },
  { id: "11", nastro: "10' · il primo", titolo: "Il primo", testo: "Cambia ogni giorno, lo trovi qui sotto." },
  { id: "12", nastro: "30' · il secondo", titolo: "Secondo e contorno", testo: "Verdure, insalata o patatine: scegli tu." },
  { id: "13", nastro: "60' · si rientra", titolo: "Caffè e via", testo: "Giro del mondo completato, Fogg muto." },
] as const;

export function Pranzo({ vista }: { vista: SlotVista }) {
  return (
    <section id="pranzo" className="section-tight ground-biglietto" aria-labelledby="pranzo-title">
      <Decorazioni dove="pranzo" />
      <div className="wrap sheet-ink">
        <div className="head">
          <div className="head-copy">
            <span className="rib rv">{site.pranzo.kicker}</span>
            <h2 id="pranzo-title" className="display rv w-820">
              {site.pranzo.title}
            </h2>
            <p className="sub rv w-600 on-dark">{site.pranzo.lead}</p>
          </div>
          <Murale
            src="/murales/mongolfiera.png"
            alt="Murale della mongolfiera: Il giro del mondo in 80 giorni, Down Under Cafè Vanzago"
            width={775}
            height={907}
            invert
            className="mongolfiera"
          />
        </div>
        <div className="tappe">
          {TAPPE.map((tappa) => (
            <div key={tappa.id} className="tappa">
              <span className="rib">{tappa.nastro}</span>
              <SlotFrame
                id={tappa.id}
                record={vista.items[tappa.id] ?? null}
                indicazioni={vista.indicazioni}
                sizes="(max-width: 860px) 45vw, 260px"
              />
              <h3>{tappa.titolo}</h3>
              <p>{tappa.testo}</p>
            </div>
          ))}
        </div>
        <div className="pranzo-grid">
          <MenuPranzoSettimana />
          <div className="stack">
            {site.pranzo.features.map((feature) => (
              <article key={feature.title} className="rv feature">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="cta-row rv">
          <a className="pill btn-solid" href={site.phone.whatsapp}>
            {site.pranzo.whatsappCta}
          </a>
          <a className="pill btn-ghost" href={site.phone.tel}>
            {site.pranzo.takeawayCta}
          </a>
        </div>
      </div>
    </section>
  );
}
