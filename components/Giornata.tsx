import { Murale } from "@/components/Murale";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PhotoStrip } from "@/components/PhotoStrip";
import { site, type Photo } from "@/content/site";
import type { PublicPhoto } from "@/lib/archivio-shared";

function merge(photo: Photo, live: PublicPhoto | undefined): Photo {
  if (!live) return photo;
  return { ...photo, src: live.src, label: live.alt };
}

export function Giornata({
  burger,
  pizza,
  bancone,
}: {
  burger: readonly PublicPhoto[];
  pizza: readonly PublicPhoto[];
  bancone: readonly PublicPhoto[];
}) {
  const shots = [
    merge(site.photos.burger, burger[0]),
    merge(site.photos.pizza, pizza[0]),
    merge(site.photos.bancone, bancone[0]),
  ];
  const extra = [...burger.slice(1), ...pizza.slice(1), ...bancone.slice(1)];

  return (
    <section className="section" aria-labelledby="giornata-title">
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
              <h3>{card.title}</h3>
              <p>{card.text}</p>
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
