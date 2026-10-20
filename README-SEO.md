# SEO locale — cose da fare fuori dal codice

Checklist per il Down Under Cafè, Vanzago. Il sito prepara title, sitemap, dati strutturati e pagine di zona. Questi passi stanno fuori dal repository.

1. **Google Business Profile.** È il fattore principale per «vicino a me» e per le ricerche con il nome di un paese.
   - Verifica la scheda.
   - Categoria principale «Hamburgeria». Secondarie: «Pizzeria», «Cocktail bar», «Ristorante».
   - Orari uguali a quelli confermati dal locale. Sul sito, finché non lo sono, c’è solo il segnaposto `[orari da confermare]`.
   - Foto dei murales, link al sito e a `/menu`.
   - Post settimanali, per esempio «I martedì della nonna».
2. **Recensioni.** Chiedile con un QR al tavolo e sullo scontrino. Rispondi sempre, citando in modo naturale i piatti.
3. **Google Search Console.** Verifica il dominio, invia la sitemap (`/sitemap.xml`) e controlla la copertura. Fai lo stesso su **Bing Webmaster Tools**.
4. **Directory.** Stessi dati NAP — Down Under Cafè, Via Primo Maggio 1, 20043 Vanzago (MI), 338 439 5727 — su TripAdvisor, TheFork, Facebook, Apple Maps e PagineGialle.
5. **Instagram.** Link al sito in bio e menù PDF nelle storie in evidenza: https://www.instagram.com/downundercafe/

Prima del go-live conferma orari, prezzi, P. IVA e coordinate, e sostituisci i segnaposto. Imposta `NEXT_PUBLIC_SITE_URL` sul dominio definitivo, in Vercel, solo per Production: a quel punto il `noindex` di produzione si toglie da solo. Preview e l’indirizzo `.vercel.app` restano non indicizzati finché quella variabile non c’è in produzione.
