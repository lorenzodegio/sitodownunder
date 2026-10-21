import Image from "next/image";
import { caveat } from "@/components/duc-font";
import { Decorazioni } from "@/components/Decorazioni";
import { eventiAttivi, whatsappEvento } from "@/data/eventi";
import { locale } from "@/data/locale";
import type { PublicPhoto } from "@/lib/archivio-shared";

export function Prossimamente({ photos }: { photos: readonly PublicPhoto[] }) {
  const eventi = eventiAttivi();
  if (!eventi.length) return null;

  return (
    <section id="prossimamente" className={`${caveat.variable} chapter chapter-paper`} aria-labelledby="prossimamente-title">
      <Decorazioni dove="paper" />
      <div className="chapter-wrap chapter-stack">
        <div className="chapter-intro">
          <span className="kicker">capitolo I · il diario di bordo</span>
          <h2 id="prossimamente-title" className="display">
            Prossimamente
          </h2>
          <p className="chapter-lead">Le serate speciali, una alla volta. Si prenota, si arriva, si mangia come si deve.</p>
        </div>
        {eventi.map((evento) => (
          <article key={evento.id} className="evento-sheet">
            <div className="ev-head">
              <div className="ev-copy">
                <div className="ev-tags">
                  {evento.tag.map((tag, index) => (
                    <span key={tag} className={index === 0 ? "ev-tag ev-tag-fill" : "ev-tag"}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="ev-title">{evento.titolo}</h3>
                <p className="ev-text">{evento.descrizione}</p>
              </div>
              <div className="ev-actions">
                <a className="pill btn-ink" href={whatsappEvento(evento.prenotazione, evento.next.short)}>
                  Prenota su WhatsApp
                </a>
                <a className="pill btn-ink-ghost" href={`tel:${locale.phoneE164}`}>
                  Chiama
                </a>
              </div>
            </div>
            <div className="ev-grid">
              {evento.date.map((giorno, index) => {
                const photo = giorno.foto || photos[index]?.src;
                const alt = photos[index]?.alt || `Foto di ${giorno.piatto}`;
                return (
                  <div key={giorno.data} className={giorno.isNext ? "ev-card is-next" : "ev-card"}>
                    <div className={photo ? "ev-photo" : "ev-photo ev-photo-empty"}>
                      {photo ? (
                        <Image src={photo} alt={alt} fill sizes="(max-width: 640px) 100vw, 25vw" />
                      ) : (
                        <span>foto del piatto</span>
                      )}
                      {giorno.isNext ? <span className="ev-badge">Il prossimo</span> : null}
                    </div>
                    <div className="ev-body">
                      <span className="ev-date">{giorno.label}</span>
                      <span className="ev-dish">{giorno.piatto}</span>
                    </div>
                    <div className="ev-price">
                      <span>{giorno.prezzo}</span>
                      <span>a persona</span>
                    </div>
                    <div className="ev-book">
                      <a href={whatsappEvento(evento.prenotazione, giorno.short)}>Prenota il {giorno.breve}</a>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
