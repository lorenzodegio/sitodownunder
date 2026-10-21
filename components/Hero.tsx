import { Decorazioni } from "@/components/Decorazioni";
import { Dirigibile } from "@/components/Dirigibile";
import { Murale } from "@/components/Murale";
import { Nuvole } from "@/components/Nuvole";
import { OpeningBadge } from "@/components/OpeningBadge";
import { Stemma } from "@/components/Stemma";
import { site } from "@/content/site";
import { eventoInHero } from "@/data/eventi";
import { theme } from "@/data/theme";
import { stagioneAttiva } from "@/lib/season";

const stars = [
  [90, 80, 2.4, ""],
  [310, 40, 1.8, ".6s"],
  [520, 110, 2.2, "1.2s"],
  [700, 50, 1.6, ".3s"],
  [930, 90, 2.4, "1.8s"],
  [1150, 40, 1.8, ".9s"],
  [1320, 130, 2.2, "1.5s"],
  [620, 300, 1.6, "2.1s"],
  [60, 360, 1.8, ".4s"],
] as const;

export async function Hero() {
  const [lunch, ape, cena, again] = site.hero.lines;
  const stagione = await stagioneAttiva();
  const spinta = eventoInHero();
  const mostraRiga = Boolean(stagione?.rigaHero && spinta);

  return (
    <section className="hero">
      <svg className="skyline" aria-hidden="true" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
        <g fill="var(--fondo)">
          {stars.map(([cx, cy, r, delay]) => (
            <circle key={`${cx}-${cy}`} className="tw" style={delay ? { animationDelay: delay } : undefined} cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <path
          className="dash"
          d="M-20 470C240 380 420 520 700 360S1180 180 1420 250"
          fill="none"
          stroke="var(--fondo)"
          strokeOpacity={0.35}
          strokeWidth={2}
          strokeDasharray="6 10"
          strokeLinecap="round"
        />
      </svg>
      <Decorazioni dove="hero" />
      <div className="hero-grid">
        <div>
          <OpeningBadge />
          <h1 className="hero-h1">Burger, pizza e aperitivo a Vanzago</h1>
          <p className="hero-title">
            <span className="in d1">{lunch}</span>
            <span className="in d2 stroke">{ape}</span>
            <span className="in d3">{cena}</span>
            <span className="in d4 soft">{again}</span>
          </p>
          {mostraRiga && spinta ? (
            <a className="nonna-line" href="#prossimamente">
              <Murale
                src="/murales/mano-welcome.png"
                alt=""
                decorative
                width={844}
                height={207}
                invert
                className="nonna-hand"
              />
              <span>
                <span className="nonna-hand-title">
                  {spinta.oggi ? "Stasera, dalla nonna." : "…e a novembre, il martedì, dalla nonna."}
                </span>
                <span className="nonna-hand-dish">
                  {spinta.oggi ? null : <>{spinta.day.label}: </>}
                  <strong>{spinta.day.piatto}</strong> · <span>{spinta.day.prezzo}</span>
                </span>
                <span className="nonna-hand-cta">Scopri i martedì della nonna →</span>
              </span>
            </a>
          ) : null}
          <p className="hero-lead in d4">{site.hero.lead}</p>
          <div className="hero-actions in d5">
            <a className="pill btn-solid" href={site.phone.tel}>
              {site.hero.primaryCta}
            </a>
            <a className="pill btn-ghost" href={site.hero.secondaryHref}>
              {site.hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="crest in d3">
          <svg className="spin crest-ring" aria-hidden="true" viewBox="0 0 400 400">
            <defs>
              <path id="ring" d="M200 200m-182 0a182 182 0 1 1 364 0a182 182 0 1 1 -364 0" />
            </defs>
            <text className="ring-text">
              <textPath href="#ring">{site.hero.ring}</textPath>
            </text>
          </svg>
          <Stemma />
          <Dirigibile />
          <svg className="ink spin gear" aria-hidden="true" viewBox="0 0 100 100">
            <circle className="gear-ring" cx="50" cy="50" r="34" />
            <circle cx="50" cy="50" r="12" />
          </svg>
        </div>
      </div>
      <Nuvole color={spinta ? theme.carta : theme.fondo} />
    </section>
  );
}
