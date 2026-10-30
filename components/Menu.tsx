import Image from "next/image";
import { Decorazioni } from "@/components/Decorazioni";
import { Polpo } from "@/components/Polpo";
import { site } from "@/content/site";
import { novitaInPagina } from "@/data/novita";
import type { PublicPhoto } from "@/lib/archivio-shared";
import { getMenuPdfUrl, loadDelMese } from "@/lib/blob-archive";
import { piattoInPagina, type PiattoMese } from "@/lib/del-mese";

type RigaMenu = {
  name: string;
  text: string;
  sotto?: string;
  spinta?: boolean;
  photos: readonly PublicPhoto[];
  mese: PiattoMese | null;
  fraseMese?: string;
};

const bubbles = ["b1", "b2", "b3", "b4", "b5"] as const;

export async function Menu({ burger }: { burger: readonly PublicPhoto[] }) {
  const [pdf, delMese] = await Promise.all([getMenuPdfUrl(), loadDelMese()]);
  const novita = novitaInPagina();
  const panino = piattoInPagina(delMese.panino);
  const pizza = piattoInPagina(delMese.pizza);
  const burgerVoce = site.menu.items[0];
  const resto = site.menu.items.slice(1);
  const righe: RigaMenu[] = [
    {
      name: burgerVoce.name,
      text: burgerVoce.text,
      spinta: true,
      photos: burger.slice(0, 4),
      mese: panino,
      fraseMese: panino ? `Vieni a scoprire il panino del mese: ${panino.nome}` : undefined,
    },
    ...(pizza
      ? [
          {
            name: "Pizza del mese",
            text: pizza.descrizione,
            spinta: true,
            photos: [] as readonly PublicPhoto[],
            mese: pizza,
            fraseMese: pizza.nome,
          },
        ]
      : []),
    ...resto.map((item) => ({
      name: item.name,
      text: item.text,
      sotto: "sotto" in item ? item.sotto : undefined,
      spinta: "spinta" in item ? item.spinta : undefined,
      photos: [] as readonly PublicPhoto[],
      mese: null,
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
            const fotoMese = item.mese?.foto ? (
              <div className="mese-call">
                <Image src={item.mese.foto} alt={item.mese.nome} width={160} height={160} className="mese-foto" />
                <div>
                  <p className="mese-frase">{item.fraseMese}</p>
                  {item.mese.descrizione ? <p className="mese-desc">{item.mese.descrizione}</p> : null}
                </div>
              </div>
            ) : item.fraseMese ? (
              <div className="mese-call is-solo">
                <div>
                  <p className="mese-frase">{item.fraseMese}</p>
                  {item.mese?.descrizione ? <p className="mese-desc">{item.mese.descrizione}</p> : null}
                </div>
              </div>
            ) : null;
            const galleria = item.photos.length ? (
              <div className="menu-foto">
                {item.photos.map((photo) => (
                  <Image key={photo.src} src={photo.src} alt={photo.alt} width={160} height={160} className="menu-foto-img" />
                ))}
              </div>
            ) : null;
            return (
              <div key={item.name} className={item.spinta ? "row rv menu-row is-spinta" : "row rv menu-row"}>
                {numero}
                {nome}
                {testo}
                {sotto}
                {galleria}
                {fotoMese}
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
