/**
 * Interruttore delle cene di Natale.
 * Esecuzione: npx tsx scripts/verifica-natale.ts
 */
import assert from "node:assert/strict";
import { presentaMomento } from "../data/oggi";
import { nataleAttivo } from "../lib/natale";

const env = process.env;
const originale = { VERCEL_ENV: env.VERCEL_ENV, NATALE_ATTIVO: env.NATALE_ATTIVO };
const dicembre = new Date("2026-12-15T12:00:00+01:00");
const capodanno = new Date("2027-01-01T00:30:00+01:00");

function imposta(vercel: string | undefined, attivo: string | undefined) {
  if (vercel === undefined) delete env.VERCEL_ENV;
  else env.VERCEL_ENV = vercel;
  if (attivo === undefined) delete env.NATALE_ATTIVO;
  else env.NATALE_ATTIVO = attivo;
}

try {
  imposta("production", undefined);
  assert.equal(nataleAttivo(dicembre), false, "production senza variabile");

  imposta("production", "1");
  assert.equal(nataleAttivo(dicembre), true, "production con 1");
  assert.equal(nataleAttivo(new Date("2026-12-31T23:30:00+01:00")), true, "31 dicembre sera, ancora accesa");

  imposta("preview", undefined);
  assert.equal(nataleAttivo(dicembre), true, "preview senza variabile");

  imposta("production", "1");
  assert.equal(nataleAttivo(capodanno), false, "1 gennaio in production");

  imposta("preview", "1");
  assert.equal(nataleAttivo(capodanno), false, "1 gennaio in preview");

  imposta("preview", "1");
  assert.equal(presentaMomento(new Date("2026-12-15T12:00:00+01:00"))?.id, "pranzo", "a pranzo resta il pranzo");
  assert.equal(presentaMomento(new Date("2026-12-15T19:00:00+01:00"))?.id, "natale", "la sera del 15 è Natale");
  assert.equal(presentaMomento(new Date("2026-12-23T19:30:00+01:00"))?.id, "natale", "la sera del 23 è ancora Natale");
  assert.notEqual(presentaMomento(new Date("2026-12-24T19:30:00+01:00"))?.id, "natale", "dal 24 la sera non spinge più il Natale");

  console.log("Cene di Natale: ok");
} finally {
  if (originale.VERCEL_ENV === undefined) delete env.VERCEL_ENV;
  else env.VERCEL_ENV = originale.VERCEL_ENV;
  if (originale.NATALE_ATTIVO === undefined) delete env.NATALE_ATTIVO;
  else env.NATALE_ATTIVO = originale.NATALE_ATTIVO;
}
