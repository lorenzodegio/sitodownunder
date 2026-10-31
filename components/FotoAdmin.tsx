"use client";

import { FOTO_SLOTS, GRUPPI_SLOT, slotById } from "@/data/foto-slot";
import {
  REGOLA_NOME_FILE,
  descrizioneFoto,
  leggiNomeFile,
  percorsoSlot,
  piattoDaMenu,
  slugPiatto,
} from "@/lib/foto-nome";
import type { SlotRecord } from "@/lib/slot-types";
import { useRouter } from "next/navigation";
import { useMemo, useState, type MouseEvent } from "react";

type Suggerimento = { nome: string; testo: string };
type Bozza = { piatto: string; descrizione: string; focusX: number; focusY: number; file: File | null; preview: string | null };
type InAttesa = { id: string; file: File; slot: string; piatto: string };

function iniziali(records: Record<string, SlotRecord | undefined>): Record<string, Bozza> {
  const stato: Record<string, Bozza> = {};
  for (const slot of FOTO_SLOTS) {
    const record = records[slot.id];
    stato[slot.id] = {
      piatto: record?.piatto ?? "",
      descrizione: record?.descrizione ?? "",
      focusX: record?.focusX ?? 50,
      focusY: record?.focusY ?? 50,
      file: null,
      preview: null,
    };
  }
  return stato;
}

function dataBreve(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("it-IT", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Rome" }).format(new Date(iso));
}

async function leggiErrore(response: Response): Promise<string> {
  const payload = (await response.json().catch(() => null)) as { error?: string } | null;
  return payload?.error || "Salvataggio non riuscito";
}

export function FotoAdmin({
  connesso,
  records,
  suggerimenti,
}: {
  connesso: boolean;
  records: Record<string, SlotRecord | undefined>;
  suggerimenti: readonly Suggerimento[];
}) {
  const router = useRouter();
  const [locali, setLocali] = useState(() => iniziali(records));
  const [attesa, setAttesa] = useState<InAttesa[]>([]);
  const [pending, setPending] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [errore, setErrore] = useState(false);
  const [anteprima, setAnteprima] = useState<string | null>(null);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const nomi = useMemo(() => suggerimenti.map((voce) => voce.nome), [suggerimenti]);

  function aggiorna(id: string, patch: Partial<Bozza>) {
    setLocali((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  function scegliPiatto(id: string, piatto: string) {
    const testo = piattoDaMenu(piatto, suggerimenti);
    const descrizione = piatto.trim() ? descrizioneFoto(piatto, testo) : locali[id].descrizione;
    aggiorna(id, { piatto, descrizione });
  }

  function scegliFile(id: string, file: File | null) {
    const attuale = locali[id];
    if (attuale.preview) URL.revokeObjectURL(attuale.preview);
    aggiorna(id, { file, preview: file ? URL.createObjectURL(file) : null });
  }

  function puntoFocale(id: string, event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const focusX = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const focusY = Math.round(((event.clientY - rect.top) / rect.height) * 100);
    aggiorna(id, { focusX, focusY });
  }

  async function invia(id: string, action: "bozza" | "pubblica" | "elimina" | "ripristina", extra?: { file?: File; versione?: number; piatto?: string; descrizione?: string }) {
    const bozza = locali[id];
    const form = new FormData();
    form.set("slot", id);
    form.set("action", action);
    form.set("piatto", extra?.piatto ?? bozza?.piatto ?? "");
    form.set("descrizione", extra?.descrizione ?? bozza?.descrizione ?? "");
    form.set("focusX", String(bozza?.focusX ?? 50));
    form.set("focusY", String(bozza?.focusY ?? 50));
    const file = extra?.file ?? bozza?.file;
    if (file && action !== "elimina" && action !== "ripristina") form.set("foto", file);
    if (extra?.versione !== undefined) form.set("versione", String(extra.versione));
    setPending(id);
    setErrore(false);
    try {
      const response = await fetch("/api/foto-slot", { method: "POST", body: form });
      if (!response.ok) throw new Error(await leggiErrore(response));
      if (bozza?.preview) URL.revokeObjectURL(bozza.preview);
      aggiorna(id, { file: null, preview: null });
      setMessaggio(action === "pubblica" ? "Foto pubblicata." : action === "elimina" ? "Foto tolta. Puoi ripristinarla." : "Bozza salvata.");
      router.refresh();
      return true;
    } catch (error) {
      setErrore(true);
      setMessaggio(error instanceof Error ? error.message : "Salvataggio non riuscito");
      return false;
    } finally {
      setPending("");
    }
  }

  async function caricaMolti(files: File[]) {
    const daAssegnare: InAttesa[] = [];
    for (const file of files) {
      const letto = leggiNomeFile(file.name);
      if (!letto) {
        daAssegnare.push({ id: `${file.name}-${file.size}`, file, slot: "", piatto: "" });
        continue;
      }
      const testo = piattoDaMenu(letto.piatto, suggerimenti);
      await invia(letto.slot, "bozza", { file, piatto: letto.piatto, descrizione: descrizioneFoto(letto.piatto, testo) });
    }
    if (daAssegnare.length) setAttesa((prev) => [...prev, ...daAssegnare]);
  }

  return (
    <div className="admin-wrap larga">
      <h1>Foto</h1>
      <p className={connesso ? "admin-status" : "admin-status is-missing"} role="status">
        {connesso ? "Archivio collegato." : "Manca il token Blob di questo ambiente."}
      </p>
      <p>{REGOLA_NOME_FILE}</p>
      <p>Sul sito pubblico vanno solo le foto pubblicate. La bozza si vede qui e nella preview. Un clic sulla foto sceglie il punto focale.</p>
      {messaggio ? (
        <p className={errore ? "admin-message is-error" : "admin-message"} role="status">
          {messaggio}
        </p>
      ) : null}

      <div
        className="slot-drop"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const files = Array.from(event.dataTransfer.files);
          if (files.length) void caricaMolti(files);
        }}
      >
        <p>Trascina una o più foto. Se il nome è nel formato giusto, ognuna entra nel suo slot.</p>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,.heic,.heif"
          multiple
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            if (files.length) void caricaMolti(files);
            event.target.value = "";
          }}
        />
      </div>

      {attesa.length ? (
        <section className="admin-card" aria-labelledby="da-assegnare">
          <h2 id="da-assegnare">Da assegnare</h2>
          {attesa.map((voce) => (
            <div key={voce.id} className="admin-line">
              <span>{voce.file.name}</span>
              <select value={voce.slot} onChange={(event) => setAttesa((prev) => prev.map((item) => (item.id === voce.id ? { ...item, slot: event.target.value } : item)))}>
                <option value="">Scegli lo slot</option>
                {FOTO_SLOTS.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {slot.etichetta}
                  </option>
                ))}
              </select>
              <button
                className="pill btn-solid"
                type="button"
                disabled={!voce.slot || pending === voce.slot}
                onClick={() => {
                  const slot = voce.slot;
                  const piatto = voce.piatto || voce.file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
                  void invia(slot, "bozza", { file: voce.file, piatto, descrizione: descrizioneFoto(piatto) }).then((ok) => {
                    if (ok) setAttesa((prev) => prev.filter((item) => item.id !== voce.id));
                  });
                }}
              >
                Assegna
              </button>
            </div>
          ))}
        </section>
      ) : null}

      {GRUPPI_SLOT.map((gruppo) => (
        <section key={gruppo.id} className="admin-card" aria-labelledby={`gruppo-${gruppo.id}`}>
          <h2 id={`gruppo-${gruppo.id}`}>{gruppo.label}</h2>
          <div className="slot-admin">
            {FOTO_SLOTS.filter((slot) => slot.gruppo === gruppo.id).map((slot) => {
              const record = records[slot.id];
              const bozza = locali[slot.id];
              const definizione = slotById(slot.id);
              const percorso = percorsoSlot(definizione.sezione, definizione.prefisso, slugPiatto(bozza.piatto));
              const src = bozza.preview || record?.url || "";
              const formato = slot.formato === "4:3" ? "landscape" : slot.formato === "1:1" ? "square" : "";
              return (
                <article key={slot.id} className="slot-card">
                  <div
                    className={`photo-frame ${formato} ${src ? "has-image" : "is-slot"}`}
                    onClick={src ? (event) => puntoFocale(slot.id, event) : undefined}
                    style={
                      src
                        ? {
                            backgroundImage: `url("${src}")`,
                            backgroundSize: "cover",
                            backgroundPosition: `${bozza.focusX}% ${bozza.focusY}%`,
                          }
                        : undefined
                    }
                  >
                    {src ? null : (
                      <>
                        <span className="slot-num">{slot.etichetta}</span>
                        <span className="slot-hint">{slot.hint}</span>
                      </>
                    )}
                  </div>
                  <label>
                    Nome del piatto
                    <input list="piatti-noti" value={bozza.piatto} onChange={(event) => scegliPiatto(slot.id, event.target.value)} />
                  </label>
                  <label>
                    Descrizione, è il testo alternativo
                    <textarea value={bozza.descrizione} maxLength={300} onChange={(event) => aggiorna(slot.id, { descrizione: event.target.value })} />
                  </label>
                  {bozza.descrizione.length > 125 ? <p className="slot-warn">Supera i 125 caratteri.</p> : null}
                  <p className="slot-file">{percorso}</p>
                  <p>
                    {record?.stato === "pubblicata" ? "Pubblicata" : "Bozza"}
                    {record?.aggiornata ? ` · ${dataBreve(record.aggiornata)}` : ""}
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/heic,.heic,.heif"
                    onChange={(event) => scegliFile(slot.id, event.target.files?.[0] ?? null)}
                  />
                  <button className="pill btn-solid" type="button" disabled={!connesso || pending === slot.id} onClick={() => void invia(slot.id, "bozza")}>
                    Salva bozza
                  </button>
                  <button className="pill btn-solid" type="button" disabled={!connesso || pending === slot.id || !bozza.descrizione.trim()} onClick={() => void invia(slot.id, "pubblica")}>
                    Pubblica
                  </button>
                  <button className="pill btn-ink-ghost" type="button" disabled={!connesso || pending === slot.id} onClick={() => setAnteprima(gruppo.anteprima)}>
                    Anteprima sezione
                  </button>
                  {record?.url ? (
                    <button className="pill btn-ink-ghost" type="button" disabled={!connesso || pending === slot.id} onClick={() => void invia(slot.id, "elimina")}>
                      Togli la foto
                    </button>
                  ) : null}
                  {record?.versioniPrecedenti.map((versione, index) => (
                    <button key={versione.pathname} className="pill btn-ink-ghost" type="button" disabled={!connesso || pending === slot.id} onClick={() => void invia(slot.id, "ripristina", { versione: index })}>
                      Ripristina {dataBreve(versione.aggiornata)}
                    </button>
                  ))}
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <datalist id="piatti-noti">
        {nomi.map((nome) => (
          <option key={nome} value={nome} />
        ))}
      </datalist>

      {anteprima ? (
        <section className="admin-card" aria-label="Anteprima sezione">
          <h2>Anteprima</h2>
          <div className="admin-nav">
            <button className="pill btn-solid" type="button" onClick={() => setViewport("desktop")}>
              Desktop
            </button>
            <button className="pill btn-solid" type="button" onClick={() => setViewport("mobile")}>
              Mobile
            </button>
          </div>
          <iframe className={viewport === "mobile" ? "anteprima-iframe mobile" : "anteprima-iframe"} title="Anteprima della sezione" src={`/admin/foto/anteprima?sezione=${anteprima}`} />
        </section>
      ) : null}
    </div>
  );
}
