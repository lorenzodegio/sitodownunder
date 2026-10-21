import { loadMenuPranzo } from "@/lib/blob-archive";
import {
  MENU_PLACEHOLDER,
  PORTATE,
  PRICE_PLACEHOLDER,
  WEEK_PENDING,
  formatDayIt,
  portataLabel,
  presentMenuPranzo,
} from "@/lib/pranzo-settimana";

export async function MenuPranzoSettimana({ heading = "h2" }: { heading?: "h2" | "h3" }) {
  const view = presentMenuPranzo(await loadMenuPranzo());
  const Title = heading;

  if (view.status === "expired") {
    return (
      <section className="pranzo-week" aria-labelledby="pranzo-week-title">
        <Title id="pranzo-week-title" className="pranzo-week-title">
          Menù pranzo
        </Title>
        <p>{WEEK_PENDING}</p>
      </section>
    );
  }

  if (view.status === "empty") {
    return (
      <section className="pranzo-week" aria-labelledby="pranzo-week-title">
        <Title id="pranzo-week-title" className="pranzo-week-title">
          Menù pranzo
        </Title>
        <p>{MENU_PLACEHOLDER}</p>
        <p className="pranzo-week-price">{PRICE_PLACEHOLDER}</p>
      </section>
    );
  }

  const { menu } = view;
  return (
    <section className="pranzo-week" aria-labelledby="pranzo-week-title">
      <Title id="pranzo-week-title" className="pranzo-week-title">
        Menù della settimana dal {formatDayIt(menu.from)} al {formatDayIt(menu.to)}
      </Title>
      {PORTATE.map((portata) =>
        menu.voci[portata].length ? (
          <div key={portata}>
            {heading === "h2" ? (
              <h3 className="pranzo-course">{portataLabel[portata]}</h3>
            ) : (
              <h4 className="pranzo-course">{portataLabel[portata]}</h4>
            )}
            <ul className="pranzo-dishes">
              {menu.voci[portata].map((voce) => (
                <li key={voce}>{voce}</li>
              ))}
            </ul>
          </div>
        ) : null,
      )}
      <p className="pranzo-week-price">{menu.price || PRICE_PLACEHOLDER}</p>
      {menu.includes ? <p>Comprende: {menu.includes}</p> : null}
      {menu.notes ? <p>{menu.notes}</p> : null}
    </section>
  );
}
