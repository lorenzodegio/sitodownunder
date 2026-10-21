import { DucMark } from "@/components/DucMark";
import { caveat } from "@/components/duc-font";
import { campaignState, martediNonna, whatsappMartedi, type MartediGiorno } from "@/data/martedi-nonna";
import { locale } from "@/data/locale";
import type { PublicPhoto } from "@/lib/archivio-shared";
import Image from "next/image";

function Band({ next }: { next: MartediGiorno }) {
  const when = next.status === "oggi" ? "Oggi a cena" : "Prossimo martedì";
  return (
    <aside className={`${caveat.variable} nonna-band`} aria-label={martediNonna.title}>
      <DucMark />
      <div className="nonna-band-copy">
        <p className="nonna-kicker">{martediNonna.title}</p>
        <p className="nonna-when">
          {when} · {next.label}
        </p>
        <p className="nonna-dish">{next.dish}</p>
        <p className="nonna-meta">
          <span className="nonna-price">{next.price}</span>
          <span>
            {martediNonna.cuisine} · {martediNonna.booking}
          </span>
        </p>
        <p className="nonna-time">Orario della cena: {martediNonna.time}</p>
      </div>
      <a className="pill btn-solid nonna-cta" href="#martedi-nonna">
        Scopri i martedì
      </a>
    </aside>
  );
}

export function MartediBand() {
  const { visible, next } = campaignState();
  if (!visible || !next) return null;
  return <Band next={next} />;
}

export function MartediNonna({ photos }: { photos: readonly PublicPhoto[] }) {
  const { visible, days, next } = campaignState();
  if (!visible) return null;

  return (
    <section id="martedi-nonna" className={`${caveat.variable} nonna-section`} aria-labelledby="martedi-title">
      <div className="wrap nonna-sheet">
        <div className="nonna-head">
          <DucMark />
          <div>
            <p className="nonna-kicker">quaderno di novembre</p>
            <h2 id="martedi-title" className="nonna-title">
              {martediNonna.title}
            </h2>
            <p className="nonna-lead">
              {martediNonna.cuisine}, {martediNonna.booking}. Orario della cena: {martediNonna.time}.
            </p>
          </div>
        </div>
        <ol className="nonna-days">
          {days.map((day, index) => {
            const photo = photos[index];
            return (
              <li key={day.date} className={`nonna-day is-${day.status}`}>
                <div className="nonna-photo">
                  {photo ? (
                    <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 90vw, 280px" />
                  ) : (
                    <span>Foto in arrivo</span>
                  )}
                </div>
                <div>
                  <p className="nonna-date">{day.label}</p>
                  {day.status === "finito" ? <p className="nonna-stamp">finito</p> : null}
                  {day.status === "oggi" ? <p className="nonna-stamp is-today">oggi</p> : null}
                  <h3>{day.dish}</h3>
                  <p className="nonna-price">{day.price}</p>
                  {day.status !== "finito" ? (
                    <a className="nonna-book" href={whatsappMartedi(day.short)}>
                      Prenota su WhatsApp
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="nonna-only">{martediNonna.booking}</p>
        <div className="nonna-actions">
          {next ? (
            <a className="pill btn-solid nonna-cta" href={whatsappMartedi(next.short)}>
              Prenota su WhatsApp
            </a>
          ) : null}
          <a className="pill btn-ghost nonna-phone" href={`tel:${locale.phoneE164}`}>
            Chiama +39 {locale.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
