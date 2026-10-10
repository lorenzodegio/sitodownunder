import { site } from "@/content/site";

export function Serate() {
  return (
    <section id="serate" className="section">
      <div className="wrap">
        <span className="rib rv">{site.serate.kicker}</span>
        <h2 className="display rv">{site.serate.title}</h2>
        <p className="sub rv w-560 muted">{site.serate.lead}</p>
        <div className="night-grid">
          {site.serate.nights.map((night) => (
            <article key={night.title} className={`lift rv night ${night.surface === "ink" ? "ink" : ""}`}>
              <span className={`tag tag-${night.tag}`}>{night.day}</span>
              <h3>{night.title}</h3>
              {"dishes" in night ? (
                <>
                  <p className="night-text">{night.text}</p>
                  <div className="dishes">
                    {night.dishes.map((dish) => (
                      <div key={dish}>{dish}</div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="night-text flat">{night.text}</p>
              )}
            </article>
          ))}
        </div>
        <p className="footnote rv">{site.serate.note}</p>
      </div>
    </section>
  );
}
