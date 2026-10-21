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

La sezione Prossimamente e la spinta nella hero leggono solo `data/eventi.ts`. Un evento nuovo è un blocco di dati con lo schema fisso. Sparisce da solo dopo la data di fine.

## Livello 3 — contenuti

Menù pranzo, PDF e foto arrivano dal Blob tramite `/admin`. Non si scrivono nel codice.

## Come si lavora

- Si lavora solo su `dev`. Il merge in `main` lo fa chi tiene il progetto.
- Mai chiavi o token in risposte o file committati.
- I dati non confermati stanno tra [parentesi].
- Alla fine di ogni lavoro si dice a quale livello appartengono le modifiche.
