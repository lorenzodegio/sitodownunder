# Down Under Cafè — Vanzago

Sito statico della home, ricostruito dalla demo. Next.js (App Router), TypeScript, niente backend e niente variabili d’ambiente.

## Avvio in locale

Serve Node.js 20 o successivo.

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

Altri comandi:

```bash
npm run build
npm run start
npm run lint
```

## Modificare i contenuti

Tutto il testo modificabile sta in `content/site.ts`: telefono, indirizzo, link Instagram e Maps, orari, voci del menù, serate, menù fisso del pranzo, segnaposto tra parentesi quadre.

Gli orari sono minuti a partire dalla mezzanotte, fuso Europe/Rome. Se il locale chiude dopo mezzanotte, il minuto di chiusura supera 1440.

Esempi:

- 11:30 = `11 * 60 + 30` = `690`
- 18:30 = `1110`
- 00:30 del giorno dopo = `1470`
- 01:00 del giorno dopo = `1500`

L’indice dell’array `hours` segue `Date.getDay()`: 0 domenica, 1 lunedì, … 6 sabato. In pagina i giorni sono mostrati dal lunedì.

Lo stato «aperto ora» si calcola nel browser (non in build), si aggiorna ogni minuto ed evidenzia la riga di oggi. Sul server, prima dell’hydration, compare solo «Via I Maggio 1, Vanzago».

## Aggiungere le foto

Le immagini vanno in `public/images/`. I nomi attesi sono elencati in `public/images/README.md`: burger, pizza, bancone, murales, garden, buffet.

Finché `src` è `null` in `content/site.ts`, resta il riquadro tratteggiato. Per mostrare una foto:

```ts
burger: {
  src: "/images/burger.jpg",
  // il resto resta com’è
}
```

Formati utili: jpg, jpeg, png, webp. Niente foto di persone. In produzione la pagina è statica: dopo aver aggiunto i file serve un nuovo build (in locale `npm run dev` le vede al refresh).

## Pubblicare su Vercel

1. Metti il progetto su un repository Git.
2. Su [vercel.com](https://vercel.com) importa il repository.
3. Framework: Next.js (viene riconosciuto da solo). Non servono variabili d’ambiente.
4. Deploy.

In alternativa, dalla cartella del progetto, con la CLI di Vercel già autenticata: `npx vercel`.

Il comando `npm run build` deve terminare senza errori prima del deploy.
