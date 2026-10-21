import { homeFaq } from "@/data/faq";
import { showGarden } from "@/data/flags";
import { comuni } from "@/data/locale";

export function Zona() {
  return (
    <section id="zona" className="section section-tight" aria-labelledby="zona-title">
      <div className="wrap">
        <span className="rib rv">{showGarden ? "capitolo VIII · da dove arrivi" : "capitolo VII · da dove arrivi"}</span>
        <h2 id="zona-title" className="display rv w-900">
          Milano ovest, senza attraversare la città.
        </h2>
        <div className="zona-copy">
          <p>
            Il Down Under è a Vanzago, in Via Primo Maggio 1, sul lato del paese che guarda Pregnana Milanese e Rho.
            Mantegazza è la frazione qui accanto. Chi arriva dalla Fiera Milano Rho, da Pogliano o dal Sempione non entra
            in centro a Milano: resta sull’asse ovest e trova il civico 1.
          </p>
          <p>
            A pranzo ci si siede tra un impegno e l’altro. La sera si fa l’aperitivo e si cena. Gli orari sono [orari da
            confermare]. Per il tavolo, il 338 439 5727.
          </p>
        </div>
        <div className="comuni-chips" aria-label="Comuni della zona">
          {comuni.map((comune) => (
            <span key={comune}>{comune}</span>
          ))}
        </div>
        <div className="faq">
          <p className="faq-title">Domande frequenti</p>
          {homeFaq.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
