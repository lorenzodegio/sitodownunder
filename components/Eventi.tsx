import { Foglie } from "@/components/Foglie";
import { Murale } from "@/components/Murale";
import { flyers } from "@/data/murales";
import { site } from "@/content/site";

const stars = [
  [120, 90, 2.2, ""],
  [420, 520, 1.8, ".8s"],
  [760, 70, 2.4, "1.6s"],
  [1040, 540, 1.8, ".4s"],
  [1300, 80, 2.2, "1.2s"],
  [620, 300, 1.6, "2s"],
] as const;

export function Eventi() {
  return (
    <section id="eventi" className="section-sea chapter" aria-labelledby="eventi-title">
      <svg className="skyline" aria-hidden="true" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
        <g fill="#F4F0E6">
          {stars.map(([cx, cy, r, delay]) => (
            <circle key={`${cx}-${cy}`} className="tw" style={delay ? { animationDelay: delay } : undefined} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      </svg>
      <Foglie where="feste" />
      <div className="chapter-wrap feste-grid">
        <div>
          <span className="kicker kicker-dark">{site.eventi.kicker}</span>
          <h2 id="eventi-title" className="display">
            {site.eventi.title}
          </h2>
          <p className="feste-lead">{site.eventi.text}</p>
          <div className="chips">
            {site.eventi.tags.map((tag) => (
              <span key={tag} className="pill chip">
                {tag}
              </span>
            ))}
          </div>
          <div className="feste-cta">
            <a className="pill btn-solid" href={site.eventi.ctaHref}>
              {site.eventi.cta}
            </a>
            <Murale
              src="/murales/camaleonte.png"
              alt=""
              decorative
              width={463}
              height={204}
              invert
              className="feste-yo"
            />
          </div>
        </div>
        <div className="flyer-fan" aria-label="Volantini del 22 novembre 2010">
          <span className="nastro">Dall&apos;archivio · 22 novembre 2010</span>
          {flyers.map((flyer) => (
            <Murale
              key={flyer.src}
              src={flyer.src}
              alt={flyer.alt}
              width={flyer.width}
              height={flyer.height}
              className={flyer.className}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
