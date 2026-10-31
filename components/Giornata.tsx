import { Decorazioni } from "@/components/Decorazioni";
import { Murale } from "@/components/Murale";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PhotoStrip } from "@/components/PhotoStrip";
import { site, type Photo } from "@/content/site";
import { aperitivoDomenica, whatsappAperitivoGruppo } from "@/data/format";
import type { PublicPhoto } from "@/lib/archivio-shared";

function merge(photo: Photo, live: PublicPhoto | undefined): Photo {
  if (!live) return photo;
  return { ...photo, src: live.src, label: live.alt };
}

function MomentoFoto({ photos, fallback }: { photos: readonly PublicPhoto[]; fallback: string }) {
  const scelte = photos.slice(0, 3);
  const vuoti = scelte.length ? [] : [0, 1, 2];
  return (
    <div className="day-photos">
      {scelte.map((photo) => (
        <PhotoFrame
          key={photo.src}
          photo={{ src: photo.src, label: photo.alt, ratio: "landscape", radius: 20 }}
        />
      ))}
      {vuoti.map((slot) => (
        <PhotoFrame key={`${fallback}-${slot}`} photo={{ src: null, label: fallback, ratio: "landscape", radius: 20 }} />
      ))}
    </div>
  );
}

export function Giornata({
  burger,
  pizza,
  bancone,
  lunch,
  aperitivo,
}: {
  burger: readonly PublicPhoto[];
  pizza: readonly PublicPhoto[];
  bancone: readonly PublicPhoto[];
  lunch: readonly PublicPhoto[];
  aperitivo: readonly PublicPhoto[];
}) {
  const shots = [
    merge(site.photos.burger, burger[0]),
    merge(site.photos.pizza, pizza[0]),
    merge(site.photos.bancone, bancone[0]),
  ];
  const extra = [...burger.slice(1), ...pizza.slice(1), ...bancone.slice(1)];

  return (
    <section className="section ground-biglietto" aria-labelledby="giornata-title">
      <Decorazioni dove="giornata" />
      <div className="wrap">
        <Murale
          src="/murales/mano-welcome.png"
          alt="Mano del murale che indica welcome, Down Under Cafè Vanzago"
          width={844}
          height={207}
          className="mano-welcome"
        />
        <span className="rib rv">{site.giornata.kicker}</span>
        <h2 id="giornata-title" className="display rv w-900">
          {site.giornata.title}
        </h2>
        <div className="day-grid">
          {site.giornata.cards.map((card) => (
            <article key={card.title} className={`lift rv day ${card.tone}`}>
              <div className="day-time">{card.time}</div>
              {card.title === "Lunch" ? <MomentoFoto photos={lunch} fallback="foto pranzo" /> : null}
              {card.title === "Cena" ? <MomentoFoto photos={burger} fallback="foto burger" /> : null}
              <div className="day-foot">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {card.title === "Cena" ? <p className="day-speciali">Pulled pork, tartare e roastbeef.</p> : null}
              {card.title === "Ape" ? (
                <>
                  <div className="ape-domenica">
                    <div className="ape-foto">
                      <PhotoFrame
                        photo={{
                          src: aperitivo[0]?.src ?? null,
                          label: aperitivo[0]?.alt ?? "foto aperitivo",
                          ratio: "landscape",
                          radius: 20,
                          tone: "light",
                        }}
                      />
                    </div>
                    <p className="ape-etichetta">{aperitivoDomenica.etichetta}</p>
                    <p className="ape-offerta">{aperitivoDomenica.offerta}</p>
                    <p>
                      {aperitivoDomenica.include}, <span className="ape-prezzo">{aperitivoDomenica.prezzo}</span>.
                    </p>
                    <p className="ape-gruppi">
                      {aperitivoDomenica.gruppi}{" "}
                      <a href={whatsappAperitivoGruppo}>Prenota</a>
                    </p>
                  </div>
                  <a className="day-more" href="#prossimamente">
                    I format della settimana →
                  </a>
                </>
              ) : null}
              </div>
            </article>
          ))}
        </div>
        <div className="photo-row">
          {shots.map((photo) => (
            <PhotoFrame key={photo.label} photo={photo} />
          ))}
          <article className="centro-tile rv">
            <Murale
              src="/murales/centro-terra.png"
              alt="Lettering del murale: Voyage au centre de la Terre, Down Under Cafè Vanzago"
              width={375}
              height={374}
              invert
              className="centro-img"
            />
          </article>
        </div>
        <PhotoStrip photos={extra} />
      </div>
    </section>
  );
}
