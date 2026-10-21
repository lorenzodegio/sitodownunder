"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { formatWeekdayLong, romeWeekday } from "@/data/calendario";
import { TIPI, isDay, presentMenuPranzo, type MenuPranzo, type TipoVoce, type VocePranzo } from "@/lib/pranzo-settimana";

type Row = { tipo: TipoVoce; nome: string; prezzo: string; nota: string };

const emptyRow = (): Row => ({ tipo: "Primo", nome: "", prezzo: "", nota: "" });

function weekdays(from: string, to: string): string[] {
  if (!isDay(from) || !isDay(to) || to < from) return [];
  const days: string[] = [];
  const [year, month, day] = from.split("-").map(Number);
  const cursor = new Date(Date.UTC(year, month - 1, day, 12));
  while (days.length < 5) {
    const iso = cursor.toISOString().slice(0, 10);
    if (iso > to) break;
    const dow = romeWeekday(iso);
    if (dow >= 1 && dow <= 5) days.push(iso);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

function rowsFrom(voci: VocePranzo[] | undefined): Row[] {
  if (!voci?.length) return [emptyRow()];
  return voci.map((voce) => ({ tipo: voce.tipo, nome: voce.nome, prezzo: voce.prezzo, nota: voce.nota }));
}

export function AdminPranzo({ configured, saved }: { configured: boolean; saved: MenuPranzo | null }) {
  const router = useRouter();
  const [from, setFrom] = useState(saved?.from ?? "");
  const [to, setTo] = useState(saved?.to ?? "");
  const [giorni, setGiorni] = useState<Record<string, Row[]>>(() => {
    const map: Record<string, Row[]> = {};
    for (const giorno of saved?.giorni ?? []) map[giorno.data] = rowsFrom(giorno.voci);
    return map;
  });
  const [sempre, setSempre] = useState<Row[]>(saved?.sempre.length ? rowsFrom(saved.sempre) : [emptyRow()]);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const dates = useMemo(() => weekdays(from, to), [from, to]);
  const expired = saved ? presentMenuPranzo(saved).status === "pending" : false;

  function setRow(date: string, index: number, patch: Partial<Row>) {
    setGiorni((current) => {
      const rows = [...(current[date] ?? [emptyRow()])];
      rows[index] = { ...rows[index], ...patch };
      return { ...current, [date]: rows };
    });
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const body = {
      from,
      to,
      giorni: dates.map((data) => ({
        data,
        voci: (giorni[data] ?? []).filter((row) => row.nome.trim()),
      })),
      sempre: sempre.filter((row) => row.nome.trim()).map((row) => ({ ...row, tipo: "Sempre" })),
    };
    try {
      const response = await fetch("/api/pranzo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setMessage(payload?.error || "Salvataggio non riuscito.");
        return;
      }
      setMessage("Menù della settimana salvato.");
      router.refresh();
    } catch {
      setMessage("Salvataggio non riuscito.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="admin-card" onSubmit={onSubmit}>
      <h2>Menù pranzo della settimana</h2>
      <p>Dal lunedì al venerdì. Il prezzo della riga è facoltativo. La regola dei 14€ è fissa sul sito.</p>
      {expired && saved ? <p className="admin-warn">La settimana salvata è scaduta: sul sito compare il messaggio di attesa.</p> : null}
      <div className="admin-dates">
        <label>
          Dal
          <input type="date" value={from} onChange={(event) => setFrom(event.target.value)} required />
        </label>
        <label>
          Al
          <input type="date" value={to} onChange={(event) => setTo(event.target.value)} required />
        </label>
      </div>
      {dates.map((data) => {
        const rows = giorni[data] ?? [emptyRow()];
        return (
          <fieldset key={data} className="admin-course">
            <legend>{formatWeekdayLong(data)}</legend>
            {rows.map((row, index) => (
              <div key={`${data}-${index}`} className="admin-line">
                <select value={row.tipo} onChange={(event) => setRow(data, index, { tipo: event.target.value as TipoVoce })}>
                  {TIPI.filter((tipo) => tipo !== "Sempre").map((tipo) => (
                    <option key={tipo}>{tipo}</option>
                  ))}
                </select>
                <input value={row.nome} placeholder="Piatto" maxLength={160} onChange={(event) => setRow(data, index, { nome: event.target.value })} />
                <input value={row.prezzo} placeholder="Prezzo" maxLength={20} onChange={(event) => setRow(data, index, { prezzo: event.target.value })} />
                <input value={row.nota} placeholder="Nota" maxLength={180} onChange={(event) => setRow(data, index, { nota: event.target.value })} />
              </div>
            ))}
            <button type="button" onClick={() => setGiorni((current) => ({ ...current, [data]: [...(current[data] ?? [emptyRow()]), emptyRow()] }))}>
              Aggiungi riga
            </button>
          </fieldset>
        );
      })}
      <fieldset className="admin-course">
        <legend>Sempre disponibili</legend>
        {sempre.map((row, index) => (
          <div key={`sempre-${index}`} className="admin-line">
            <input value={row.nome} placeholder="Piatto" maxLength={160} onChange={(event) => setSempre((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, nome: event.target.value } : item)))} />
            <input value={row.prezzo} placeholder="Prezzo" maxLength={20} onChange={(event) => setSempre((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, prezzo: event.target.value } : item)))} />
            <input value={row.nota} placeholder="Nota" maxLength={180} onChange={(event) => setSempre((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, nota: event.target.value } : item)))} />
          </div>
        ))}
        <button type="button" onClick={() => setSempre((current) => [...current, emptyRow()])}>
          Aggiungi riga
        </button>
      </fieldset>
      <button type="submit" disabled={!configured || pending}>
        {pending ? "Salvo…" : "Salva la settimana"}
      </button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}
