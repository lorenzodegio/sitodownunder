"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

export type VoceMenu = {
  href: string;
  label: string;
  evidenza?: boolean;
};

type Azione = { href: string; label: string };

const DESKTOP = "(min-width: 761px)";

export function MenuMobile({
  voci,
  chiama,
  whatsapp,
}: {
  voci: readonly VoceMenu[];
  chiama: Azione;
  whatsapp: Azione;
}) {
  const [aperto, setAperto] = useState(false);
  const [pronto, setPronto] = useState(false);
  const bottone = useRef<HTMLButtonElement>(null);
  const pannello = useRef<HTMLDivElement>(null);
  const eraAperto = useRef(false);
  const id = useId();

  useEffect(() => setPronto(true), []);

  useEffect(() => {
    if (aperto) {
      eraAperto.current = true;
      pannello.current?.querySelector<HTMLElement>("a")?.focus();
      return;
    }
    if (eraAperto.current) bottone.current?.focus();
  }, [aperto]);

  useEffect(() => {
    const radice = document.documentElement;
    radice.classList.toggle("menu-aperto", aperto);
    const sotto = Array.from(document.querySelectorAll<HTMLElement>("main, footer, .callbar"));
    for (const nodo of sotto) nodo.inert = aperto;
    if (!aperto) return;

    const chiudiSeLargo = () => {
      if (window.matchMedia(DESKTOP).matches) setAperto(false);
    };
    const media = window.matchMedia(DESKTOP);
    media.addEventListener("change", chiudiSeLargo);

    const suTasto = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAperto(false);
        return;
      }
      if (event.key !== "Tab" || !pannello.current) return;
      const elementi = Array.from(pannello.current.querySelectorAll<HTMLElement>("a, button"));
      if (!elementi.length) return;
      const primo = elementi[0];
      const ultimo = elementi[elementi.length - 1];
      const attivo = document.activeElement;
      if (event.shiftKey && attivo === primo) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && attivo === ultimo) {
        event.preventDefault();
        primo.focus();
      }
    };
    document.addEventListener("keydown", suTasto);
    return () => {
      radice.classList.remove("menu-aperto");
      for (const nodo of sotto) nodo.inert = false;
      media.removeEventListener("change", chiudiSeLargo);
      document.removeEventListener("keydown", suTasto);
    };
  }, [aperto]);

  function vai(event: MouseEvent<HTMLAnchorElement>) {
    const hash = event.currentTarget.hash;
    setAperto(false);
    if (!hash) return;
    const destinazione = document.getElementById(hash.slice(1));
    if (!destinazione) return;
    event.preventDefault();
    const riduci = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      destinazione.scrollIntoView({ behavior: riduci ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", hash);
    });
  }

  const altezza = bottone.current?.closest(".site-header")?.getBoundingClientRect().height ?? 64;

  const pannelloNodo = (
    <div
      ref={pannello}
      id={id}
      className={aperto ? "menu-mobile is-open" : "menu-mobile"}
      style={{ top: altezza }}
      role="dialog"
      aria-modal="true"
      aria-label="Menù"
      aria-hidden={aperto ? undefined : true}
      inert={aperto ? undefined : true}
    >
      <nav className="menu-mobile-voci" aria-label="Sezioni">
        {voci.map((voce) => (
          <a
            key={voce.href}
            href={voce.href}
            className={voce.evidenza ? "menu-mobile-voce is-natale" : "menu-mobile-voce"}
            onClick={vai}
          >
            {voce.label}
          </a>
        ))}
      </nav>
      <div className="menu-mobile-azioni">
        <a className="pill btn-ghost menu-mobile-azione" href={chiama.href}>
          {chiama.label}
        </a>
        <a className="pill btn-solid menu-mobile-azione" href={whatsapp.href}>
          {whatsapp.label}
        </a>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={bottone}
        type="button"
        className={aperto ? "menu-toggle is-open" : "menu-toggle"}
        aria-label={aperto ? "Chiudi il menù" : "Apri il menù"}
        aria-expanded={aperto}
        aria-controls={id}
        onClick={() => setAperto((valore) => !valore)}
      >
        <span className="menu-toggle-barre" aria-hidden="true" />
      </button>
      {pronto ? createPortal(pannelloNodo, document.body) : null}
    </>
  );
}
