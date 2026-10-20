# Down Under Cafè — Vanzago

Sito della home e delle pagine locali. Next.js (App Router), TypeScript. Menù PDF e foto dei piatti stanno su Vercel Blob; i murales stanno in `public/murales/`.

## Avvio in locale

Serve Node.js 20 o successivo.

```bash
npm install
npm run dev
```

Copia `.env.example` in `.env.local` e compila token Blob, password admin e URL del sito. `.env.local` non va committato.

Apri [http://localhost:3000](http://localhost:3000). L’archivio è su `/admin` (utente `admin`, password `ADMIN_PASSWORD`).

Altri comandi:

```bash
npm run build
npm run start
npm run lint
```

## Modificare i contenuti

I testi della home stanno in `content/site.ts`. Indirizzo e telefono stanno in `data/locale.ts`. Le pagine di zona stanno in `data/pagine-locali.ts`. Voci del menù HTML stanno in `data/menu.ts`.

Orari, prezzi, P. IVA e coordinate non confermati sono segnaposto: `[orari da confermare]`, `[prezzo da confermare]`, `[P. IVA]`, `[latitudine]`, `[longitudine]`. Finché `hours` in `data/locale.ts` è `null`, la tabella e il badge mostrano il segnaposto e il JSON-LD non pubblica orari, fascia di prezzo né coordinate.

Quando il locale conferma gli orari, `hours` diventa un array di minuti dalla mezzanotte, fuso Europe/Rome. Se la chiusura è dopo mezzanotte, il minuto di chiusura supera 1440. L’indice segue `Date.getDay()`: 0 domenica, 1 lunedì, … 6 sabato. A quel punto il badge «aperto ora» si calcola nel browser e il JSON-LD emette `openingHoursSpecification`.

## Foto e menù PDF

I murales sono in `public/murales/`. Le foto di piatti, sala, garden ed eventi si caricano da `/admin` e finiscono su Vercel Blob, nelle sezioni `burger`, `pizza`, `bancone`, `sala`, `garden`, `eventi`. Senza foto, il riquadro mostra un murale.

Il PDF del menù si sostituisce dalla stessa pagina e si scarica da `/menu/pdf`. Il menù testuale, quello che legge Google, è `/menu`.

## Pubblicare su Vercel

1. Metti il progetto su un repository Git. Non includere `.env.local`.
2. Su [vercel.com](https://vercel.com) importa il repository e collega lo store Blob (Storage → Blob → Connect).
3. In Project → Settings → Environment Variables imposta `BLOB_READ_WRITE_TOKEN` e `ADMIN_PASSWORD`. Nessuno dei due ha un valore di default nel codice.
4. `NEXT_PUBLIC_SITE_URL` va impostata solo quando c’è il dominio definitivo, e solo in produzione se vuoi che Google indicizzi. Finché manca, tutto il sito — produzione compresa — risponde `noindex`. Sitemap, robots e canonical usano quella variabile se c’è; altrimenti l’host di produzione Vercel in produzione e l’host del branch in preview.
5. Framework: Next.js. Deploy.

Il comando `npm run build` deve terminare senza errori prima del deploy. La checklist fuori dal codice sta in `README-SEO.md`.
