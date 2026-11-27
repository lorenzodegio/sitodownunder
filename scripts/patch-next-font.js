/**
 * Next 15.5.27 legge l'estensione in fondo all'URL di Google Fonts.
 * A volte la risposta è /l/font?kit= senza .woff2 e il build su Vercel muore.
 * La correzione è in Next 16.4.3, non ancora su 15.x.
 */
const fs = require("fs");
const path = require("path");

const file = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "compiled",
  "@next",
  "font",
  "dist",
  "google",
  "loader.js",
);

const fragile = "/\\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl)[1]";
const safe = "(/\\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl) || [null, \"woff2\"])[1]";

if (!fs.existsSync(file)) process.exit(0);
const source = fs.readFileSync(file, "utf8");
if (source.includes(safe)) process.exit(0);
if (!source.includes(fragile)) {
  console.error("patch-next-font: riga attesa non trovata in", file);
  process.exit(1);
}
fs.writeFileSync(file, source.replace(fragile, safe));
