import { Decorazioni } from "@/components/Decorazioni";
import { Polpo } from "@/components/Polpo";
import { site } from "@/content/site";
import { getMenuPdfUrl } from "@/lib/blob-archive";

const bubbles = ["b1", "b2", "b3", "b4", "b5"] as const;

export async function Menu() {
  const pdf = await getMenuPdfUrl();
  return (
    <section id="menu" className="section-sea section-menu" aria-labelledby="menu-title">
      {bubbles.map((name) => (
        <span key={name} className={`bub bubble ${name}`} aria-hidden="true" />
      ))}
      <Decorazioni dove="menu" />
      <div className="wrap menu-stage">
        <div className="head">
          <div className="head-copy">
            <span className="rib rv">{site.menu.kicker}</span>
            <h2 id="menu-title" className="display rv">
              {site.menu.title}
            </h2>
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
          {pdf ? (
            <a className="pdf-btn" href={site.menu.pdfHref}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11" />
                <path d="M7 10l5 5 5-5" />
                <path d="M5 20h14" />
              </svg>
              {site.menu.pdfLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
