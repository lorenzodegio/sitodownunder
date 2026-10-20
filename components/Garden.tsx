import { PhotoFrame } from "@/components/PhotoFrame";
import { PhotoStrip } from "@/components/PhotoStrip";
import { site } from "@/content/site";
import type { PublicPhoto } from "@/lib/archivio-shared";

export function Garden({ photos }: { photos: readonly PublicPhoto[] }) {
  const frame = photos[0] ? { ...site.photos.garden, src: photos[0].src, label: photos[0].alt } : site.photos.garden;

  return (
    <section id="garden" className="section-tight" aria-labelledby="garden-title">
      <div className="wrap sheet-garden">
        <svg className="ink spin rosa" aria-hidden="true" viewBox="0 0 120 120">
          <circle className="w" cx="60" cy="60" r="54" />
          <circle cx="60" cy="60" r="42" />
          <path className="k" d="M60 14l9 37l37 9l-37 9l-9 37l-9-37l-37-9l37-9z" />
        </svg>
        <PhotoFrame photo={frame} />
        <div className="rv">
          <span className="rib">{site.garden.kicker}</span>
          <h2 id="garden-title" className="display display-md">
            {site.garden.title}
          </h2>
          <p className="prose-lg prose-mutedL">{site.garden.text}</p>
        </div>
      </div>
      <PhotoStrip photos={photos.slice(1)} />
    </section>
  );
}
