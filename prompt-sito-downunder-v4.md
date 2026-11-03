# Prompt per l'IA del sito: sezioni foto, admin foto con anteprima e nomi automatici

> Da incollare così com'è. Prima di incollarlo, leggi «Cose da fare io» in fondo: sono i passaggi che l'IA non può fare.
> Allega al messaggio il file `sezioni-foto-downunder.html`: è il riferimento esatto di layout, classi, formati e indicazioni di scatto. Se una frase di questo prompt e il file non coincidono, vince il file.

---

```
Lavora su dev. Obiettivo: (A) aggiungere le foto alle sezioni del sito come in sezioni-foto-downunder.html, (B) gestire quegli slot da /admin con anteprima, (C) dare a ogni foto il nome del file dal nome del piatto e il testo alternativo dalla descrizione.

Leggi prima docs/REGOLE-SITO.md. Questa richiesta dice esplicitamente «modifica la base», e solo per le parti elencate in A e in B: hero, sezione novità, riga foto dell’aperitivo, riga foto di Lunch / Ape / Cena, tappe del pranzo, righe 01–03 di «E tu cosa scegli?», voce di menu «novità», pagina /admin/foto. Il resto della base non si tocca (logo, palette, font, murales, nuvole, decorazioni, contatti, orari, SEO già a posto, capitoli dopo il menù). Stagione ed eventi restano com’è, salvo i punti in cui questo messaggio dice il contrario: quelli vanno scritti in docs/REGOLE-SITO.md alla fine.

Regole che valgono per tutto il lavoro:
- Non scrivere mai password, token o chiavi nelle risposte o nei file. Se serve una variabile, dimmi solo il nome da impostare su Vercel.
- Dati non confermati (prezzi, nomi dei nuovi tagli, pesi, provenienze, cotture) restano segnaposto tra [parentesi]. Non inventarli. I testi tra [parentesi] nel file HTML sono gli stessi segnaposto.
- In produzione non si vede mai un riquadro segnaposto. Se una foto manca, al suo posto va il murale più adatto in inchiostro, oppure il blocco si nasconde se è una sezione nuova con dati ancora segnaposto. I riquadri .is-slot con numero e indicazione di scatto si vedono solo in preview (VERCEL_ENV=preview) e in /admin.
- Stile invariato. Dal file HTML copia solo il blocco «CSS NUOVO» in app/globals.css, con le variabili già del sito: non reincollare il blocco «CSS DEL SITO» e non aggiungere colori, font o componenti. Murales solo in inchiostro, percorsi locali /murales/… (nel file puntano a www: nel codice no). Logo DUC vettoriale vero. Tono diretto, ironico, riferimenti a Verne.
- Il file è un estratto di layout. Non sostituire la home. Restano cielo, nuvole, decorazioni di stagione, bolle del menù, polpo, mongolfiera, mano welcome. Non rifare una sezione che c’è già: aggiungi solo le parti nuove, nei componenti che già la disegnano.

A. SEZIONI FOTO

Ogni riquadro ha data-slot="NN": è lo slot di /admin/foto. Metti l’elenco in data/foto-slot.ts (id, sezione Blob, formato, indicazione di scatto copiata dal file, murale di riserva). Gli slot sono questi:

01 hero novità · 4:5 · novita · «Il piatto nuovo protagonista, a 45° sul tavolo di legno, luce calda di lato, murale sfocato dietro.»
02 novità · 4:3 · novita · «taglio intero sul tagliere, dall'alto, sale grosso»
03 novità · 4:3 · novita · «fette tagliate, cuore rosa ben visibile»
04 novità · 4:3 · novita · «sulla griglia con la fiamma, di lato»
05 aperitivo piatto · 4:5 · aperitivo · «Il piatto abbondante dall'alto, intero nel quadro, due drink ai lati. Deve sembrare tanto.»
06 aperitivo cocktail · 1:1 · aperitivo · «Spritz o cocktail sul bancone, mano che lo prende.»
07 aperitivo tavolo · 1:1 · aperitivo · «Tavolo pieno, bicchieri che brindano (niente facce).»
08 lunch · 4:5 · lunch · «Sala di giorno, luce dalle vetrate: primo e secondo sul tavolo apparecchiato.»
09 cena · 4:5 · sala · «Sera, luci basse e murales dietro: burger e pizza sullo stesso tavolo, birra in primo piano.»
10 giro del pranzo · 4:5 · lunch · «Tavolo già apparecchiato, acqua e coperto pronti.»
11 giro del pranzo · 4:5 · lunch · «Il primo del giorno, fumante, a 45°.»
12 giro del pranzo · 4:5 · lunch · «Secondo con contorno, dall'alto.»
13 giro del pranzo · 4:5 · lunch · «Tazzina sul bancone, murale order here dietro.»
14 burger principale · 4:3 · burger · «Il burger simbolo, frontale ad altezza piatto: strati visibili, formaggio che cola, patatine dietro.»
15 dettaglio burger · 1:1 · burger · «Morso, sezione del burger»
16 dettaglio burger · 1:1 · burger · «Carne sulla piastra»
17 dettaglio burger · 1:1 · burger · «Bun pretzel e anelli di cipolla»
18 pizza principale · 4:3 · pizza · «La pizza intera dall'alto sul tagliere, cornicione gonfio, un trancio appena staccato.»
19 dettaglio pizza · 1:1 · pizza · «Filo di mozzarella che si allunga»
20 dettaglio pizza · 1:1 · pizza · «Burrata, crudo e pistacchio»
21 dettaglio pizza · 1:1 · pizza · «Pizza che esce dal forno»
22 carne principale · 4:3 · carne · «La costata tagliata sul tagliere, cuore rosa, sale grosso e chimichurri a lato.»
23 dettaglio carne · 1:1 · carne · «Fiamma sulla griglia»
24 dettaglio carne · 1:1 · carne · «Pulled pork sfilacciato»
25 dettaglio carne · 1:1 · carne · «Taglio crudo, marezzatura»

La colonna «sezione Blob» usa le cartelle già in lib/archivio-shared.ts. Aggiungi solo la sezione `novita` (i tagli). Lo slot 09 usa la cartella `sala` che c’è già. Non aprire un secondo archivio.

Stati di ogni riquadro, estendendo components/PhotoFrame.tsx:
- foto pubblicata → .photo-frame.has-image con img.photo-img (next/image);
- foto mancante in produzione → .has-fallback con il murale indicato nello slot, in inchiostro; per le card novità, la riga a quaderno .ev-photo-empty senza testo di scatto;
- foto mancante in preview e in /admin → .is-slot con .slot-num e .slot-hint, come nel file.

next/image con width e height vere, sizes adatti al formato, aspect-ratio fisso nel CSS così il layout non salta. Lazy loading, tranne lo slot 01 (priority). object-position dal punto focale salvato in /admin. Le rotazioni .rot-* e le animazioni già usate (.rv, .in, .lift) restano.

1. Hero (components/Hero.tsx)
   - Restano stato aperto/chiuso, h1, PRANZO. APE. CENA. ripeti., testo e pulsanti.
   - La colonna destra, quando c’è una novità pubblicata: .novita-frame al posto dello stemma. Dentro, il nastro .rib «appena sbarcato», il Dirigibile già esistente posizionato come nel file, lo slot 01 (4:5, .tone-light) e il cartellino .novita-cap con nome e una riga. Senza una novità pubblicata torna lo stemma, come oggi.
   - Nel file la riga .nonna-line sotto il titolo è «Novità di {mese}» (mese da Europe/Rome), con nome del taglio, una riga, prezzo e «Tutte le novità →» verso #novita. Oggi quella riga è la cosa del giorno (components/CosaDelGiorno.tsx, data/oggi.ts) e non va sostituita in silenzio. Prima di toccarla proponi come convivono — proposta da cui partire: se c’è una novità pubblicata si vede la riga del file, altrimenti resta la cosa del giorno — e aspetta la conferma.

2. Novità di {mese} (sezione nuova #novita, .chapter.chapter-paper, subito dopo la hero)
   - Come nel file: nastro «capitolo I · il diario di bordo», titolo .display «Novità di {mese}», riga «I tagli nuovi sono sbarcati. Carne seria, appena arrivata: finché c'è.», griglia .ev-grid.novita-grid di card .ev-card uguali a quelle degli eventi. Foto 4:3 (slot 02–04), provenienza, nome del taglio, peso · cottura, prezzo, unità [a persona / al etto], pulsante «Prenota e chiedilo». La prima card ha .is-next e il badge «Nuovo».
   - Quel nastro oggi è su Prossimamente: spostalo qui. Prossimamente resta dov’è, con i titoli «Eventi» e «Aperitivi», senza quel nastro. I capitoli II, III e IV e quelli dopo il menù non si rinumerano.
   - I dati estendono data/novita.ts (oggi il blocco è spento e, se acceso, comparirebbe dentro il menù). La sezione in pagina è solo #novita. Togli il vecchio blocco novità da components/Menu.tsx, così non esce due volte. In produzione la sezione è nascosta finché non c’è almeno una novità senza [parentesi]. In preview si vede con i segnaposto.
   - In header (content/site.ts, voce nav) aggiungi «novità» come prima voce, href /#novita.

3. Aperitivo della domenica (components/Prossimamente.tsx, article#format-domenica)
   - Testi, prezzi e pulsanti invariati, dagli stessi dati di oggi (data/format.ts). In fondo al foglio aggiungi la .photo-row del file: slot 05 (4:5, grande, .rot-n1), slot 06 e 07 (1:1, .rot-p1 e .rot-n15). Non rifare la sezione eventi né i martedì della nonna.

4. Lunch · Cena (components/Giornata.tsx)
   - Tre card come nel file e come in content/site.ts: Lunch, Ape, Cena. Oggi il componente esclude Ape e infila le foto dentro le card: togli quel filtro e quelle foto interne. Il titolo della prima card è «Lunch» (nel dato oggi è «Pranzo»). I testi restano quelli di content/site.ts. Non aggiungere sulla card Cena la riga «Pulled pork, tartare e roastbeef».
   - La .photo-row sotto diventa di 3 colonne, allineate alle card: slot 08 (Lunch, 4:5, .rot-n15), murale del faro fisso al centro (.has-fallback, /murales/faro.png, non è uno slot), slot 09 (Cena, 4:5, .rot-n1). Il tile «Voyage au centre de la Terre» esce da questa riga. Non lasciare sotto la PhotoStrip di foto extra.

5. Il giro del pranzo in 60 minuti (components/Pranzo.tsx, #pranzo)
   - Tra il titolo e il menù della settimana aggiungi le quattro .tappe del file, sulla linea tratteggiata: nastri «0' · si salpa», «10' · il primo», «30' · il secondo», «60' · si rientra»; slot 10–13 in 4:5 .tone-light; titoli e righe copiati dal file (Tavolo pronto, Il primo, Secondo e contorno, Caffè e via).
   - Menù della settimana, tre card a destra e pulsanti restano. Il riquadro foto generico oggi nello stack (pranzo-foto) esce: quelle inquadrature sono le tappe.

6. E tu cosa scegli? (components/Menu.tsx, #menu)
   - Le tre righe in evidenza diventano, in quest’ordine, quelle del file: 01 I Burgers, 02 Le Pizze, 03 La carne. È un cambio rispetto al 26 ottobre (allora erano Burgers, Carne, Specialità): aggiorna la regola. Specialità torna riga semplice.
   - Ognuna prende .menu-row.is-spinta.has-photo: foto principale 4:3 a destra (slot 14, 18, 22, .rot-p1), tre dettagli 1:1 sotto il testo (slot 15–17, 19–21, 23–25) e il link nel testo («Vedi i burger →», «Vedi le pizze →», «Vedi la carne →» verso #novita). Stesso componente, cambiano i dati. Testi delle tre righe come nel file.
   - Il bollino «novità del mese» (NovitaFoto e le cartelle novita-panino, novita-pizza, novita-specialita) non sta dentro queste righe. Le cartelle restano in /admin: non cancellarle e non usarle per riempire gli slot.
   - Le righe già in content/site.ts dopo le tre in evidenza (Dolci, Cocktail, Vini, E altro) restano righe semplici, nell’ordine attuale. Il file mostra 04–06 solo come esempio di riga senza foto: non sostituire l’elenco e non cancellare Dolci, Cocktail e Vini. Non reintrodurre piadine e insalate.

B. /admin/foto: CARICAMENTO CON ANTEPRIMA

Pagina nuova /admin/foto, stessa protezione del resto di /admin. L’admin di oggi (categorie, «Del mese», PDF) resta per tutto ciò che non è uno slot: martedì, eventi, garden, sala oltre lo slot 09, e le cartelle novità del mese. Non unire le due schermate in un unico form.

- Slot raggruppati per sezione, nell’ordine della home.
- Ogni slot è una card nel formato giusto: foto attuale se c’è, altrimenti l’indicazione di scatto. Sotto: nome del piatto, descrizione, nome del file, data di aggiornamento, stato (bozza / pubblicata).
- Caricamento: trascina o scegli un file (jpg, png, webp; heic solo se sharp lo legge, altrimenti un messaggio chiaro). Massimo 20 MB. Subito dopo:
  · anteprima nel formato dello slot; un clic sulla foto imposta il punto focale;
  · campi «Nome del piatto» e «Descrizione» (punto C) e il nome del file che si aggiorna mentre scrivi;
  · «Anteprima sezione»: la sezione vera della home (lo stesso componente, non una copia) con la foto in bozza, e un selettore desktop / mobile;
  · «Salva bozza» e «Pubblica». Sul sito pubblico vanno solo le pubblicate. La bozza si vede in /admin e in preview.
- Sostituisci ed elimina: la foto precedente non si cancella subito. Tieni le ultime 3 versioni e un ripristino con un clic.
- Caricamento multiplo: più file insieme. Se il nome segue la regola del punto C, ogni foto entra nel suo slot con il nome del piatto già compilato. Quelle non riconosciute finiscono in una lista «da assegnare».
- Conversione: estendi lib/optimize-image.ts (sharp c’è già). Ruota secondo l’EXIF, togli tutti i metadati (GPS compreso), WebP qualità 82, lato lungo massimo 2400 px. Salva larghezza e altezza. Il limite attuale (1600 px, qualità 80) resta per le foto delle altre categorie.
- Archiviazione su Vercel Blob, store separati per produzione e preview come già configurato. I dati degli slot stanno in un JSON nel Blob (foto/slot.json), sullo stesso schema del menù PDF e di foto/index.json. Le foto già in index.json non si pubblicano da sole negli slot.

C. NOME DEL FILE = NOME DEL PIATTO, DESCRIZIONE = TESTO ALTERNATIVO

Dati di ogni foto:
{ slot, sezione, piatto, slug, descrizione, url, width, height, focusX, focusY, stato, aggiornata, versioniPrecedenti[] }

1. Nome del piatto
   - Campo con suggerimenti presi dai piatti del menù e dalle Novità. Si può scrivere un nome libero (es. «Sala di sera»).
2. Nome del file (generato, non si scrive a mano)
   - slug = nome del piatto in minuscolo, senza accenti (è→e, à→a…), apostrofi e simboli tolti, spazi → trattino, solo [a-z0-9-], massimo 60 caratteri. Riutilizza la pulizia già in sanitizeFilename.
   - Percorso: foto/{sezione}/{categoria}-{slug}.webp, con la sezione della tabella in A. Esempi: foto/burger/burger-il-signore-degli-anelli.webp, foto/pizza/pizza-burrata-crudo-e-pistacchio.webp, foto/novita/carne-costata-di-scottona-bavarese.webp.
   - Se lo stesso nome appartiene a un’altra foto, aggiungi -2, -3. Se sostituisci la foto dello stesso piatto nello stesso slot, il nome resta: sovrascrivi (allowOverwrite), cache breve, e aggiungi ?v={aggiornata} all’URL salvato.
   - È il nome con cui la foto si scarica, ed è quello che legge Google Immagini.
3. Descrizione = testo alternativo
   - Precompilata quando scegli il piatto: «{Nome del piatto}: {descrizione breve dal menù}, al Down Under Cafè di Vanzago». Se nel menù non c’è una descrizione: «{Nome del piatto} al Down Under Cafè di Vanzago».
   - Modificabile. Avviso sopra i 125 caratteri. Vuota: non si pubblica.
   - Usata come alt sul sito, come titolo/descrizione nell’immagine del JSON-LD (Restaurant, eventi e voci di menù dove ci sono) e nella sitemap delle immagini se la aggiungi.
4. Riconoscimento dal nome del file
   - Regola: {numero slot}-{nome-del-piatto}.jpg, es. «14-burger-il-signore-degli-anelli.jpg», «05-aperitivo-piatto-abbondante.jpg».
   - Il numero sceglie lo slot. Il resto diventa il nome del piatto (trattini → spazi, prima lettera maiuscola) e, se il piatto c’è nel menù, precompila la descrizione. Senza numero, proponi lo slot in base alla categoria e metti il file in «da assegnare» se la categoria non basta.
   - Scrivi la regola in una riga di aiuto in /admin/foto e in docs/REGOLE-SITO.md.

D. CHIUSURA
- Build pulita, nessun errore in console. Lighthouse mobile senza regressioni su prestazioni (attenzione all’LCP della hero), SEO e accessibilità.
- Committa e pusha su dev. Dammi l’URL della preview e un elenco di: cosa è cambiato, quali slot sono ancora senza foto, quali dati sono ancora segnaposto.
- Poi apri la Pull Request da dev a main e fermati: il merge lo faccio io dopo aver controllato la preview.
```

---

## Cose da fare io (non le fa l'IA)

1. **Allegare il design.** Allega `sezioni-foto-downunder.html` al messaggio insieme al prompt.
2. **La riga in hero.** Il prompt si ferma prima di sostituire la cosa del giorno. Rispondi alla proposta (novità pubblicata al posto della cosa del giorno, altrimenti la riga di oggi).
3. **Variabili Blob.** Verifica che su Vercel esistano i token del Blob per Production e per Preview (solo nelle variabili d'ambiente, mai in chat). Il token di produzione va comunque rigenerato prima del go-live, insieme alla password di `/admin`.
4. **Foto.** Quando arrivano dal locale, rinominale `{numero slot}-{nome-del-piatto}.jpg` e caricale insieme in `/admin/foto`: vanno da sole al loro posto. Le indicazioni di scatto sono nel file HTML e, dopo il lavoro, in `data/foto-slot.ts`.
5. **Dati da avere dal locale:** nomi, pesi, provenienze, cotture e prezzi dei nuovi tagli (slot 02–04 e sezione Novità).
6. **Controllo della preview** su desktop e mobile, poi merge della PR `dev` → `main`.
