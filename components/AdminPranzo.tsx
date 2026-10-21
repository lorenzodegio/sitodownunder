"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  PORTATE,
  portataLabel,
  presentMenuPranzo,
  type MenuPranzo,
  type Portata,
} from "@/lib/pranzo-settimana";

const emptyVoci = (): Record<Portata, string[]> => ({
  primi: [""],
  secondi: [""],
  contorni: [""],
  dessert: [""],
});

export function AdminPranzo({ configured, saved }: { configured: boolean; saved: MenuPranzo | null }) {
  const router = useRouter();
  const [from, setFrom] = useState(saved?.from ?? "");
  const [to, setTo] = useState(saved?.to ?? "");
  const [price, setPrice] = useState(saved?.price ?? "");
  const [includes, setIncludes] = useState(saved?.includes ?? "");
  const [notes, setNotes] = useState(saved?.notes ?? "");
  const [voci, setVoci] = useState<Record<Portata, string[]>>(
    saved
      ? {
          primi: saved.voci.primi.length ? saved.voci.primi : [""],
          secondi: saved.voci.secondi.length ? saved.voci.secondi : [""],
          contorni: saved.voci.contorni.length ? saved.voci.contorni : [""],
          dessert: saved.voci.dessert.length ? saved.voci.dessert : [""],
        }
      : emptyVoci(),
  );
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const view = presentMenuPranzo(saved);

  function setLine(portata: Portata, index: number, value: string) {
    setVoci((current) => ({
      ...current,
      [portata]: current[portata].map((line, lineIndex) => (lineIndex === index ? value : line)),
    }));
  }

  function addLine(portata: Portata) {
    setVoci((current) => ({ ...current, [portata]: [...current[portata], ""] }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/pranzo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, price, includes, notes, voci }),
      });
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(body?.error || "Salvataggio non riuscito");
      setMessage("Menù pranzo pubblicato.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Salvataggio non riuscito");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="admin-card" aria-labelledby="admin-pranzo">
      <h2 id="admin-pranzo">Menù pranzo della settimana</h2>
      <p>Compare in home e in /menu. Se la settimana è passata, il sito mostra il messaggio di attesa e non il menù vecchio.</p>
      {view.status === "expired" ? (
        <p className="admin-warn">La settimana salvata è scaduta: in pagina non viene più mostrata.</p>
      ) : null}
      <form onSubmit={onSubmit}>
        <div className="admin-dates">
          <label>
            Dal
            <input type="date" required value={from} onChange={(event) => setFrom(event.target.value)} />
          </label>
          <label>
            Al
            <input type="date" required value={to} onChange={(event) => setTo(event.target.value)} />
          </label>
        </div>
        {PORTATE.map((portata) => (
          <fieldset key={portata} className="admin-course">
            <legend>{portataLabel[portata]}</legend>
            {voci[portata].map((line, index) => (
              <input
                key={`${portata}-${index}`}
                value={line}
                onChange={(event) => setLine(portata, index, event.target.value)}
                placeholder="Una voce"
                maxLength={160}
              />
            ))}
            <button type="button" onClick={() => addLine(portata)}>
              Aggiungi una riga
            </button>
          </fieldset>
        ))}
        <label>
          Prezzo del menù fisso
          <input value={price} onChange={(event) => setPrice(event.target.value)} maxLength={80} placeholder="[prezzo da confermare]" />
        </label>
        <label>
          Cosa è incluso
          <input
            value={includes}
            onChange={(event) => setIncludes(event.target.value)}
            maxLength={280}
            placeholder="Acqua, caffè…"
          />
        </label>
        <label>
          Note
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={500} rows={3} />
        </label>
        <button className="pill btn-solid" type="submit" disabled={pending || !configured}>
          Pubblica il menù pranzo
        </button>
      </form>
      {message ? <p className="admin-message">{message}</p> : null}
    </section>
  );
}
