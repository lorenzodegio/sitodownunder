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
- In hero, con la stagione accesa, si spinge la cosa del giorno (`data/oggi.ts`), non un evento fisso. Se c’è almeno una novità confermata, senza parentesi, quella riga diventa «Novità di {mese}» e la colonna destra mostra la foto dello slot 01 al posto dello stemma. Senza novità confermata restano la cosa del giorno e lo stemma. La riga breve vicino a orari e contatti non cambia. L’ordine dei momenti si cambia solo in `prioritaMomenti`.
- I martedì della nonna sono solo a cena e solo su prenotazione. L’orario si mostra solo se è già nei dati. In hero «Domani» compare solo il giorno prima di una data in calendario, «Stasera» solo quel martedì dopo le 15. Il primo è il 3 novembre 2026. «Stasera. Aperitivo e cena» compare solo se quel giorno ha la sera in orario: il lunedì sera è chiuso e la riga non si mostra.
- Il menù del pranzo in pagina non mostra il prezzo dei singoli piatti. Resta il prezzo del menù (da 14€ / da 7€) e le note.
- «E tu cosa scegli?» resta l’elenco. Non ci sono piadine né insalate. Hot dog, club sandwich e taglieri stanno insieme in «E altro». Burgers, pizze e carne sono le prime tre voci e hanno lo spazio foto (slot 14–25). Specialità è una riga semplice: pulled pork, tartare e roastbeef. Il bollino «novità del mese» arriva dalle cartelle Blob Novità panino, Novità pizza e Novità specialità e non sta dentro quelle tre righe. Le novità testuali dei tagli restano in `data/novita.ts` e in produzione non si vedono finché i dati sono tra parentesi.
- La sezione «La settimana ha già una rotta» non c’è più: niente voce di menu, niente ancora.
- Prossimamente ha gli eventi. L’aperitivo della domenica è pubblicato: ogni domenica 18:00–20:00, aperitivo al tavolo, piatto abbondante e consumazione, da 13€. In hero si spinge solo in quella fascia. I gruppi, almeno 10 persone, lo hanno anche gli altri giorni a 15€ su prenotazione. I martedì della nonna, con i prezzi già confermati, si vedono.
- Dal capitolo IV i fondi alternano: IV scuro, V chiaro, orari e contatti scuro (capitolo VI), capitolo VII chiaro. Il VII e le domande frequenti non si ridisegnano.
- Un blocco nuovo con [parentesi] si vede in preview e in locale. In produzione no, finché i dati non sono compilati.
- I QR in `public/qr/` servono per la stampa. Non vanno nel menu del sito.
- Orari, ragione sociale, partita IVA e PEC già confermati restano quelli veri. Non si rimettono tra parentesi.
- L’indirizzo scritto è «Via I Maggio 1, 20043 Vanzago (MI)». Mappe e recensioni usano il Place ID in `data/locale.ts`. Bareggio resta solo tra le zone servite.
- I contorni fissi del pranzo sono verdure grigliate, insalata mista e patatine fritte. Il contorno del giorno resta nella voce del giorno.

## Foto degli slot, 31 ottobre 2026

La home ha 25 slot in `data/foto-slot.ts`. Si caricano da `/admin/foto`, non dalla lista per categoria. In produzione, se la foto manca, si vede il murale; in preview e in `/admin` si vede l’indicazione di scatto. Sul sito pubblico vanno solo le foto pubblicate.

Il nome del file è il nome del piatto: `foto/{sezione}/{prefisso}-{slug}.webp`. Per il caricamento multiplo il file si chiama `{numero slot}-{nome-del-piatto}.jpg`, per esempio `14-burger-il-signore-degli-anelli.jpg`. La descrizione è il testo alternativo.

Il nastro «capitolo I · il diario di bordo» sta sulla sezione Novità, subito dopo la hero. Prossimamente non lo ripete. I capitoli dal II in poi non cambiano numero. La card del giorno si chiama Lunch. Sotto Lunch, Ape e Cena la riga foto è slot 08, il murale del faro, slot 09.

## Come si lavora

- Si lavora solo su `dev`. Il merge in `main` lo fa chi tiene il progetto.
- Mai chiavi o token in risposte o file committati.
- I dati non confermati stanno tra [parentesi].
- Alla fine di ogni lavoro si dice a quale livello appartengono le modifiche.
