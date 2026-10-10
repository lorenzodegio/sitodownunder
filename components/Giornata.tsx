import { PhotoFrame } from "@/components/PhotoFrame";
import { site } from "@/content/site";

const shots = [site.photos.burger, site.photos.pizza, site.photos.bancone, site.photos.murales] as const;

export function Giornata() {
  return (
    <section className="section">
      <div className="wrap">
        <span className="rib rv">{site.giornata.kicker}</span>
        <h2 className="display rv w-900">{site.giornata.title}</h2>
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
        </div>
      </div>
    </section>
  );
}
