"use client";

import { put } from "@vercel/blob/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AdminPranzo } from "@/components/AdminPranzo";
import {
  FOTO_UPLOAD_SECTIONS,
  MENU_PATH,
  isUploadSection,
  sectionLabel,
  type ArchivioFoto,
  type FotoSection,
} from "@/lib/archivio-shared";
import type { MenuPranzo } from "@/lib/pranzo-settimana";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PDF_LIMIT = 15 * 1024 * 1024;
const FOTO_LIMIT = 8 * 1024 * 1024;

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
  photos,
  pranzo,
  environmentLabel,
}: {
  connected: boolean;
  menuUrl: string | null;
  photos: ArchivioFoto[];
  pranzo: MenuPranzo | null;
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

  async function saveMeta(pathname: string, alt: string, section: FotoSection | "menu") {
    const response = await fetch("/api/archivio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pathname, alt, section }),
    });
    if (!response.ok) throw new Error(await readError(response, "Aggiornamento non riuscito"));
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
      await saveMeta(MENU_PATH, "", "menu");
      report("Menù PDF sostituito.");
      form.reset();
      router.refresh();
    } catch (error) {
      report(visibleError(error, "Caricamento non riuscito"), true);
    } finally {
      setPending(false);
    }
  }

  async function onFoto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const file = (form.elements.namedItem("foto") as HTMLInputElement).files?.[0];
    const section = (form.elements.namedItem("sezione") as HTMLSelectElement).value;
    const alt = (form.elements.namedItem("alt") as HTMLInputElement).value.trim();
    if (!file || !isUploadSection(section)) {
      report("Scegli una foto e una sezione.", true);
      return;
    }
    if (!IMAGE_TYPES.includes(file.type)) {
      report("Usa JPG, PNG o WebP.", true);
      return;
    }
    if (file.size > FOTO_LIMIT) {
      report("La foto supera gli 8 MB.", true);
      return;
    }
    if (!alt) {
      report("Scrivi il testo alternativo.", true);
      return;
    }
    setPending(true);
    report("Caricamento della foto in corso…");
    try {
      const body = new FormData();
      body.set("foto", file);
      body.set("alt", alt);
      body.set("sezione", section);
      const response = await fetch("/api/foto", { method: "POST", body });
      if (!response.ok) throw new Error(await readError(response, "Caricamento non riuscito"));
      report("Foto caricata, in WebP.");
      form.reset();
      router.refresh();
    } catch (error) {
      report(visibleError(error, "Caricamento non riuscito"), true);
    } finally {
      setPending(false);
    }
  }

  async function onDelete(pathname: string) {
    if (!window.confirm("Eliminare questa foto?")) return;
    setPending(true);
    report("Eliminazione in corso…");
    try {
      const response = await fetch("/api/archivio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathname }),
      });
      if (!response.ok) throw new Error(await readError(response, "Eliminazione non riuscita"));
      report("Foto eliminata.");
      router.refresh();
    } catch (error) {
      report(visibleError(error, "Eliminazione non riuscita"), true);
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
      <p>Menù PDF, menù pranzo e foto. Le pagine pubbliche si aggiornano al salvataggio.</p>
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

      <AdminPranzo saved={pranzo} />

      <section className="admin-card" aria-labelledby="admin-foto">
        <h2 id="admin-foto">Foto</h2>
        <p>JPG, PNG o WebP. Al caricamento diventano WebP, lato lungo massimo 1600 px. Il testo alternativo è obbligatorio.</p>
        <form onSubmit={onFoto}>
          <label>
            Sezione
            <select name="sezione" defaultValue="burger">
              {FOTO_UPLOAD_SECTIONS.map((section) => (
                <option key={section} value={section}>
                  {sectionLabel[section]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Testo alternativo
            <input name="alt" type="text" required maxLength={180} placeholder="Hamburger al bancone, Down Under Vanzago" />
          </label>
          <label>
            Immagine, massimo 8 MB
            <input name="foto" type="file" accept="image/jpeg,image/png,image/webp" required />
          </label>
          <button className="pill btn-solid" type="submit" disabled={pending}>
            {pending ? "Caricamento…" : "Carica la foto"}
          </button>
        </form>
        <ul className="admin-list">
          {photos.map((photo) => (
            <li key={photo.pathname}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt="" />
              <div>
                <strong>{sectionLabel[photo.section]}</strong>
                <p>{photo.alt}</p>
                <button type="button" onClick={() => onDelete(photo.pathname)} disabled={pending}>
                  Elimina
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
