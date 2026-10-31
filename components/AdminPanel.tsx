"use client";

import { FOTO_UPLOAD_SECTIONS, sectionLabel } from "@/lib/archivio-shared";
import type { DelMese } from "@/lib/del-mese";
import { CONTORNI_SEMPRE } from "@/lib/pranzo-settimana";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const PDF_LIMIT = 15 * 1024 * 1024;

function visibleError(error: unknown, fallback: string): string {
  const raw = error instanceof Error ? error.message : fallback;
  if (/vercel_blob|eyJ[A-Za-z0-9_-]{8,}/.test(raw)) return fallback;
  return raw || fallback;
}

async function readError(response: Response, fallback: string): Promise<string> {
  const payload = (await response.json().catch(() => null)) as { error?: string } | null;
  return payload?.error || fallback;
}

export function AdminPanel({
  connected,
  menuUrl,
  environmentLabel,
  delMese,
}: {
  connected: boolean;
  menuUrl: string | null;
  environmentLabel: string;
  delMese: DelMese;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);

  function report(text: string, isError = false) {
    setMessage(text);
    setFailed(isError);
  }

  async function onMenu(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("pdf") as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      report("Scegli un PDF.", true);
      return;
    }
    const pdfName = file.name.toLowerCase().endsWith(".pdf");
    const pdfType = !file.type || file.type === "application/pdf";
    if (!pdfName || !pdfType) {
      report("Il menù dev’essere un PDF.", true);
      return;
    }
    if (file.size > PDF_LIMIT) {
      report("Il PDF supera i 15 MB.", true);
      return;
    }
    setPending(true);
    try {
      const uploadId = crypto.randomUUID();
      const chunkSize = 3 * 1024 * 1024;
      const total = Math.ceil(file.size / chunkSize);
      for (let index = 0; index < total; index += 1) {
        report(`Caricamento del PDF, parte ${index + 1} di ${total}…`);
        const params = new URLSearchParams({
          phase: "part",
          uploadId,
          index: String(index),
          total: String(total),
        });
        const response = await fetch(`/api/upload?${params}`, {
          method: "POST",
          headers: { "Content-Type": "application/octet-stream" },
          body: file.slice(index * chunkSize, (index + 1) * chunkSize),
        });
        if (!response.ok) throw new Error(await readError(response, "Caricamento non riuscito"));
      }
      report("Salvataggio del menù…");
      const done = new URLSearchParams({ phase: "complete", uploadId, total: String(total) });
      const response = await fetch(`/api/upload?${done}`, { method: "POST" });
      if (!response.ok) throw new Error(await readError(response, "Caricamento non riuscito"));
      report("Menù PDF sostituito.");
      form.reset();
      router.refresh();
    } catch (error) {
      report(visibleError(error, "Caricamento non riuscito"), true);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-wrap">
      <h1>Archivio</h1>
      <p className={connected ? "admin-status" : "admin-status is-missing"} role="status">
        {connected ? `Archivio: ${environmentLabel} collegato` : "Archivio: token mancante"}
      </p>
      <p>Il menù in PDF. La pagina pubblica si aggiorna al salvataggio.</p>
      {message ? (
        <p className={failed ? "admin-message is-error" : "admin-message"} role="status">
          {message}
        </p>
      ) : null}

      <section className="admin-card" aria-labelledby="admin-contorni">
        <h2 id="admin-contorni">Contorni sempre disponibili</h2>
        <p>Restano questi, anche la prossima settimana. Il contorno del giorno si cambia con il menù di quel giorno.</p>
        <ul>
          {CONTORNI_SEMPRE.map((voce) => (
            <li key={voce.nome}>{voce.nome}</li>
          ))}
        </ul>
      </section>

      <section className="admin-card" aria-labelledby="admin-mese">
        <h2 id="admin-mese">Del mese</h2>
        <p>Nome e descrizione restano qui. Il bollino «novità del mese» usa invece le cartelle foto Novità panino, Novità pizza e Novità specialità: se la cartella è vuota, quel riquadro non compare.</p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setPending(true);
            try {
              const response = await fetch("/api/mese", { method: "POST", body: new FormData(event.currentTarget) });
              if (!response.ok) throw new Error(await readError(response, "Salvataggio non riuscito"));
              report("Del mese salvato.");
              router.refresh();
            } catch (error) {
              report(visibleError(error, "Salvataggio non riuscito"), true);
            } finally {
              setPending(false);
            }
          }}
        >
          <fieldset>
            <legend>Panino del mese</legend>
            <label>
              Nome
              <input name="paninoNome" defaultValue={delMese.panino?.nome ?? ""} maxLength={80} />
            </label>
            <label>
              Descrizione breve
              <input name="paninoDescrizione" defaultValue={delMese.panino?.descrizione ?? ""} maxLength={240} />
            </label>
            <label>
              Mese
              <input name="paninoMese" type="month" defaultValue={delMese.panino?.mese ?? ""} />
            </label>
            <label>
              Foto, JPG PNG o WebP, massimo 4 MB
              <input name="paninoFoto" type="file" accept="image/jpeg,image/png,image/webp" />
            </label>
            {delMese.panino?.foto ? <p>C’è già una foto. Se non ne scegli un’altra, resta quella.</p> : null}
          </fieldset>
          <fieldset>
            <legend>Pizza del mese</legend>
            <label>
              Nome
              <input name="pizzaNome" defaultValue={delMese.pizza?.nome ?? ""} maxLength={80} />
            </label>
            <label>
              Descrizione breve
              <input name="pizzaDescrizione" defaultValue={delMese.pizza?.descrizione ?? ""} maxLength={240} />
            </label>
            <label>
              Mese
              <input name="pizzaMese" type="month" defaultValue={delMese.pizza?.mese ?? ""} />
            </label>
            <label>
              Foto, JPG PNG o WebP, massimo 4 MB
              <input name="pizzaFoto" type="file" accept="image/jpeg,image/png,image/webp" />
            </label>
            {delMese.pizza?.foto ? <p>C’è già una foto. Se non ne scegli un’altra, resta quella.</p> : null}
          </fieldset>
          <button className="pill btn-solid" type="submit" disabled={pending}>
            {pending ? "Salvataggio…" : "Salva del mese"}
          </button>
        </form>
      </section>

      <section className="admin-card" aria-labelledby="admin-foto">
        <h2 id="admin-foto">Foto</h2>
        <p>
          Pranzo, burger, carne e specialità riempiono i riquadri: se ne carichi molte, si vedono tutte. Il nome che scrivi compare sotto la foto. Novità panino, Novità pizza e Novità specialità sono le cartelle del mese: senza foto, il riquadro con il bollino non si mostra.
        </p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            setPending(true);
            try {
              const response = await fetch("/api/foto", { method: "POST", body: new FormData(form) });
              if (!response.ok) throw new Error(await readError(response, "Caricamento non riuscito"));
              report("Foto salvata.");
              form.reset();
              router.refresh();
            } catch (error) {
              report(visibleError(error, "Caricamento non riuscito"), true);
            } finally {
              setPending(false);
            }
          }}
        >
          <label>
            Categoria
            <select name="sezione" required defaultValue="lunch">
              {FOTO_UPLOAD_SECTIONS.map((section) => (
                <option key={section} value={section}>
                  {sectionLabel[section]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Nome, compare sotto la foto
            <input name="alt" required maxLength={80} placeholder="es. Bacon burger" />
          </label>
          <label>
            Foto, massimo 4 MB
            <input name="foto" type="file" accept="image/jpeg,image/png,image/webp" required />
          </label>
          <button className="pill btn-solid" type="submit" disabled={pending}>
            {pending ? "Caricamento…" : "Carica la foto"}
          </button>
        </form>
      </section>

      <section className="admin-card" aria-labelledby="admin-menu">
        <h2 id="admin-menu">Menù PDF</h2>
        <p>{menuUrl ? "C’è già un PDF online." : "Nessun PDF caricato."}</p>
        {menuUrl ? (
          <p>
            <Link href="/menu/pdf">Apri il PDF corrente</Link>
          </p>
        ) : null}
        <form onSubmit={onMenu}>
          <label>
            File PDF, massimo 15 MB
            <input name="pdf" type="file" accept="application/pdf,.pdf" required />
          </label>
          <button className="pill btn-solid" type="submit" disabled={pending}>
            {pending ? "Caricamento…" : "Sostituisci il menù"}
          </button>
        </form>
      </section>
    </div>
  );
}
