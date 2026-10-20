"use client";

import { upload } from "@vercel/blob/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  FOTO_SECTIONS,
  MENU_PATH,
  fotoPath,
  isFotoSection,
  sectionLabel,
  type ArchivioFoto,
  type FotoSection,
} from "@/lib/archivio-shared";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PDF_LIMIT = 15 * 1024 * 1024;
const FOTO_LIMIT = 8 * 1024 * 1024;

export function AdminPanel({
  configured,
  menuUrl,
  photos,
}: {
  configured: boolean;
  menuUrl: string | null;
  photos: ArchivioFoto[];
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function saveMeta(pathname: string, alt: string, section: FotoSection | "menu") {
    const response = await fetch("/api/archivio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pathname, alt, section }),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(body?.error || "Aggiornamento non riuscito");
    }
  }

  async function onMenu(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("pdf") as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setMessage("Il menù dev’essere un PDF.");
      return;
    }
    if (file.size > PDF_LIMIT) {
      setMessage("Il PDF supera i 15 MB.");
      return;
    }
    setPending(true);
    setMessage("");
    try {
      await upload(MENU_PATH, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: "application/pdf",
      });
      await saveMeta(MENU_PATH, "", "menu");
      setMessage("Menù PDF sostituito.");
      event.currentTarget.reset();
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Caricamento non riuscito");
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
    if (!file || !isFotoSection(section)) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      setMessage("Usa JPG, PNG o WebP.");
      return;
    }
    if (file.size > FOTO_LIMIT) {
      setMessage("La foto supera gli 8 MB.");
      return;
    }
    if (!alt) {
      setMessage("Scrivi il testo alternativo.");
      return;
    }
    setPending(true);
    setMessage("");
    try {
      const pathname = fotoPath(section, file.name);
      await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: file.type,
        clientPayload: JSON.stringify({ alt, section }),
      });
      await saveMeta(pathname, alt, section);
      setMessage("Foto caricata.");
      form.reset();
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Caricamento non riuscito");
    } finally {
      setPending(false);
    }
  }

  async function onDelete(pathname: string) {
    if (!window.confirm("Eliminare questa foto?")) return;
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/archivio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathname }),
      });
      if (!response.ok) throw new Error("Eliminazione non riuscita");
      setMessage("Foto eliminata.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Eliminazione non riuscita");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-wrap">
      <h1>Archivio</h1>
      <p>Menù PDF e foto del locale. Le pagine pubbliche si aggiornano al salvataggio.</p>
      {!configured ? <p className="admin-warn">Manca BLOB_READ_WRITE_TOKEN: gli upload non possono partire.</p> : null}
      {message ? <p className="admin-message">{message}</p> : null}

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
          <button className="pill btn-solid" type="submit" disabled={pending || !configured}>
            Sostituisci il menù
          </button>
        </form>
      </section>

      <section className="admin-card" aria-labelledby="admin-foto">
        <h2 id="admin-foto">Foto</h2>
        <form onSubmit={onFoto}>
          <label>
            Sezione
            <select name="sezione" defaultValue="burger">
              {FOTO_SECTIONS.map((section) => (
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
          <button className="pill btn-solid" type="submit" disabled={pending || !configured}>
            Carica la foto
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
