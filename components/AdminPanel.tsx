"use client";

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
}: {
  connected: boolean;
  menuUrl: string | null;
  environmentLabel: string;
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
        const body = new FormData();
        body.set("phase", "part");
        body.set("uploadId", uploadId);
        body.set("index", String(index));
        body.set("total", String(total));
        body.set("chunk", file.slice(index * chunkSize, (index + 1) * chunkSize), "parte.pdf");
        const response = await fetch("/api/upload", { method: "POST", body });
        if (!response.ok) throw new Error(await readError(response, "Caricamento non riuscito"));
      }
      report("Salvataggio del menù…");
      const done = new FormData();
      done.set("phase", "complete");
      done.set("uploadId", uploadId);
      done.set("total", String(total));
      const response = await fetch("/api/upload", { method: "POST", body: done });
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
