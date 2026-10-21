"use client";

import { put } from "@vercel/blob/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { MENU_PATH } from "@/lib/archivio-shared";

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

async function uploadWithToken(pathname: string, file: File, contentType: string): Promise<void> {
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "blob.generate-client-token",
      payload: { pathname, clientPayload: null, multipart: false },
    }),
  });
  const payload = (await response.json().catch(() => null)) as { error?: string; clientToken?: string } | null;
  if (!response.ok || !payload?.clientToken) {
    throw new Error(payload?.error || "Caricamento non riuscito");
  }
  await put(pathname, file, { access: "public", token: payload.clientToken, contentType });
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
    if (file.type !== "application/pdf") {
      report("Il menù dev’essere un PDF.", true);
      return;
    }
    if (file.size > PDF_LIMIT) {
      report("Il PDF supera i 15 MB.", true);
      return;
    }
    setPending(true);
    report("Caricamento del PDF in corso…");
    try {
      await uploadWithToken(MENU_PATH, file, "application/pdf");
      const response = await fetch("/api/archivio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathname: MENU_PATH, alt: "", section: "menu" }),
      });
      if (!response.ok) throw new Error(await readError(response, "Aggiornamento non riuscito"));
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
