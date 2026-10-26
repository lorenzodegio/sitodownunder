import { Decorazioni } from "@/components/Decorazioni";
import { site } from "@/content/site";
import { capitolo } from "@/lib/capitoli";

export function Eventi() {
  return (
    <section id="eventi" className="section" aria-labelledby="eventi-title">
      <Decorazioni dove="feste" />
      <div className="wrap eventi-grid">
        <div className="rv">
          <span className="rib">{capitolo("eventi")} · dalla Terra alla Luna</span>
          <h2 id="eventi-title" className="display display-event">
            {site.eventi.title}
          </h2>
          <p className="prose-lg prose-mutedL">{site.eventi.text}</p>
          <div className="chips">
            {site.eventi.tags.map((tag) => (
              <span key={tag} className="pill chip">
                {tag}
              </span>
            ))}
          </div>
          <a className="pill btn-ink" href={site.phone.tel}>
            {site.eventi.cta}
          </a>
        </div>
        <div className="eventi-art" aria-hidden="true">
          <svg className="ink luna" viewBox="0 0 400 400">
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
        </div>
      </div>
    </section>
  );
}
