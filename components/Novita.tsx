import { Decorazioni } from "@/components/Decorazioni";
import { novitaInPagina } from "@/data/novita";
import { capitolo } from "@/lib/capitoli";

export function Novita() {
  const voci = novitaInPagina();
  if (!voci.length) return null;

  return (
    <section id="novita" className="section" aria-labelledby="novita-title">
      <Decorazioni dove="giornata" />
      <div className="wrap">
        <span className="rib">{capitolo("novita")} · i tagli nuovi</span>
        <h2 id="novita-title" className="display">
          Novità
        </h2>
        <p className="sub w-560">I tagli che arrivano in cucina. Finché un dato è tra parentesi, in produzione questa sezione non c’è.</p>
        <div className="novita-grid">
          {voci.map((voce) => (
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
    </section>
  );
}
