import { Decorazioni } from "@/components/Decorazioni";
import { SlotEvPhoto } from "@/components/SlotFrame";
import { site } from "@/content/site";
import { meseNovita, novita, novitaInPagina, type Novita } from "@/data/novita";
import type { SlotVista } from "@/lib/slot-types";

function whatsappTaglio(nome: string): string {
  const numero = site.phone.tel.replace(/^tel:\+/, "");
  const testo = nome.startsWith("[")
    ? "Ciao, vorrei prenotare e chiedere un taglio nuovo"
    : `Ciao, vorrei prenotare e chiedere ${nome}`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(testo)}`;
}

export async function NovitaCapitolo({ vista, forza = false }: { vista: SlotVista; forza?: boolean }) {
  const pagine = novitaInPagina();
  const voci: readonly Novita[] = pagine.length ? pagine : forza ? novita : [];
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
        <p className="chapter-lead">I tagli nuovi sono sbarcati. Carne seria, appena arrivata: finché c&apos;è.</p>
        <div className="ev-grid novita-tagli">
          {voci.map((voce, index) => (
            <article key={voce.id} className={index === 0 ? "ev-card is-next" : "ev-card"}>
              <SlotEvPhoto
                id={voce.slot}
                record={vista.items[voce.slot] ?? null}
                indicazioni={vista.indicazioni}
                badge={index === 0 ? "Nuovo" : undefined}
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="ev-body">
                <span className="ev-date">{voce.provenienza}</span>
                <span className="ev-dish">{voce.nome}</span>
                <span className="ev-meta">
                  {voce.peso} · {voce.cottura}
                </span>
              </div>
              <div className="ev-price">
                <span>{voce.prezzo}</span>
                <span>{voce.unita}</span>
              </div>
              <div className="ev-book">
                <a href={whatsappTaglio(voce.nome)}>Prenota e chiedilo</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
