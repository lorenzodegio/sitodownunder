import Image from "next/image";
import { Murale } from "@/components/Murale";
import { galleriaMurales } from "@/data/murales";
import type { PublicPhoto } from "@/lib/archivio-shared";

export function Galleria({ photos }: { photos: readonly PublicPhoto[] }) {
  return (
    <section id="murales" className="section" aria-labelledby="galleria-title">
      <div className="wrap">
        <span className="rib rv">capitolo V · il locale è un romanzo</span>
        <h2 id="galleria-title" className="display rv w-900">
          Ogni parete, un libro.
        </h2>
        <p className="sub rv w-560 muted">
          I murales di Jules Verne non sono una decorazione appiccicata: sono il locale. Qui sotto, le pareti che si incontrano entrando.
        </p>
        <div className="mural-columns">
          {galleriaMurales.map((murale) => (
            <article key={murale.src} className={`mural-card ${murale.tone}`}>
              <Murale
                src={murale.src}
                alt={murale.alt}
                width={murale.width}
                height={murale.height}
                invert={murale.tone === "ink"}
                className="mural-card-img"
              />
              <h3>{murale.title}</h3>
              <p>{murale.dove}</p>
            </article>
          ))}
          {photos.map((photo) => (
            <article key={photo.src} className="mural-card paper">
              <Image src={photo.src} alt={photo.alt} width={800} height={600} loading="lazy" className="mural-card-img photo-real" />
              <h3>In sala</h3>
              <p>Foto del locale, caricata dall’archivio.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
