import Image from "next/image";
import { Decorazioni } from "@/components/Decorazioni";
import { Polpo } from "@/components/Polpo";
import { site } from "@/content/site";
import type { PublicPhoto } from "@/lib/archivio-shared";
import { getMenuPdfUrl } from "@/lib/blob-archive";

const bubbles = ["b1", "b2", "b3", "b4", "b5"] as const;

const grandi = [
  {
    id: "burger",
    titolo: "Hamburger",
    testo: "Il motivo per cui la gente viene. Carne seria, pane ai semi, abbinamenti che non ti aspetti.",
    esempi: ["Pane ai semi", "Carne alla piastra", "Abbinamenti del bancone"],
    fallbackSrc: "/murales/mongolfiera.png",
    fallbackAlt: "Murale della mongolfiera: Il giro del mondo in 80 giorni, Down Under Cafè Vanzago",
  },
  {
    id: "carne",
    titolo: "Carne",
    testo: "I piatti di carne della cucina. I tagli nuovi, quando il locale li manda, stanno nelle novità.",
    esempi: ["Alla piastra", "Le specialità", "Si chiede in sala"],
    fallbackSrc: "/murales/caverna-duc.png",
    fallbackAlt: "Murale della caverna con il monogramma DUC, Down Under Cafè Vanzago",
  },
  {
    id: "pizza",
    titolo: "Pizza",
    testo: "Dalla margherita a burrata, crudo e pistacchio. Sì, puoi fare la foto prima.",
    esempi: ["Margherita", "Burrata, crudo e pistacchio", "Le altre della carta"],
    fallbackSrc: "/murales/faro.png",
    fallbackAlt: "Murale del faro con il monogramma DUC, Down Under Cafè Vanzago",
  },
] as const;

const minori = [
  { titolo: "Taglieri", testo: "Da dividere all’aperitivo." },
  { titolo: "Hot dog", testo: "I classici da pub, con patatine." },
] as const;

export async function Menu({
  burger,
  pizza,
  carne,
}: {
  burger: readonly PublicPhoto[];
  pizza: readonly PublicPhoto[];
  carne: readonly PublicPhoto[];
}) {
  const pdf = await getMenuPdfUrl();
  const foto: Record<(typeof grandi)[number]["id"], PublicPhoto | undefined> = {
    burger: burger[0],
    pizza: pizza[0],
    carne: carne[0],
  };

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
        <div className="vetrina">
          {grandi.map((card) => {
            const live = foto[card.id];
            return (
              <article key={card.id} className="vetrina-card rv">
                <div className="vetrina-photo">
                  {live ? (
                    <Image src={live.src} alt={live.alt} fill sizes="(max-width: 800px) 90vw, 360px" className="photo-img" />
                  ) : (
                    <Image
                      src={card.fallbackSrc}
                      alt={card.fallbackAlt}
                      fill
                      sizes="(max-width: 800px) 90vw, 360px"
                      className="photo-img photo-fallback inv"
                    />
                  )}
                </div>
                <div className="vetrina-copy">
                  <h3>{card.titolo}</h3>
                  <p>{card.testo}</p>
                  <ul>
                    {card.esempi.map((esempio) => (
                      <li key={esempio}>{esempio}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
        <div className="vetrina-minori">
          {minori.map((card) => (
            <article key={card.titolo} className="vetrina-mini rv">
              <h3>{card.titolo}</h3>
              <p>{card.testo}</p>
            </article>
          ))}
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
