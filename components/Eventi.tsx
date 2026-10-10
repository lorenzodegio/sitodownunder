import { PhotoFrame } from "@/components/PhotoFrame";
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
    <section id="eventi" className="section section-sea">
      <svg className="skyline" aria-hidden="true" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
        <g fill="#F4F0E6">
          {stars.map(([cx, cy, r, delay]) => (
            <circle key={`${cx}-${cy}`} className="tw" style={delay ? { animationDelay: delay } : undefined} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      </svg>
      <div className="wrap eventi-grid">
        <div className="rv">
          <span className="rib">{site.eventi.kicker}</span>
          <h2 className="display display-event">{site.eventi.title}</h2>
          <p className="prose-lg prose-mutedD">{site.eventi.text}</p>
          <div className="chips">
            {site.eventi.tags.map((tag) => (
              <span key={tag} className="pill chip">
                {tag}
              </span>
            ))}
          </div>
          <a className="pill btn-solid" href={site.phone.tel}>
            {site.eventi.cta}
          </a>
        </div>
        <div className="rv eventi-art">
          <svg className="ink luna" aria-hidden="true" viewBox="0 0 400 400">
            <circle className="w luna-disc" cx="200" cy="200" r="118" />
            <circle cx="160" cy="160" r="22" />
            <circle cx="244" cy="214" r="30" />
            <circle cx="176" cy="254" r="14" />
            <circle cx="250" cy="136" r="10" />
            <path d="M150 154c6-8 16-10 22-6M232 204c8-8 22-8 30 0" />
            <g className="spin orbit">
              <ellipse cx="200" cy="200" rx="178" ry="178" />
              <path className="w rocket" d="M186 30h28v-14c0-12-28-12-28 0zM186 30h28v26h-28zM180 56h40M192 40h16" />
            </g>
          </svg>
          <div className="buffet-slot">
            <PhotoFrame photo={site.photos.buffet} />
          </div>
        </div>
      </div>
    </section>
  );
}
