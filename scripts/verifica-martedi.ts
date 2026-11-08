/**
 * Data mostrata per i martedì della nonna.
 * Esecuzione: npx tsx scripts/verifica-martedi.ts
 *
 * Il 3 novembre la scheda è il 3. Il 4, dopo la mezzanotte di Roma, passa al 10.
 * Il 9 (lunedì) mostra già il martedì di domani.
 */
import assert from "node:assert/strict";
import { romeToday } from "../data/calendario";
import { eventiFormat, prossimoMartedi } from "../data/eventi";
import { campaignState } from "../data/martedi-nonna";

const casi = [
  {
    nome: "3 novembre, di giorno",
    istante: "2026-11-03T15:00:00+01:00",
    oggi: "2026-11-03",
    data: "2026-11-03",
    label: "Martedì 3 novembre",
    breve: "3 nov",
  },
  {
    nome: "3 novembre, un minuto prima della mezzanotte di Roma",
    istante: "2026-11-03T22:59:00.000Z",
    oggi: "2026-11-03",
    data: "2026-11-03",
    label: "Martedì 3 novembre",
    breve: "3 nov",
  },
  {
    nome: "4 novembre, subito dopo la mezzanotte di Roma",
    istante: "2026-11-03T23:00:00.000Z",
    oggi: "2026-11-04",
    data: "2026-11-10",
    label: "Martedì 10 novembre",
    breve: "10 nov",
  },
  {
    nome: "4 novembre, di giorno",
    istante: "2026-11-04T12:00:00+01:00",
    oggi: "2026-11-04",
    data: "2026-11-10",
    label: "Martedì 10 novembre",
    breve: "10 nov",
  },
  {
    nome: "9 novembre, lunedì",
    istante: "2026-11-09T12:00:00+01:00",
    oggi: "2026-11-09",
    data: "2026-11-10",
    label: "Martedì 10 novembre",
    breve: "10 nov",
  },
] as const;

for (const caso of casi) {
  const now = new Date(caso.istante);
  const next = prossimoMartedi(now);
  const format = eventiFormat(now).find((evento) => evento.id === "martedi-nonna");
  const stato = campaignState(now);

  assert.equal(romeToday(now), caso.oggi, `${caso.nome}: calendario di Roma`);
  assert.equal(next?.data, caso.data, `${caso.nome}: prossimoMartedi`);
  assert.equal(next?.label, caso.label, `${caso.nome}: etichetta della scheda`);
  assert.equal(next?.breve, caso.breve, `${caso.nome}: Prenota il`);
  assert.equal(format?.next.data, caso.data, `${caso.nome}: eventiFormat, la scheda di Prossimamente`);
  assert.equal(format?.next.label, caso.label, `${caso.nome}: Prossimamente`);
  assert.equal(stato.next?.date, caso.data, `${caso.nome}: MartediNonna`);
  assert.equal(stato.next?.label, caso.label, `${caso.nome}: etichetta MartediNonna`);

  console.log(`${caso.nome}: oggi ${caso.oggi} → ${next?.label} (Prenota il ${next?.breve})`);
}

console.log("Date dei martedì: ok");
