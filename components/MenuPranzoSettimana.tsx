import { PhotoFrame } from "@/components/PhotoFrame";
import { PranzoTabs } from "@/components/PranzoTabs";
import { caveat } from "@/components/duc-font";
import type { PublicPhoto } from "@/lib/archivio-shared";
import { loadMenuPranzo } from "@/lib/blob-archive";
import { REGOLA_PRANZO, WEEK_PENDING, presentMenuPranzo } from "@/lib/pranzo-settimana";

function PranzoFoto({ photos }: { photos: readonly PublicPhoto[] }) {
  return (
    <div className="pranzo-foto">
      {photos.length ? (
        photos.map((photo) => (
          <PhotoFrame key={photo.src} photo={{ src: photo.src, label: photo.alt, ratio: "landscape", radius: 20 }} />
        ))
      ) : (
        <PhotoFrame photo={{ src: null, label: "foto pranzo", ratio: "landscape", radius: 20 }} />
      )}
    </div>
  );
}

export async function MenuPranzoSettimana({
  variant = "card",
  photos = [],
}: {
  variant?: "card" | "page";
  photos?: readonly PublicPhoto[];
}) {
  const view = presentMenuPranzo(await loadMenuPranzo());

  if (variant === "page") {
    return (
      <section className={`${caveat.variable} pranzo-page`} aria-labelledby="pranzo-week-title">
        <h2 id="pranzo-week-title">Menù pranzo della settimana</h2>
        <PranzoFoto photos={photos} />
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
                      {voce.unico ? <span className="piatto-unico">piatto unico</span> : null}
                      {voce.nota ? ` (${voce.nota})` : ""}
                    </li>
                  ))}
                </ul>
                <p className="contorni-title">Contorni sempre disponibili</p>
                <ul className="pranzo-list">
                  {giorno.contorni.map((voce) => (
                    <li key={voce.nome}>{voce.nome}</li>
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
