# Prompt per l'IA del sito — go-live autunnale + modifiche della riunione del 26 ottobre

> Da incollare così com'è. Prima di incollarlo, sotto «Cose da fare io» trovi i passaggi su Vercel e GitHub che l'IA non può fare.

---

```
Lavora su dev. Obiettivo: portare in produzione la versione autunnale del sito con le modifiche decise oggi con il locale. Leggi prima docs/REGOLE-SITO.md e rispetta i quattro livelli (Base / Stagione / Eventi / Contenuti). Alla fine aggiorna anche quel file con le decisioni di questo messaggio.

Regole che valgono per tutto il lavoro:
- Non scrivere mai password, token o chiavi nelle risposte o nei file. Se serve una variabile, dimmi solo il nome da impostare su Vercel.
- Dati non confermati (prezzi, orari, P.IVA, coordinate, contenuti dei nuovi format) restano segnaposto tra [parentesi]. Non inventarli.
- I blocchi NUOVI di questo messaggio che hanno ancora segnaposto si vedono in preview, ma in produzione restano nascosti finché i dati non sono compilati (flag "pubblica" nei dati, o controllo automatico sulle [parentesi]).
- Stile invariato: palette e font del sito, murales solo in inchiostro (chiari su fondo scuro), logo DUC vettoriale vero. Tono diretto, ironico, con riferimenti a Verne.

1. VERSIONE AUTUNNALE IN PRODUZIONE
- La versione autunnale di dev diventa quella pubblica. Il tema resta governato da NEXT_PUBLIC_SEASON=autunno (lo imposto io anche su Production). Senza la variabile il sito deve tornare all'aspetto base senza rompere nulla: verificalo.
- La hero autunnale spinge "la cosa del giorno" (punto 3) invece di un evento fisso.

2. DOMINIO
- Il dominio è www.downundervanzago.it (il www è il principale, il dominio nudo reindirizza al www).
- Canonical, sitemap, robots, Open Graph e JSON-LD (Restaurant, FAQPage, eventi) usano NEXT_PUBLIC_SITE_URL; come fallback resta l'URL del deployment Vercel. Controlla che non ci siano URL .vercel.app scritti a mano nel codice.
- Genera il QR code del sito (https://www.downundervanzago.it) in SVG e PNG ad alta risoluzione, inchiostro #1E282B su fondo trasparente e su fondo carta #F6EFDF, in public/qr/. Serve per locandine e volantini, non va messo nel menu del sito.

3. "LA COSA DEL GIORNO" (nuovo componente)
- Un blocco che cambia in base al giorno e all'ora (fuso Europe/Rome) e spinge il momento giusto: in hero e ripreso in forma breve vicino a orari e contatti.
- Regole iniziali, tutte in un file di configurazione facile da modificare (data/oggi.ts o simile):
  · lun–ven fino alle 15:00 → pausa pranzo con il menù del giorno;
  · martedì dopo le 15:00 (e il lunedì come "domani") → I martedì della nonna, se c'è una data in calendario;
  · domenica → aperitivo della domenica;
  · giorni con un evento in calendario → l'evento ha la precedenza;
  · altrimenti → aperitivo e cena (burger, carne, pizza).
- La priorità dei momenti deve essere configurabile, così più avanti (es. da gennaio) si può spingere la pausa pranzo senza toccare i componenti.

4. I MARTEDÌ DELLA NONNA: SOLO A CENA
- Ovunque compaiano (hero, sezione eventi, card, FAQ, JSON-LD degli eventi, testi alternativi) deve essere chiaro che sono solo a cena e solo su prenotazione. Esempio di formula: "Solo a cena, solo su prenotazione". Non aggiungere un orario se non è nei dati.
- Aggiorna la FAQ "Come si prenotano i martedì della nonna?" di conseguenza.

5. MENÙ DEL GIORNO (pausa pranzo)
- Togli i prezzi dei singoli piatti dalla visualizzazione pubblica e lascia solo il prezzo totale del menù (quello della regola del pranzo già presente). Le note tipo "senza contorno" restano.
- In /admin il campo prezzo per piatto può restare, ma non si mostra sul sito.

6. "E TU COSA SCEGLI?"
- Togli per ora piadine e insalate. Restano taglieri e hot dog.
- La sezione diventa una vetrina delle specialità da spingere: hamburger, carne e pizza in primo piano, con una card grande per ciascuna (foto, una riga di racconto, 2–3 esempi dal menù). Taglieri e hot dog restano più piccoli, sotto.
- Le foto arrivano da /admin (Blob); finché manca la foto vera usa il murale più adatto in inchiostro come segnaposto.

7. TOGLI "LA SETTIMANA HA GIÀ UNA ROTTA"
- Rimuovi la sezione, con voce di menu, link e ancore. Lo spazio va a hamburger, carne e pizza (punto 6). Controlla che la numerazione dei capitoli resti coerente.

8. NOVITÀ (nuova sezione)
- Sezione "Novità" per i nuovi tagli di carne, che il locale mi manda a breve. Card con nome del taglio, provenienza, peso, una riga di descrizione, prezzo e foto: tutti segnaposto [tra parentesi] per ora.
- I dati si gestiscono da /admin (o da un file dati se /admin richiede troppo lavoro: dimmi cosa scegli). In produzione la sezione è nascosta finché non c'è almeno una novità compilata.

9. APERITIVI ED EVENTI
- La sezione eventi ("Prossimamente") si divide in due:
  · "I nostri format": format ricorrenti con card fissa (I martedì della nonna; Aperitivo della domenica; spazio per altri);
  · "Prossimi eventi": date singole, come ora.
- Aperitivo della domenica: card con foto, orario [orario], cosa include [cosa include], prezzo [prezzo] e pulsante di prenotazione/WhatsApp. Compare anche nella cosa del giorno la domenica. Nascosto in produzione finché i dati sono segnaposto.
- Nel capitolo delle serate dai più peso all'aperitivo (testo e foto), con un rimando ai format.

10. MENÙ NUOVO
- Il locale sta facendo il menù nuovo: quando arriva lo carico io da /admin (PDF). Verifica solo che "Scarica il menù" e "Leggi il menù" prendano sempre l'ultimo PDF caricato, senza cache vecchie.

11. CHIUSURA
- Build pulita, nessun errore in console, Lighthouse mobile senza regressioni su SEO e accessibilità.
- Committa e pusha su dev, dammi l'URL della preview e un elenco di cosa è cambiato e di cosa resta segnaposto.
- Poi apri la Pull Request da dev a main e fermati: il merge lo faccio io dopo aver controllato la preview.
```

---

## Cose da fare io (non le fa l'IA)

1. **Dominio.** Se downundervanzago.it non è ancora registrato, registrarlo. Poi Vercel › Settings › Domains: aggiungi `www.downundervanzago.it` (principale) e `downundervanzago.it` con redirect al www; copia i record DNS che Vercel indica nel pannello del registrar.
2. **Variabili su Production** (Vercel › Settings › Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = `https://www.downundervanzago.it`
   - `NEXT_PUBLIC_SEASON` = `autunno` (a fine stagione si toglie e si fa il redeploy)
3. **Sicurezza prima del go-live.** Rigenera il token del Blob di produzione (era passato in chat) e la password di `/admin`, e aggiornali solo nelle variabili di Vercel.
4. **Controllo della preview**, poi merge della PR `dev` → `main`.
5. **Dopo il go-live.** Link del sito in bio su Instagram, dominio nuovo su Google Business Profile, QR code sui materiali stampati.
