import { site } from "@/content/site";

export function Pranzo() {
  return (
    <section id="pranzo" className="section-tight">
      <div className="wrap sheet-ink">
        <div className="head">
          <div className="head-copy">
            <span className="rib rv">{site.pranzo.kicker}</span>
            <h2 className="display rv w-820">{site.pranzo.title}</h2>
            <p className="sub rv w-600 on-dark">{site.pranzo.lead}</p>
          </div>
          <svg className="ink bussola" aria-hidden="true" viewBox="0 0 160 200">
            <path d="M80 38V22M66 22h28" />
            <circle cx="80" cy="14" r="8" />
            <circle className="w" cx="80" cy="116" r="74" />
            <circle cx="80" cy="116" r="62" />
            <path d="M80 60v10M80 162v10M24 116h10M126 116h10" />
            <path d="M80 116V84" />
            <g className="spin fast needle">
              <path d="M80 116V66" />
            </g>
            <circle className="k" cx="80" cy="116" r="5" />
          </svg>
        </div>
        <div className="pranzo-grid">
          <div className="rv price-card">
            <div className="eyebrow">{site.pranzo.fixed.eyebrow}</div>
            <div className="price">{site.pranzo.fixed.price}</div>
            <p className="muted">{site.pranzo.fixed.includes}</p>
            <p className="vouchers">{site.pranzo.fixed.vouchers}</p>
          </div>
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
