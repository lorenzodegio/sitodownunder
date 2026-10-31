import { CosaDelGiorno } from "@/components/CosaDelGiorno";
import { Decorazioni } from "@/components/Decorazioni";
import { Dirigibile } from "@/components/Dirigibile";
import { Murale } from "@/components/Murale";
import { NovitaFoto } from "@/components/NovitaFoto";
import { Nuvole } from "@/components/Nuvole";
import { OpeningBadge } from "@/components/OpeningBadge";
import { PhotoFrame } from "@/components/PhotoFrame";
import { SlotFrame } from "@/components/SlotFrame";
import { Stemma } from "@/components/Stemma";
import { site } from "@/content/site";
import { eventiAttivi } from "@/data/eventi";
import { meseNovita, novitaConfermate } from "@/data/novita";
import { theme } from "@/data/theme";
import type { PublicPhoto } from "@/lib/archivio-shared";
import { stagioneAttiva } from "@/lib/season";
import type { SlotVista } from "@/lib/slot-types";

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

export async function Hero({
  novita,
  vista,
  anteprima = false,
}: {
  novita: readonly PublicPhoto[];
  vista: SlotVista;
  anteprima?: boolean;
}) {
  const [lunch, ape, cena, again] = site.hero.lines;
  const stagione = await stagioneAttiva();
  const prima = novitaConfermate()[0] ?? null;
  const mostraFrame = Boolean(prima) || anteprima;

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
          {prima ? (
            <a className="nonna-line" href="#novita">
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
                <span className="nonna-hand-title">Novità di {meseNovita()}</span>
                <span className="nonna-hand-dish">
                  {prima.nome}, {prima.descrizione}. <span>{prima.prezzo}</span>
                </span>
                <span className="nonna-hand-cta">Tutte le novità →</span>
              </span>
            </a>
          ) : stagione?.rigaHero ? (
            <CosaDelGiorno variant="hero" />
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
        {mostraFrame ? (
          <div className="novita-frame in d3">
            <span className="rib">appena sbarcato</span>
            <Dirigibile />
            <SlotFrame
              id="01"
              record={vista.items["01"] ?? null}
              indicazioni={vista.indicazioni || anteprima}
              priority
              sizes="(max-width: 800px) 90vw, 460px"
            />
            <div className="novita-cap">
              <b>{prima?.nome ?? "[Nome della novità]"}</b>
              <span>{prima?.descrizione ?? "[una riga che la racconta]"}</span>
            </div>
          </div>
        ) : (
        <div className="hero-side in d3">
        <div className="crest">
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
          <div className="hero-novita">
            {novita.length ? (
              novita.map((photo) => <NovitaFoto key={photo.src} photo={photo} tone="light" />)
            ) : (
              <PhotoFrame photo={{ src: null, label: "novità del mese", ratio: "portrait", radius: 20, tone: "light" }} />
            )}
          </div>
        </div>
        )}
      </div>
      <Nuvole color={eventiAttivi().length ? theme.carta : theme.fondo} />
    </section>
  );
}
