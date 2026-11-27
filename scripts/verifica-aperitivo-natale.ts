/**
 * L'aperitivo di Natale resta visibile il 19 e il 20, e sparisce il 21.
 * Esecuzione: npx tsx scripts/verifica-aperitivo-natale.ts
 */
import assert from "node:assert/strict";
import { formatMartedi } from "../data/calendario";
import { aperitivoNatale } from "../data/eventi";
import { presentaMomento } from "../data/oggi";
import { aperitivoNataleEvent } from "../lib/jsonld";

const diciannove = new Date("2026-12-19T21:00:00+01:00");
const venti = new Date("2026-12-20T19:00:00+01:00");
const ventuno = new Date("2026-12-21T00:30:00+01:00");

assert.equal(formatMartedi("2026-12-20"), "Domenica 20 dicembre");

assert.ok(aperitivoNatale(diciannove), "il 19 dicembre alle 21:00 si vede");
assert.ok(aperitivoNatale(venti), "il 20 dicembre alle 19:00 si vede");
assert.equal(aperitivoNatale(ventuno), null, "il 21 dicembre alle 00:30 non c'è più");

assert.equal(presentaMomento(diciannove)?.titolo, "L'aperitivo di Natale");
assert.equal(presentaMomento(diciannove)?.kicker, "Domani");
assert.equal(presentaMomento(venti)?.kicker, "Stasera");
assert.notEqual(presentaMomento(new Date("2026-12-20T12:00:00+01:00"))?.titolo, "L'aperitivo di Natale");
assert.notEqual(presentaMomento(ventuno)?.titolo, "L'aperitivo di Natale");

const nodo = aperitivoNataleEvent(venti);
assert.ok(nodo);
assert.equal(nodo.name, "L'aperitivo di Natale");
assert.equal(nodo.startDate, "2026-12-20T18:00:00+01:00");
assert.equal(nodo.endDate, "2026-12-20T20:00:00+01:00");
assert.equal(nodo.offers.price, "15");
assert.equal(nodo.offers.priceCurrency, "EUR");
assert.equal(nodo.eventAttendanceMode, "https://schema.org/OfflineEventAttendanceMode");
assert.equal(nodo.eventStatus, "https://schema.org/EventScheduled");
assert.equal(aperitivoNataleEvent(ventuno), null);

console.log("Aperitivo di Natale: ok");
