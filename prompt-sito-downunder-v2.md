# PROMPT AGGIUNTIVO — Down Under Cafè (Next.js su Vercel)

> Da incollare nell'IA di sviluppo **dopo** il prompt base già usato per il sito.
> Il prompt base resta valido: stack, stile, palette, font, sezioni e tono.
> Questo prompt aggiunge tre cose:
> 1. le grafiche reali del locale;
> 2. l'archiviazione del menù PDF e delle foto su Vercel Blob;
> 3. l'indicizzazione SEO locale.

---

## 0. Contesto rapido

- **Locale:** Down Under Cafè, burger, pizza & cocktail bar, "Lunch & Happy Hour, since 2010".
- **Indirizzo:** Via Primo Maggio 1, 20043 Vanzago (MI).
- **Telefono / WhatsApp:** +39 338 439 5727.
- **Instagram:** https://www.instagram.com/downundercafe/
- **Tema:** il locale è arredato con murales ispirati ai romanzi di Jules Verne. Il sito racconta ogni sezione come un "capitolo".
- **Lingua:** italiano, `lang="it"`, locale `it_IT`.
- **Orari, prezzi, P. IVA e coordinate non sono confermati.** Nel sito restano segnaposto tra parentesi (`[orari da confermare]`, `[prezzo da confermare]`, `[P. IVA]`, `[latitudine]`, `[longitudine]`). Non inventarli.
- Tieni gli orari in **un solo file dati** (`/data/locale.ts`). Finché `hours` è `null`, la UI mostra il segnaposto e il JSON-LD non emette orari. Quando il locale li conferma, l'array (minuti da mezzanotte, Europe/Rome) alimenta UI, badge e `openingHoursSpecification`.

---

## 1. Grafiche del locale (murales Jules Verne)

Nella cartella `/public/murales/` metti i file dello zip allegato. Sono già scontornati: PNG con trasparenza, inchiostro scuro.

| File | Cosa rappresenta | Dove usarlo |
|---|---|---|
| `logo-scudo.png` | Logo ufficiale a scudo: "Lunch & Happy Hour · Down Under Cafè · Since 2010 · Vanzago" | Hero, al posto di qualsiasi stemma disegnato a mano. Leggera animazione "bob" |
| `dirigibile.png` | Dirigibile | Hero: vola in alto a destra (animazione `fly`), colore chiaro |
| `mano-welcome.png` | Mano che indica "WELCOME →" | Sopra il titolo del capitolo I |
| `centro-terra.png` | Lettering "Voyage au centre de la Terre" | Tile nella griglia foto del capitolo I, su fondo scuro |
| `mongolfiera.png` | Mongolfiera "Il giro del mondo in 80 giorni" | Sezione pausa pranzo ("Il giro del pranzo in 60 minuti") |
| `polpo.png` | Polpo gigante + palombaro, "20.000 leghe sotto i mari" | Sezione menù ("E tu cosa scegli?"). La scritta piccola "1870 Jules Verne" sotto il polpo è **già stata rimossa**: non rimetterla, e non aggiungere didascalie sotto il polpo |
| `camaleonte.png` | Scheletro di camaleonte con fumetto "yo!" | Decorazione della sezione serate |
| `gabbie-pesci.png` | "Vivere ardendo e non bruciarsi mai", gabbie con pesci | Galleria "Ogni parete, un libro" |
| `gabbie.png` | Voliera di gabbie sospese | Galleria |
| `caverna-duc.png` | Caverna con fossili e monogramma DUC | Galleria |
| `faro-fine-mondo.png` | Lettering "Il faro alla fine del mondo" | Galleria |
| `rosam.png` | "Rosam cape, spinam cave" | Galleria |
| `order-here.png` | "Order here / Wait the shaking / Drink eat enjoy / Pay here" | Galleria |
| `faro.png` | Faro con monogramma DUC tra le nuvole | Sezione orari e contatti ("Segui il faro") |
| `carpe-diem.png` | Cartigli "L'impossibile non è un limite, è una sfida" | Footer |
| `mano-toilettes.png` | Mano "Toilettes" | Facoltativo, easter egg |
| `flyer-happyhour.jpg`, `flyer-pranzo.jpg`, `flyer-generico.jpg` | Flyer originali dell'inaugurazione del 22/11/2010 | Sezione feste ed eventi, a ventaglio con nastro "dall'archivio · 22 novembre 2010" |

Regole per le grafiche:

- **Ricolorazione.** I PNG sono inchiostro scuro su sfondo trasparente.
  - Sulle sezioni scure usa la classe `.inv { filter: invert(1) sepia(.12) brightness(1.03) }`.
  - In alternativa usa `mask-image` + `background-color: var(--paper)` per la versione "stilizzata" monocromatica.
  - Niente versioni a colori: tutto resta inchiostro, carta e accento.
- **Immagini.** Usa sempre `next/image` con `width` e `height` reali, così non ci sono layout shift.
  - Le immagini sotto la piega vanno con `loading="lazy"`.
  - Il logo nella hero va con `priority`.
- **Alt text.** Ogni grafica ha un alt descrittivo in italiano, per esempio "Murale del polpo gigante: 20.000 leghe sotto i mari, Down Under Cafè Vanzago". Le grafiche puramente decorative usano `alt=""` e `aria-hidden`.
- **Galleria "capitolo V · il locale è un romanzo — Ogni parete, un libro".** Layout a colonne (masonry con CSS `columns`). Card alternate carta/inchiostro, ognuna con titolo e una riga che dice dove si trova il murale nel locale.
- **Animazioni.** Rispetta `prefers-reduced-motion` e disattiva tutto.

---

## 2. Vercel Blob: menù PDF e foto

### 2.1 Variabili d'ambiente

Le chiavi **non** vanno nel codice. Vanno in `.env.local`, che deve stare in `.gitignore`, e su Vercel in Project → Settings → Environment Variables, per Production, Preview e Development:

```
BLOB_STORE_ID=
BLOB_READ_WRITE_TOKEN=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=
```

- Il token è **solo server-side**. Mai prefisso `NEXT_PUBLIC_`, mai in un client component, mai nei log.
- `BLOB_STORE_ID` serve solo come riferimento, perché l'SDK usa il token.
- Il modo più pulito è collegare lo store al progetto dalla dashboard Vercel (Storage → Blob → Connect), che inserisce il token da solo.

### 2.2 Implementazione

- Installa `@vercel/blob`.
- **Struttura dei percorsi:**
  - `menu/menu-down-under.pdf` per il menù. È un percorso fisso: `addRandomSuffix: false` e `allowOverwrite: true`, così il link resta sempre uguale.
  - `foto/<sezione>/<nome>.jpg` per le foto. Sezioni previste: `burger`, `pizza`, `bancone`, `sala`, `garden`, `eventi`.
- **Pagina `/admin`**, protetta da password tramite `middleware.ts`: Basic Auth contro `ADMIN_PASSWORD`, con `noindex` e fuori dalla sitemap. Funzioni:
  - caricare o sostituire il **menù PDF**;
  - caricare foto scegliendo la sezione, con anteprima, testo alternativo (salvato nei metadati o in un piccolo `foto/index.json` sul Blob) ed eliminazione.
- **Upload.** Usa il **client upload** di Vercel Blob (`handleUpload` in una Route Handler `app/api/upload/route.ts` + `upload()` dal client). Così si superano i limiti di dimensione delle Server Actions. Nella route, `onBeforeGenerateToken` deve:
  - verificare l'autenticazione admin;
  - limitare i `allowedContentTypes` a `application/pdf`, `image/jpeg`, `image/png`, `image/webp`;
  - limitare la dimensione massima: 15 MB per il PDF, 8 MB per le foto.
- **Lettura lato sito.** Usa `list({ prefix: 'foto/<sezione>/' })` e `head('menu/menu-down-under.pdf')` in Server Components, con revalidate (ISR) di 1 ora. Dopo ogni upload chiama `revalidatePath('/')` e le pagine locali (§3.3).
- **next.config.** In `images.remotePatterns` aggiungi `https://*.public.blob.vercel-storage.com`.
- **Pulsante "Scarica il menù in PDF".**
  - Punta a `/menu`, una route che fa redirect 307 all'URL Blob corrente. Così il link pubblico è stabile e indicizzabile.
  - Se il PDF non esiste, `/menu` mostra una pagina HTML con il menù testuale.
- **Fallback.** Se una sezione non ha foto, mostra il placeholder tratteggiato attuale con un murale al posto del testo "foto …". Niente box vuoti in produzione.
- **Menù anche in HTML.** Pubblica il menù anche come testo nella pagina `/menu`, con piatti e prezzi presi da un file dati: Google non legge bene i PDF come pagine di un ristorante.

---

## 3. SEO e indicizzazione locale

Obiettivo: comparire per ricerche come:

- "mangiare un hamburger in provincia di Milano"
- "hamburger Rho"
- "pizzeria Vanzago"
- "pranzo di lavoro vicino Rho"
- "aperitivo Rho"
- "ristorante vicino Fiera Milano Rho"
- "dove festeggiare compleanno Vanzago"

### 3.1 Basi tecniche (App Router)

- **Metadata API**, in `layout.tsx` e per ogni pagina:
  - `title` con template `%s · Down Under Cafè Vanzago`;
  - `description` unica per pagina, 140–160 caratteri, con luogo e cosa si mangia;
  - `alternates.canonical`;
  - `openGraph` (`it_IT`, immagine 1200×630 generata con `next/og` usando logo, murale e titolo);
  - `twitter`;
  - `robots`.
- **Home.**
  - Title: "Down Under Cafè · Burger, pizza e aperitivo a Vanzago (Rho, Milano)".
  - Description: "Hamburger, pizza e cocktail tra i murales di Jules Verne. Pranzo di lavoro, aperitivo e cena a Vanzago, a due passi da Rho. Prenota: 338 439 5727."
  - Un solo `h1` per pagina con le parole chiave in forma naturale. In home il titolo creativo "Pranzo. Ape. Cena." resta visivo, mentre l'`h1` semantico include "Burger, pizza e aperitivo a Vanzago". Si può usare un sottotitolo visibile, non testo nascosto.
- **`app/sitemap.ts`**: tutte le pagine pubbliche con `lastModified`. **`app/robots.ts`**: consente tutto tranne `/admin` e `/api`, e indica la sitemap.
- **Core Web Vitals**:
  - `next/font` per Rokkitt, Instrument Serif e DM Sans con `display: swap`;
  - immagini AVIF/WebP;
  - JavaScript client minimo, animazioni solo CSS;
  - LCP sotto 2,5 s su mobile.
- **HTML semantico**: `header`, `nav`, `main`, `section` con `aria-labelledby`, `footer` e `address` per l'indirizzo. Link `tel:` e WhatsApp cliccabili.

### 3.2 Dati strutturati (JSON-LD in `<script type="application/ld+json">`)

- **`Restaurant`** (anche `BarOrPub`), con:
  - `name`, `url`, `logo`, `image` (logo e 2–3 foto da Blob), `telephone`;
  - `address`: `PostalAddress` con streetAddress "Via Primo Maggio 1", postalCode "20043", addressLocality "Vanzago", addressRegion "MI", addressCountry "IT";
  - `geo`: solo con latitudine e longitudine confermate; altrimenti ometti il campo (i segnaposto sono `[latitudine]` e `[longitudine]`);
  - `servesCuisine`: ["Hamburger", "Pizza", "Italiana", "Cucina lombarda"];
  - niente `priceRange` finché il locale non conferma la fascia (in pagina: `[prezzo da confermare]`);
  - `acceptsReservations`: true;
  - `menu`: URL di `/menu`;
  - `hasMap`;
  - `openingHoursSpecification` solo quando `hours` in `data/locale.ts` è compilato;
  - `sameAs`: Instagram;
  - `areaServed`: elenco dei comuni (§3.3).
- **`FAQPage`** con le stesse domande e risposte **visibili** in pagina:
  - "Dove mangiare un hamburger in provincia di Milano?"
  - "Fate pranzo di lavoro vicino a Rho?"
  - "Dove fare l'aperitivo tra Rho e Vanzago?"
  - "Si può festeggiare un compleanno o una laurea?"
  - "Fate asporto?"
- **`BreadcrumbList`** sulle pagine interne.
- Verifica con il Rich Results Test di Google: nessun errore.

### 3.3 Pagine locali (contenuto vero, non doorway)

Crea pagine statiche generate da un file dati (`/data/pagine-locali.ts`). Ognuna ha:

- testo **unico e utile**, almeno 300 parole, scritto per quella ricerca;
- `h1` dedicato;
- 1–2 murales e foto pertinenti;
- indicazioni su come arrivare da quel posto (strada e parcheggio, senza inventare tempi precisi);
- piatti consigliati;
- FAQ specifiche;
- CTA per chiamare e prenotare;
- link interni alla home e a `/menu`.

| Slug | h1 |
|---|---|
| `/hamburger-provincia-di-milano` | Hamburger in provincia di Milano: il Down Under a Vanzago |
| `/hamburger-rho` | Hamburger vicino a Rho |
| `/pizza-vanzago` | Pizza a Vanzago |
| `/pranzo-di-lavoro-rho` | Pranzo di lavoro tra Rho e Vanzago |
| `/aperitivo-rho` | Aperitivo vicino a Rho |
| `/ristorante-vicino-fiera-milano-rho` | Dove mangiare vicino a Fiera Milano Rho |
| `/feste-compleanni-vanzago` | Feste, compleanni e lauree a Vanzago |

Altre indicazioni:

- **Comuni da citare** in modo naturale, nei testi e in `areaServed`:
  - Vanzago, Mantegazza, Rho, Fiera Milano Rho, Pogliano Milanese, Pregnana Milanese, Arluno, Sedriano, Nerviano, Cornaredo, Lainate, Bareggio;
  - "provincia di Milano", "Milano ovest", "asse del Sempione".
- **Niente keyword stuffing**: niente liste di città ripetute, testo bianco su bianco o pagine quasi identiche cambiando solo il nome del comune. Google le penalizza come *doorway pages*. Meglio poche pagine solide che tante pagine vuote.
- **Home.** Aggiungi la sezione "capitolo VIII · da dove arrivi" con il testo di zona, i chip dei comuni (solo visivi, non link a pagine vuote) e le FAQ.
- **Footer.** Indirizzo completo identico ovunque (NAP coerente): "Down Under Cafè · Via Primo Maggio 1, 20043 Vanzago (MI) · 338 439 5727". Aggiungi i link alle pagine locali sotto "Ci trovi vicino a…".

### 3.4 Cose da fare fuori dal codice

Riportale in un `README-SEO.md` come checklist per il cliente.

1. **Google Business Profile.** È il fattore n.1 per "vicino a me" e per le ricerche con il nome di un paese.
   - Verifica la scheda.
   - Categoria principale "Hamburgeria", secondarie "Pizzeria", "Cocktail bar" e "Ristorante".
   - Orari uguali al sito, foto dei murales, link al sito e a `/menu`.
   - Post settimanali, per esempio "I martedì della nonna".
2. **Recensioni.** Chiedile con un QR al tavolo e sullo scontrino. Rispondi sempre, citando in modo naturale i piatti.
3. **Google Search Console.** Verifica il dominio, invia la sitemap e controlla la copertura. Fai lo stesso su **Bing Webmaster Tools**.
4. **Directory.** Stessi dati NAP su TripAdvisor, TheFork, Facebook, Apple Maps e PagineGialle.
5. **Instagram.** Link al sito in bio e menù PDF nelle storie in evidenza.

---

## 4. Criteri di accettazione

- [ ] Tutti i murales elencati sono usati, ricolorati in modo coerente, con alt corretti; il polpo è senza scritta sotto.
- [ ] Dalla pagina `/admin` (protetta) si sostituisce il PDF del menù e il pulsante "Scarica il menù" scarica subito la nuova versione.
- [ ] Le foto caricate su Blob compaiono nelle sezioni giuste entro 1 ora, o subito grazie a `revalidatePath`.
- [ ] Il token Blob non compare in nessun bundle client: controlla con `grep` sulla build `.next/static`.
- [ ] Lighthouse mobile ≥ 90 su Performance, SEO, Accessibility e Best Practices.
- [ ] Rich Results Test valido per `Restaurant` e `FAQPage`.
- [ ] Sitemap e robots raggiungibili; `/admin` non indicizzato.
- [ ] Ogni pagina locale ha title, description, h1 e contenuto unici.
