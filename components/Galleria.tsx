import Image from "next/image";
import { Foglie } from "@/components/Foglie";
import { Murale } from "@/components/Murale";
import { paretiColonne, type Parete } from "@/data/murales";
import type { PublicPhoto } from "@/lib/archivio-shared";

function Card({ item, fill }: { item: Parete; fill?: boolean }) {
  return (
    <figure className={fill ? "fill" : undefined}>
      <div className="ph" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
        <Murale src={item.src} alt={item.alt} width={item.width} height={item.height} className="parete-img" />
      </div>
      <figcaption>
        <span>{item.title}</span>
        <span>{item.dove}</span>
      </figcaption>
    </figure>
  );
}

export function Galleria({ photos }: { photos: readonly PublicPhoto[] }) {
  return (
    <section id="murales" className="chapter chapter-paper" aria-labelledby="galleria-title">
      <Foglie where="pareti" />
      <div className="chapter-wrap chapter-stack">
        <div className="chapter-intro">
          <span className="kicker">capitolo IV · il giro del locale in 80 pareti</span>
          <h2 id="galleria-title" className="display">
            Ogni parete, un libro
          </h2>
        </div>
        <div className="gal">
          {paretiColonne.map((colonna, index) => (
            <div key={colonna[0].src} className="gal-col">
              {photos[index] ? (
                <figure>
                  <div className="ph" style={{ aspectRatio: "4 / 5" }}>
                    <Image src={photos[index].src} alt={photos[index].alt} fill sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <figcaption>
                    <span>In sala</span>
                    <span>Foto del locale</span>
                  </figcaption>
                </figure>
              ) : null}
              {colonna.map((item, itemIndex) => (
                <Card key={item.src} item={item} fill={itemIndex === colonna.length - 1} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
