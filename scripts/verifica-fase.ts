/**
 * Fase inverno + Natale.
 * Esecuzione: npx tsx scripts/verifica-fase.ts
 */
import assert from "node:assert/strict";
import { calcolaFase, fineNatale, giornoRomaISO } from "../lib/fase";

const sei = new Date("2027-01-06T23:00:00+01:00");
const sette = new Date("2027-01-07T00:30:00+01:00");

assert.equal(giornoRomaISO(sei), "2027-01-06");
assert.equal(giornoRomaISO(sette), "2027-01-07");

const fine = "2027-01-06";
assert.equal(
  calcolaFase({ giorno: giornoRomaISO(sei), fine, faseRichiesta: null, produzione: true }),
  "natale",
  "6 gennaio alle 23:00 è ancora Natale",
);
assert.equal(
  calcolaFase({ giorno: giornoRomaISO(sette), fine, faseRichiesta: null, produzione: true }),
  "inverno",
  "7 gennaio alle 00:30 è solo inverno",
);
assert.equal(
  calcolaFase({ giorno: "2026-12-20", fine, faseRichiesta: "inverno", produzione: true }),
  "natale",
  "in produzione ?fase= è ignorato",
);
assert.equal(
  calcolaFase({ giorno: "2026-12-20", fine, faseRichiesta: "inverno", produzione: false }),
  "inverno",
);
assert.equal(
  calcolaFase({ giorno: "2027-02-01", fine, faseRichiesta: "natale", produzione: false }),
  "natale",
);
assert.equal(fineNatale(undefined), "2027-01-06");
assert.equal(fineNatale("non-una-data"), "2027-01-06");
assert.equal(fineNatale("2027-01-07"), "2027-01-07");

console.log("Fase inverno: ok");
