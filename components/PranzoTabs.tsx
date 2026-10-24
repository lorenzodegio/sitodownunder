"use client";

import { useState } from "react";
import type { GiornoVista } from "@/lib/pranzo-settimana";

export function PranzoTabs({ giorni, selected }: { giorni: readonly GiornoVista[]; selected: string }) {
  const [day, setDay] = useState(selected);
  const current = giorni.find((giorno) => giorno.data === day) ?? giorni[0];

  return (
    <>
      <div className="day-tabs" role="tablist" aria-label="Giorno">
        {giorni.map((giorno) => {
          const on = giorno.data === current.data;
          return (
            <button key={giorno.data} type="button" role="tab" aria-selected={on} className={on ? "is-on" : ""} onClick={() => setDay(giorno.data)}>
              {giorno.tab}
            </button>
          );
        })}
      </div>
      <div className="day-dishes">
        {current.voci.map((voce, index) => (
          <div key={`${voce.tipo}-${voce.nome}-${index}`} className="day-row">
            <div className="day-dish">
              <span className="day-tipo">{voce.tipo}</span>
              <span className="day-nome">
                {voce.nome}
                {voce.nota ? ` (${voce.nota})` : ""}
              </span>
            </div>
            <span className="day-prezzo">{voce.prezzo}</span>
          </div>
        ))}
      </div>
    </>
  );
}
