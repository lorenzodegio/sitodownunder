# Regole del sito

Queste regole si leggono all'inizio di ogni lavoro. Il sito è a livelli: si modifica solo il livello della richiesta.

## Livello 0 — base

Sezioni e loro ordine, testi fissi, logo, palette, font, murales e animazioni, nuvole, contatti e orari, SEO, admin.

Non si modifica mai, a meno che la richiesta dica esplicitamente «modifica la base». Se un lavoro richiede di toccarla, ci si ferma e si chiede.

## Livello 1 — stagione

Può cambiare solo:

- i colori di hero e barra
- il colore di accento
- le decorazioni (foglie, neve e simili)
- la riga evento nella hero

Niente altro. I dati stanno in `data/stagioni.ts`. La stagione attiva è `NEXT_PUBLIC_SEASON`. In preview, `?stagione=off` la spegne. Senza stagione si usano i valori di `data/theme.ts`.

## Livello 2 — eventi

Prossimamente legge i format e le date singole da `data/eventi.ts`, e l’aperitivo della domenica da `data/format.ts`. La riga in hero, con la stagione accesa, legge `data/oggi.ts`. Un evento nuovo è un blocco con lo schema fisso. Sparisce da solo dopo la data di fine.

## Livello 3 — contenuti

Menù pranzo, PDF e foto arrivano dal Blob tramite `/admin`. Non si scrivono nel codice.

## Decisioni del 26 ottobre 2026

Richieste esplicite di quel giorno. Da lì in poi fanno parte del sito.

- La stagione pubblica è l’autunno, con `NEXT_PUBLIC_SEASON`. Senza la variabile il sito torna all’aspetto base. Il valore su Vercel lo imposta chi tiene il progetto.
- Il dominio previsto è `www.downundervanzago.it`. Canonical, sitemap, Open Graph e JSON-LD usano `NEXT_PUBLIC_SITE_URL`. Senza, si usa l’host del deploy. Niente URL `.vercel.app` scritti nel codice.
- In hero, con la stagione accesa, si spinge la cosa del giorno (`data/oggi.ts`), non un evento fisso. La stessa riga, in breve, sta vicino a orari e contatti. L’ordine dei momenti si cambia solo in `prioritaMomenti`.
- I martedì della nonna sono solo a cena e solo su prenotazione. L’orario si mostra solo se è già nei dati.
- Il menù del pranzo in pagina non mostra il prezzo dei singoli piatti. Resta il prezzo del menù (da 14€ / da 7€) e le note.
- «E tu cosa scegli?» è la vetrina di hamburger, carne e pizza. Sotto, più piccoli, taglieri e hot dog. Piadine e insalate non stanno in questa sezione. Le foto vengono dal Blob; senza foto si usa il murale.
- La sezione «La settimana ha già una rotta» non c’è più: niente voce di menu, niente ancora.
- Le novità (tagli di carne) stanno in `data/novita.ts`, non in `/admin`. `/admin` carica il PDF. In produzione la sezione è nascosta finché una scheda ha ancora [parentesi].
- Prossimamente ha due parti: i format (`data/eventi.ts` con `tipo: "format"`, più l’aperitivo della domenica in `data/format.ts`) e i prossimi eventi (`tipo: "evento"`). L’aperitivo della domenica è nascosto in produzione finché orario, contenuto e prezzo sono segnaposto.
- Un blocco nuovo con [parentesi] si vede in preview e in locale. In produzione no, finché i dati non sono compilati.
- I QR in `public/qr/` servono per la stampa. Non vanno nel menu del sito.
- Orari, ragione sociale, partita IVA e PEC già confermati restano quelli veri. Non si rimettono tra parentesi.

## Come si lavora

- Si lavora solo su `dev`. Il merge in `main` lo fa chi tiene il progetto.
- Mai chiavi o token in risposte o file committati.
- I dati non confermati stanno tra [parentesi].
- Alla fine di ogni lavoro si dice a quale livello appartengono le modifiche.
