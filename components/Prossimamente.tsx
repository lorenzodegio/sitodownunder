import Image from "next/image";
import { caveat } from "@/components/duc-font";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Decorazioni } from "@/components/Decorazioni";
import { aperitivoDomenica, aperitivoDomenicaVisibile, whatsappAperitivoGruppo } from "@/data/format";
import { eventiFormat, eventiSingoli, whatsappEvento } from "@/data/eventi";
import { locale } from "@/data/locale";
import type { PublicPhoto } from "@/lib/archivio-shared";

const whatsappDomenica =
  "https://wa.me/393384395727?text=Ciao%2C%20vorrei%20prenotare%20per%20l%27aperitivo%20della%20domenica";

export function Prossimamente({
  photos,
  aperitivo,
}: {
  photos: readonly PublicPhoto[];
  aperitivo: readonly PublicPhoto[];
}) {
  const format = eventiFormat();
  const singoli = eventiSingoli();
  const domenica = aperitivoDomenicaVisibile();
  const nonnaInCalendario = format.some((evento) => evento.id === "martedi-nonna");

  return (
    <section id="prossimamente" className={`${caveat.variable} chapter chapter-paper`} aria-labelledby="prossimamente-title">
      <Decorazioni dove="paper" />
      <div className="chapter-wrap chapter-stack">
        <div className="chapter-intro">
          <span className="kicker">capitolo I · il diario di bordo</span>
          <h2 id="prossimamente-title" className="display">
            Prossimamente
          </h2>
          <p className="chapter-lead">Aperitivi ed eventi. Ogni data è un’offerta, con il suo prezzo.</p>
        </div>

        <div className="format-block">
          <h3 className="format-title">Eventi</h3>
          {format.map((evento) => (
            <article key={evento.id} id={evento.id === "martedi-nonna" ? "format-nonna" : undefined} className="evento-sheet">
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
                  {evento.orario ? <p className="ev-text">Orario in calendario: {evento.orario}.</p> : null}
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
                  const alt = photos[index]?.alt || `Foto di ${giorno.piatto}, solo a cena`;
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

          {nonnaInCalendario ? null : (
            <article id="format-nonna" className="evento-sheet">
              <div className="ev-head">
                <div className="ev-copy">
                  <div className="ev-tags">
                    <span className="ev-tag ev-tag-fill">Solo a cena</span>
                    <span className="ev-tag">Solo su prenotazione</span>
                  </div>
                  <h3 className="ev-title">I martedì della nonna</h3>
                  <p className="ev-text">Solo a cena, solo su prenotazione. Il prossimo calendario arriva qui.</p>
                </div>
                <div className="ev-actions">
                  <a className="pill btn-ink-ghost" href={`tel:${locale.phoneE164}`}>
                    Chiama
                  </a>
                </div>
              </div>
            </article>
          )}

        </div>

        {domenica ? (
          <div className="format-block">
            <h3 className="format-title">Aperitivi</h3>
            <article id="format-domenica" className="evento-sheet">
              <div className="ev-head">
                <div className="ev-copy">
                  <div className="ev-tags">
                    <span className="ev-tag ev-tag-fill">Ogni domenica</span>
                    <span className="ev-tag">Offerta</span>
                  </div>
                  <h3 className="ev-title">{aperitivoDomenica.titolo}</h3>
                  <p className="ev-text">{aperitivoDomenica.testo}</p>
                  <p className="ev-text">{aperitivoDomenica.orario}</p>
                  <p className="offerta-riga">
                    <span className="offerta-prezzo">{aperitivoDomenica.prezzo}</span>
                    <span>{aperitivoDomenica.include}</span>
                  </p>
                  <p className="ev-gruppi">
                    {aperitivoDomenica.gruppi} <a href={whatsappAperitivoGruppo}>Prenota</a>
                  </p>
                </div>
                <div className="ev-side">
                  <div className="ev-foto">
                    <PhotoFrame
                      photo={{
                        src: aperitivo[0]?.src ?? null,
                        label: aperitivo[0]?.alt ?? "foto aperitivo",
                        ratio: "portrait",
                        radius: 20,
                      }}
                    />
                  </div>
                  <div className="ev-actions">
                    <a className="pill btn-ink" href={whatsappDomenica}>
                      Prenota su WhatsApp
                    </a>
                    <a className="pill btn-ink-ghost" href={`tel:${locale.phoneE164}`}>
                      Chiama
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {singoli.length ? (
          <div className="format-block">
            <h3 className="format-title">Prossimi eventi</h3>
            {singoli.map((evento) => (
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
                  {evento.date.map((giorno) => (
                    <div key={giorno.data} className={giorno.isNext ? "ev-card is-next" : "ev-card"}>
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
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
