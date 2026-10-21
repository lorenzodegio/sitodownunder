import { Foglie } from "@/components/Foglie";
import { MenuPranzoSettimana } from "@/components/MenuPranzoSettimana";
import { Murale } from "@/components/Murale";
import { site } from "@/content/site";

export function Pranzo() {
  return (
    <section id="pranzo" className="section-tight" aria-labelledby="pranzo-title">
      <Foglie where="pranzo" />
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
