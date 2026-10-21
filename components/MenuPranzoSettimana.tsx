import { PranzoTabs } from "@/components/PranzoTabs";
import { caveat } from "@/components/duc-font";
import { loadMenuPranzo } from "@/lib/blob-archive";
import { REGOLA_PRANZO, WEEK_PENDING, presentMenuPranzo } from "@/lib/pranzo-settimana";

export async function MenuPranzoSettimana({ variant = "card" }: { variant?: "card" | "page" }) {
  const view = presentMenuPranzo(await loadMenuPranzo());

  if (variant === "page") {
    return (
      <section className={`${caveat.variable} pranzo-page`} aria-labelledby="pranzo-week-title">
        <h2 id="pranzo-week-title">Menù pranzo della settimana</h2>
        {view.status === "pending" ? (
          <p>{WEEK_PENDING}</p>
        ) : (
          <>
            <p className="pranzo-periodo">{view.periodo}</p>
            {view.giorni.map((giorno) => (
              <div key={giorno.data}>
                <h3>{giorno.titolo}</h3>
                <ul className="pranzo-list">
                  {giorno.voci.map((voce, index) => (
                    <li key={`${voce.nome}-${index}`}>
                      {voce.tipo} · {voce.nome}
                      {voce.nota ? ` (${voce.nota})` : ""}
                      {voce.prezzo ? ` · ${voce.prezzo}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
        <p>{REGOLA_PRANZO}</p>
      </section>
    );
  }

  return (
    <aside id="pranzo-settimana" className={`${caveat.variable} pranzo-card`} aria-labelledby="pranzo-week-title">
      <span className="pranzo-kicker">il giro del pranzo in 60 minuti</span>
      <h3 id="pranzo-week-title">Menù pranzo della settimana</h3>
      {view.status === "pending" ? (
        <p className="pranzo-pending">{WEEK_PENDING}</p>
      ) : (
        <>
          <span className="pranzo-periodo">{view.periodo}</span>
          <PranzoTabs giorni={view.giorni} selected={view.selected} />
        </>
      )}
      <div className="pranzo-rule">
        <span>
          <span>Primo + secondo con contorno</span>
          <span>da 14€</span>
        </span>
        <p>Primi e secondi da 7€, bevande escluse. E a pranzo c&apos;è anche tutto il menù della sera.</p>
      </div>
    </aside>
  );
}
