import { Decorazioni } from "@/components/Decorazioni";
import { Polpo } from "@/components/Polpo";
import { SlotFrame } from "@/components/SlotFrame";
import { site } from "@/content/site";
import { getMenuPdfUrl } from "@/lib/blob-archive";
import type { SlotVista } from "@/lib/slot-types";

const bubbles = ["b1", "b2", "b3", "b4", "b5"] as const;

export async function Menu({ vista }: { vista: SlotVista }) {
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
          {site.menu.items.map((item, index) => {
            const foto = "slots" in item ? item.slots : null;
            return (
              <div key={item.name} className={foto ? "row rv menu-row is-spinta has-photo" : "row rv menu-row"}>
                <span className="menu-num">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="menu-name">{item.name}</h3>
                {item.text ? (
                  <p className="menu-text">
                    {item.text}{" "}
                    {"link" in item ? (
                      <a className="spinta-link" href={item.link.href}>
                        {item.link.label} →
                      </a>
                    ) : null}
                  </p>
                ) : null}
                {"sotto" in item && item.sotto ? <p className="menu-sotto">{item.sotto}</p> : null}
                {foto ? (
                  <>
                    <div className="spinta-thumbs">
                      {foto.thumbs.map((id) => (
                        <SlotFrame
                          key={id}
                          id={id}
                          record={vista.items[id] ?? null}
                          indicazioni={vista.indicazioni}
                          sizes="120px"
                        />
                      ))}
                    </div>
                    <div className="spinta-main">
                      <SlotFrame
                        id={foto.main}
                        record={vista.items[foto.main] ?? null}
                        indicazioni={vista.indicazioni}
                        sizes="(max-width: 860px) 100vw, 380px"
                      />
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
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
