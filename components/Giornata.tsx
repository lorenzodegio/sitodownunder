import { Decorazioni } from "@/components/Decorazioni";
import { Murale } from "@/components/Murale";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PhotoStrip } from "@/components/PhotoStrip";
import { site, type Photo } from "@/content/site";
import type { PublicPhoto } from "@/lib/archivio-shared";

function merge(photo: Photo, live: PublicPhoto | undefined): Photo {
  if (!live) return photo;
  return { ...photo, src: live.src, label: live.alt };
}

function MomentoFoto({ photos, fallback }: { photos: readonly PublicPhoto[]; fallback: string }) {
  return (
    <div className="day-photos">
      {photos.length ? (
        photos.map((photo) => (
          <PhotoFrame
            key={photo.src}
            photo={{ src: photo.src, label: photo.alt, ratio: "landscape", radius: 20 }}
          />
        ))
      ) : (
        <PhotoFrame photo={{ src: null, label: fallback, ratio: "landscape", radius: 20 }} />
      )}
    </div>
  );
}

export function Giornata({
  burger,
  pizza,
  bancone,
  lunch,
}: {
  burger: readonly PublicPhoto[];
  pizza: readonly PublicPhoto[];
  bancone: readonly PublicPhoto[];
  lunch: readonly PublicPhoto[];
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
          {site.giornata.cards.filter((card) => card.title !== "Ape").map((card) => (
            <article key={card.title} className={`lift rv day is-wide ${card.tone}`}>
              <div className="day-foot">
              <div className="day-time">{card.time}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {card.title === "Cena" ? <p className="day-speciali">Pulled pork, tartare e roastbeef.</p> : null}
              </div>
              {card.title === "Pranzo" ? <MomentoFoto photos={lunch} fallback="foto pranzo" /> : null}
              {card.title === "Cena" ? <MomentoFoto photos={burger} fallback="foto burger" /> : null}
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
