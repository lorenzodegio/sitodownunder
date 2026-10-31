import { Decorazioni } from "@/components/Decorazioni";
import { NovitaFoto } from "@/components/NovitaFoto";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Polpo } from "@/components/Polpo";
import { site } from "@/content/site";
import { novitaInPagina } from "@/data/novita";
import type { PublicPhoto } from "@/lib/archivio-shared";
import { getMenuPdfUrl } from "@/lib/blob-archive";

type RigaMenu = {
  name: string;
  text: string;
  sotto?: string;
  spinta?: boolean;
  photos: readonly PublicPhoto[];
  novita: PublicPhoto | null;
  fallback: string;
};

const bubbles = ["b1", "b2", "b3", "b4", "b5"] as const;

function galleria(item: RigaMenu) {
  if (!item.spinta) return null;
  const novita = item.novita;
  const posti = novita ? 2 : 3;
  const scelte = item.photos.slice(0, posti);
  const vuoti = item.photos.length ? [] : Array.from({ length: posti }, (_, index) => index);
  return (
    <div className="menu-foto">
      {novita ? <NovitaFoto photo={novita} /> : null}
      {scelte.map((photo) => (
        <PhotoFrame key={photo.src} photo={{ src: photo.src, label: photo.alt, ratio: "portrait", radius: 20 }} />
      ))}
      {vuoti.map((slot) => (
        <PhotoFrame key={`${item.name}-${slot}`} photo={{ src: null, label: item.fallback, ratio: "portrait", radius: 20 }} />
      ))}
    </div>
  );
}

export async function Menu({
  burger,
  carne,
  specialita,
  novitaPanino,
  novitaSpecialita,
}: {
  burger: readonly PublicPhoto[];
  carne: readonly PublicPhoto[];
  specialita: readonly PublicPhoto[];
  novitaPanino: readonly PublicPhoto[];
  novitaSpecialita: readonly PublicPhoto[];
}) {
  const pdf = await getMenuPdfUrl();
  const novita = novitaInPagina();
  const [burgerVoce, carneVoce, specialitaVoce, ...resto] = site.menu.items;
  const righe: RigaMenu[] = [
    {
      name: burgerVoce.name,
      text: burgerVoce.text,
      spinta: true,
      photos: burger,
      novita: novitaPanino[0] ?? null,
      fallback: "foto burger",
    },
    {
      name: carneVoce.name,
      text: carneVoce.text,
      spinta: true,
      photos: carne,
      novita: null,
      fallback: "foto carne",
    },
    {
      name: specialitaVoce.name,
      text: specialitaVoce.text,
      spinta: true,
      photos: specialita,
      novita: novitaSpecialita[0] ?? null,
      fallback: "foto specialità",
    },
    ...resto.map((item) => ({
      name: item.name,
      text: item.text,
      sotto: "sotto" in item ? item.sotto : undefined,
      spinta: false,
      photos: [] as readonly PublicPhoto[],
      novita: null,
      fallback: "",
    })),
  ];

  return (
    <section id="menu" className="section-sea section-menu" aria-labelledby="menu-title">
      {bubbles.map((name) => (
        <span key={name} className={`bub bubble ${name}`} aria-hidden="true" />
      ))}
      <Decorazioni dove="menu" />
      <div className="wrap menu-stage">
        <div className="head">
          <div className="head-copy">
            <span className="rib rv">{site.menu.kicker}</span>
            <h2 id="menu-title" className="display rv">
              {site.menu.title}
            </h2>
          </div>
          <Polpo />
        </div>
        {novita.length ? (
          <div className="menu-novita" id="novita">
            <h3 className="format-title">Novità</h3>
            <div className="novita-grid">
              {novita.map((voce) => (
                <article key={voce.id} className="novita-card">
                  <h3>{voce.nome}</h3>
                  <p>
                    {voce.provenienza} · {voce.peso}
                  </p>
                  <p>{voce.descrizione}</p>
                  <p className="novita-prezzo">{voce.prezzo}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
        <div className="menu-list">
          {righe.map((item, index) => {
            const numero = <span className="menu-num">{String(index + 1).padStart(2, "0")}</span>;
            const nome = <h3 className="menu-name">{item.name}</h3>;
            const testo = item.text ? <p className="menu-text">{item.text}</p> : null;
            const sotto = item.sotto ? <p className="menu-sotto">{item.sotto}</p> : null;
            return (
              <div key={item.name} className={item.spinta ? "row rv menu-row is-spinta" : "row rv menu-row"}>
                {numero}
                {nome}
                {testo}
                {sotto}
                {galleria(item)}
              </div>
            );
          })}
        </div>
        <div className="menu-foot rv">
          <p>{site.menu.takeaway}</p>
          {pdf ? (
            <a className="pdf-btn" href={site.menu.pdfHref}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11" />
                <path d="M7 10l5 5 5-5" />
                <path d="M5 20h14" />
              </svg>
              {site.menu.pdfLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
