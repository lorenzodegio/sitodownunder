import { MenuPranzoSettimana } from "@/components/MenuPranzoSettimana";
import { Foglie } from "@/components/Foglie";
import { Polpo } from "@/components/Polpo";
import { site } from "@/content/site";

const bubbles = ["b1", "b2", "b3", "b4", "b5"] as const;

export function Menu() {
  return (
    <section id="menu" className="section-sea section-menu" aria-labelledby="menu-title">
      {bubbles.map((name) => (
        <span key={name} className={`bub bubble ${name}`} aria-hidden="true" />
      ))}
      <Foglie where="menu" />
      <div className="chapter-wrap menu-stage">
        <div className="menu-head">
          <div className="head-copy">
            <span className="kicker kicker-dark">{site.menu.kicker}</span>
            <h2 id="menu-title" className="display">
              {site.menu.title}
            </h2>
          </div>
          <Polpo />
        </div>
        <div className="menu-layout">
          <div>
            <div className="menu-list">
              {site.menu.items.map(([name, text], index) => (
                <div key={name} className="row menu-row">
                  <span className="menu-num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="menu-name">{name}</h3>
                    <p className="menu-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="menu-foot">
              <p>{site.menu.takeaway}</p>
              <div className="split-btn" role="group" aria-label="Menù completo">
                <a href={site.menu.htmlHref}>{site.menu.htmlLabel}</a>
                <a href={site.menu.pdfHref}>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v11" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M5 20h14" />
                  </svg>
                  {site.menu.pdfLabel}
                </a>
              </div>
            </div>
          </div>
          <MenuPranzoSettimana />
        </div>
      </div>
    </section>
  );
}
