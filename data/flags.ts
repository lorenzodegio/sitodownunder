/** La sezione garden resta nel codice. Con false non viene pubblicata. */
export const showGarden = false;

/**
 * Stagione pubblicata. "autunno" cambia colori, foglie e la riga in hero.
 * In preview e in locale, ?stagione=off la forza a null.
 */
export const season = process.env.NEXT_PUBLIC_SEASON ?? null;
