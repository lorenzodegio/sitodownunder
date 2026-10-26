import { Murale } from "@/components/Murale";
import { romeToday } from "@/data/calendario";
import { presentaMomento, scegliMomento } from "@/data/oggi";
import { loadMenuPranzo } from "@/lib/blob-archive";

export async function CosaDelGiorno({ variant }: { variant: "hero" | "breve" }) {
  const now = new Date();
  let piatti: string[] = [];
  if (scegliMomento(now) === "pranzo") {
    const menu = await loadMenuPranzo();
    const giorno = menu?.giorni.find((item) => item.data === romeToday(now));
    piatti = giorno?.voci.map((voce) => voce.nome) ?? [];
  }
  const vista = presentaMomento(now, piatti);

  if (variant === "breve") {
    return (
      <p className="cosa-breve">
        <a href={vista.href}>
          <span className="cosa-kicker">{vista.kicker}</span>
          <strong>{vista.titolo}.</strong> {vista.testo}
        </a>
      </p>
    );
  }

  return (
    <a className="nonna-line" href={vista.href}>
      <Murale
        src="/murales/mano-welcome.png"
        alt=""
        decorative
        width={844}
        height={207}
        invert
        className="nonna-hand"
      />
      <span>
        <span className="nonna-hand-title">
          {vista.kicker}. {vista.titolo}
        </span>
        <span className="nonna-hand-dish">{vista.testo}</span>
        <span className="nonna-hand-cta">{vista.cta} →</span>
      </span>
    </a>
  );
}
