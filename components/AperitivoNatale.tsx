import { formatMartedi } from "@/data/calendario";
import { MESSAGGIO_APERITIVO_NATALE, type EventoVista } from "@/data/eventi";
import { whatsappLink } from "@/lib/whatsapp";

function Fiocco() {
  return (
    <svg className="natale-fiocco" aria-hidden="true" viewBox="0 0 120 70">
      <path d="M60 36C44 14 14 6 8 22s22 26 52 14z" fill="#B5372E" stroke="#8E2A23" strokeWidth="2" />
      <path d="M60 36C76 14 106 6 112 22s-22 26-52 14z" fill="#B5372E" stroke="#8E2A23" strokeWidth="2" />
      <path d="M56 40l-14 28M64 40l14 28" stroke="#B5372E" strokeWidth="9" strokeLinecap="round" />
      <rect x="51" y="28" width="18" height="16" rx="5" fill="#8E2A23" />
    </svg>
  );
}

function WhatsApp() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#FFFCF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.4-1.6-1-2-2l1-1-1-2z" />
    </svg>
  );
}

/** Biglietto dell'aperitivo di Natale. Non si disegna se l'evento è già passato. */
export function AperitivoNatale({ evento }: { evento: EventoVista }) {
  const giorno = evento.next;
  return (
    <article id={evento.id} className="aperitivo-natale" aria-labelledby="aperitivo-natale-title">
      <span className="natale-nastro" aria-hidden="true" />
      <Fiocco />
      <p className="aperitivo-quando">
        {formatMartedi(giorno.data)} · {evento.orario}
      </p>
      <h3 id="aperitivo-natale-title" className="ev-title">
        {evento.titolo}
      </h3>
      <p className="aperitivo-voci">{giorno.piatto}</p>
      <p className="aperitivo-prezzo">{giorno.amount} €</p>
      <a className="natale-book" href={whatsappLink(MESSAGGIO_APERITIVO_NATALE)}>
        <WhatsApp />
        Info su WhatsApp
      </a>
    </article>
  );
}
