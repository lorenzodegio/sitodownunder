import { Polpo } from "@/components/Polpo";
import { site } from "@/content/site";

const bubbles = ["b1", "b2", "b3", "b4", "b5"] as const;

export function Menu() {
  return (
    <section id="menu" className="section-sea section-menu">
      {bubbles.map((name) => (
        <span key={name} className={`bub bubble ${name}`} aria-hidden="true" />
      ))}
      <div className="wrap menu-stage">
        <div className="head">
          <div className="head-copy">
            <span className="rib rv">{site.menu.kicker}</span>
            <h2 className="display rv">{site.menu.title}</h2>
          </div>
          <Polpo />
        </div>
        <div className="menu-list">
          {site.menu.items.map(([name, text], index) => (
            <div key={name} className="row rv menu-row">
              <span className="menu-num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="menu-name">{name}</h3>
              <p className="menu-text">{text}</p>
            </div>
          ))}
        </div>
        <div className="menu-foot rv">
          <p>{site.menu.takeaway}</p>
          <a className="pill btn-solid" href={site.menu.pdfHref}>
            {site.menu.pdfLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
