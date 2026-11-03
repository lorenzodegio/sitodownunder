# API foto degli slot

Secondo ingresso agli stessi slot di `/admin/foto` (02–07, 14–27). Stessi dati (`foto/slot.json` sullo store Blob dell’ambiente), stessa elaborazione (rotazione EXIF, metadati tolti, WebP qualità 82, lato lungo massimo 2400 px), stesse versioni precedenti per il ripristino. `/admin/foto` resta il pannello.

Le bozze si vedono in `/admin/foto` e in preview. In produzione va solo ciò che è `pubblicata`. Uno slot senza foto resta vuoto: fuori da Novità, Lunch e Cena si vede il murale; nella sezione Novità la card resta senza foto; in Lunch e Cena resta il placeholder. Lo slot 04 può restare vuoto. Non ci sono più gli slot 01, 08–13 e 28–35.

## Variabili

- `FOTO_API_TOKEN`: obbligatoria perché l’API risponda. Un valore su Production, un altro su Preview. Se manca, tutte le route qui sotto rispondono 404.
- Store Blob, già usato dal sito: `BLOB_READ_WRITE_TOKEN` su Production, `PREVIEWBLOB_READ_WRITE_TOKEN` su Preview. Senza il token di quell’ambiente il caricamento risponde 503 e non scrive nulla.

Il token dell’API viaggia solo nell’header `Authorization`. Non va messo in query, nel corpo, nei log o nei file del repository.

## Autenticazione e limite

Ogni richiesta porta `Authorization: Bearer <token>`. Il confronto è a tempo costante. Token assente o sbagliato: `401` con `{"errore":"non autorizzato"}`.

Al massimo 60 richieste al minuto per IP (indirizzo in `x-forwarded-for`, altrimenti `x-real-ip`). Oltre: `429` con `{"errore":"troppe richieste"}` e `Retry-After: 60`. Il conteggio è in memoria, per ogni istanza del server.

Le risposte non si mettono in cache.

## Nome del file

Nel JSON, `file` è `{slot}-{slug-del-piatto}.webp`, per esempio `01-tagliata-di-picanha.webp`. Lo slug è il nome del piatto in minuscolo, senza accenti, con i trattini al posto degli spazi.

I byte stanno sul percorso già usato da `/admin/foto`: `foto/{cartella}/{prefisso}-{slug}.webp`. L’indirizzo da usare è `url`, non `file`.

`sezione` nella lista è il gruppo in pagina (`novita`, `aperitivo`, `burger`, `pizza`, `carne`), non la cartella Blob.

## GET /api/admin/foto/slots

Elenco di tutti gli slot definiti in `data/foto-slot.ts`.

```json
{
  "slots": [
    {
      "slot": "01",
      "sezione": "hero",
      "formato": "4:5",
      "piatto": "",
      "descrizione": "",
      "file": "",
      "url": "",
      "stato": "vuoto",
      "aggiornata": ""
    }
  ]
}
```

`stato` è `vuoto`, `bozza` o `pubblicata`. `aggiornata` è ISO 8601 quando lo slot è stato scritto, altrimenti stringa vuota.

## POST /api/admin/foto

`multipart/form-data`:

| Campo | Regola |
|---|---|
| `file` | JPG, PNG, WebP o HEIC, massimo 20 MB |
| `slot` | `"01"` … `"29"` |
| `piatto` | nome del piatto, da 1 a 80 caratteri |
| `descrizione` | testo alternativo, da 1 a 200 caratteri |
| `stato` | `bozza` se manca, oppure `pubblicata` |

`?prova=1` fa le stesse verifiche, compresa la lettura dell’immagine, e non salva nulla. In quel caso `url` è vuoto e `prova` è `true`.

Risposta `200`:

```json
{
  "slot": "01",
  "file": "01-tagliata-di-picanha.webp",
  "url": "https://…",
  "width": 1600,
  "height": 2000,
  "stato": "bozza",
  "prova": false
}
```

Errore di validazione: `400` con `{"errore":"…","campo":"file|slot|piatto|descrizione|stato"}`. Il testo di `errore` è in italiano.

Una foto nuova sostituisce quella dello slot e conserva la precedente tra le versioni di ripristino, come da `/admin/foto`. Il punto focale di un caricamento da API è il centro.

## POST /api/admin/foto/pubblica

JSON `{"slots":["01","02"]}`. Pubblica le bozze di quegli slot. Uno slot senza bozza (vuoto, già pubblicato, o bozza senza nome, descrizione o foto) finisce in `saltati` e non cambia.

Risposta `200`:

```json
{ "pubblicati": ["01"], "saltati": ["04"] }
```

Elenco assente o con uno slot sconosciuto: `400` con `campo` uguale a `slots`.
