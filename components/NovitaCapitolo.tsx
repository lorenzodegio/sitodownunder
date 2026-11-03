import { Decorazioni } from "@/components/Decorazioni";
import { SlotEvPhoto } from "@/components/SlotFrame";
import { site } from "@/content/site";
import { elencoNomi, meseNovita, novitaInElenco, testoConfermato } from "@/data/novita";
import type { SlotVista } from "@/lib/slot-types";

function whatsappTaglio(nome: string): string {
  const numero = site.phone.tel.replace(/^tel:\+/, "");
  const testo = nome.startsWith("[")
    ? "Ciao, vorrei prenotare e chiedere un taglio nuovo"
    : `Ciao, vorrei prenotare e chiedere ${nome}`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(testo)}`;
}

export async function NovitaCapitolo({ vista }: { vista: SlotVista }) {
  const voci = novitaInElenco();
  if (!voci.length) return null;
  const mese = meseNovita();

  return (
    <section id="novita" className="chapter chapter-paper" aria-labelledby="novita-title">
      <Decorazioni dove="paper" />
      <div className="chapter-wrap">
        <span className="rib rv">capitolo I · il diario di bordo</span>
        <h2 id="novita-title" className="display rv w-900">
          Novità di {mese}
        </h2>
        <p className="chapter-lead">{elencoNomi(voci)}. Finché ci sono.</p>
        <div className="ev-grid novita-tagli">
          {voci.map((voce, index) => {
            const record = vista.items[voce.slot] ?? null;
            const nome = testoConfermato(voce.nome, record?.piatto);
            const provenienza = testoConfermato(voce.provenienza);
            const peso = testoConfermato(voce.peso);
            const cottura = testoConfermato(voce.cottura);
            const prezzo = testoConfermato(voce.prezzo);
            const unita = testoConfermato(voce.unita);
            const descrizione = testoConfermato(voce.descrizione, record?.descrizione);
            const meta = descrizione || [peso, cottura].filter(Boolean).join(" · ");
            return (
            <article key={voce.id} className={index === 0 ? "ev-card is-next" : "ev-card"}>
              <SlotEvPhoto
                id={voce.slot}
                record={record}
                indicazioni={vista.indicazioni}
                badge={index === 0 ? "Nuovo" : undefined}
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="ev-body">
                {provenienza ? <span className="ev-date">{provenienza}</span> : null}
                <span className="ev-dish">{nome}</span>
                {meta ? <span className="ev-meta">{meta}</span> : null}
              </div>
              {prezzo || unita ? (
                <div className="ev-price">
                  {prezzo ? <span>{prezzo}</span> : null}
                  {unita ? <span>{unita}</span> : null}
                </div>
              ) : null}
              <div className="ev-book">
                <a href={whatsappTaglio(nome)}>Prenota e chiedilo</a>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
