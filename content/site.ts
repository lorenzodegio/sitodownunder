/**
 * Testi e link della pagina.
 * Orari, indirizzo e telefono stanno in data/locale.ts.
 */

import { showGarden } from "@/data/flags";
import { hours, locale } from "@/data/locale";

export type { MinuteRange, Weekday } from "@/data/locale";

const name = locale.name;
const phoneDisplay = locale.phoneDisplay;
const address = locale.addressShort;
const heroLead =
  "Viaggi straordinari a base di burger, pizza e cocktail. In un locale disegnato come un romanzo di Jules Verne, a Vanzago dal 2010.";
export type PhotoRotate = "n15" | "p1" | "n1" | "p15";

export type Photo = {
  /** Percorso pubblico, es. "/images/burger.jpg". Null = riquadro tratteggiato. */
  src: string | null;
  label: string;
  lines?: readonly [string, string];
  fallbackSrc?: string;
  fallbackAlt?: string;
  ratio: "portrait" | "landscape" | "wide";
  radius: 20 | 24;
  rotate?: PhotoRotate;
  tone?: "light";
};

export const site = {
  name,
  meta: {
    title: "Down Under Cafè · Burger, pizza e aperitivo a Vanzago (Rho, Milano)",
    description:
      "Hamburger, pizza e cocktail tra i murales di Jules Verne. Pranzo di lavoro, aperitivo e cena a Vanzago, a due passi da Rho. Prenota: 338 439 5727.",
  },
  demoBanner:
    "Demo — proposta non ufficiale. Testi, menù e foto da confermare con il locale.",
  logo: {
    word: "DOWN UNDER",
    cafe: "cafè",
  },
  phone: {
    display: phoneDisplay,
    tel: "tel:+393384395727",
    whatsapp:
      "https://wa.me/393384395727?text=Ciao%2C%20vorrei%20prenotare%20un%20tavolo%20per%20pranzo",
  },
  address,
  addressFull: locale.addressFull,
  mapsUrl: locale.mapsUrl,
  hasMap: locale.hasMap,
  reviewUrl: locale.reviewUrl,
  instagram: {
    handle: locale.instagramHandle,
    url: locale.instagram,
  },
  nav: [
    { href: "/#prossimamente", label: "prossimamente" },
    { href: "/#pranzo", label: "pranzo" },
    { href: "/#menu", label: "menù" },
    { href: "/#garden", label: "garden" },
    { href: "/#eventi", label: "feste" },
    { href: "/#info", label: "orari" },
  ],
  header: {
    cta: "Prenota",
  },
  callbar: {
    call: "Chiama",
    maps: "Indicazioni",
  },
  openingCopy: {
    neutral: address,
    todaySuffix: " (oggi)",
    open: (time: string) => `Siamo aperti · fino alle ${time}`,
    reopen: (time: string) => `Ora chiusi · si riapre alle ${time}`,
    closed: "Ora chiusi · guarda gli orari",
  },
  /** Indice = getDay(): 0 domenica … 6 sabato. */
  dayNames: [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ],
  /** Ordine in tabella: dal lunedì alla domenica. */
  hoursOrder: [1, 2, 3, 4, 5, 6, 0] as const,
  hours,
  hero: {
    lines: ["Pranzo.", "Ape.", "Cena.", "ripeti."] as const,
    lead: heroLead,
    primaryCta: "Sali a bordo",
    primaryHref: "#menu",
    secondaryCta: "Cosa si mangia",
    secondaryHref: "#menu",
    ring: "LUNCH & HAPPY HOUR · SINCE 2010 · VANZAGO · BURGER & PIZZA BAR · COCKTAILS · ",
  },
  marquee: [
    "ventimila burger sotto i mari",
    "✳",
    "il giro del pranzo in 60 minuti",
    "✳",
    "viaggio al centro della pizza",
    "✳",
    "dalla terra all’ape",
    "✳",
  ],
  giornata: {
    kicker: "capitolo II · una giornata tipo",
    title: "Entri per un panino, esci che chiudiamo.",
    cards: [
      {
        tone: "paper",
        time: "lun–ven 11:30–15",
        title: "Lunch",
        text: "Primo + secondo con contorno da 14€, primi e secondi da 7€, bevande escluse. C’è anche tutto il menù della sera. Pensato per chi ha un’ora e un ufficio che aspetta.",
      },
      {
        tone: "ink",
        time: "mar–sab 18:30 · dom 18:00",
        title: "Ape",
        text: showGarden
          ? "L’aperitivo è il primo porto della serata: cocktail, bollicine e taglieri, in sala o nel garden. Se la sera si allunga, i format stanno nel diario di bordo."
          : "L’aperitivo è il primo porto della serata: cocktail, bollicine e taglieri. Se la sera si allunga, i format stanno nel diario di bordo.",
      },
      {
        tone: "paper",
        time: "fino alle 00:30 · ven e sab all’1",
        title: "Cena",
        text: "Burger, pizze e i piatti della cucina. Poi arriva il tiramisù fatto in casa e la dieta riparte lunedì.",
      },
    ],
  },
  photos: {
    burger: {
      src: null,
      label: "foto burger",
      fallbackSrc: "/murales/mongolfiera.png",
      fallbackAlt: "Murale della mongolfiera: Il giro del mondo in 80 giorni, Down Under Cafè Vanzago",
      ratio: "portrait",
      radius: 24,
      rotate: "n15",
    },
    pizza: {
      src: null,
      label: "foto pizza",
      fallbackSrc: "/murales/faro.png",
      fallbackAlt: "Murale del faro con il monogramma DUC, Down Under Cafè Vanzago",
      ratio: "portrait",
      radius: 24,
      rotate: "p1",
    },
    bancone: {
      src: null,
      label: "foto bancone",
      fallbackSrc: "/murales/order-here.png",
      fallbackAlt: "Murale del bancone: order here, wait the shaking, drink eat enjoy, pay here",
      ratio: "portrait",
      radius: 24,
      rotate: "n1",
    },
    murales: {
      src: null,
      label: "foto murales Jules Verne",
      lines: ["foto murales", "Jules Verne"],
      ratio: "portrait",
      radius: 24,
      rotate: "p15",
    },
    garden: {
      src: null,
      label: "foto del garden",
      fallbackSrc: "/murales/gabbie.png",
      fallbackAlt: "Murale della voliera di gabbie, al posto della foto del garden, Down Under Cafè Vanzago",
      ratio: "landscape",
      radius: 20,
    },
    buffet: {
      src: null,
      label: "foto buffet / sala allestita",
      fallbackSrc: "/murales/caverna-duc.png",
      fallbackAlt: "Murale della caverna con il monogramma DUC, al posto della foto della sala",
      ratio: "wide",
      radius: 20,
      tone: "light",
    },
  } satisfies Record<string, Photo>,
  pranzo: {
    kicker: "capitolo III · pausa pranzo",
    title: "Il giro del pranzo in 60 minuti.",
    lead: "Phileas Fogg ci ha messo 80 giorni, tu hai un’ora.",
    fixed: {
      eyebrow: "pranzo",
      price: "da 14€",
      includes: "Primo + secondo con contorno. Primi e secondi da 7€, bevande escluse.",
      vouchers: "A pranzo c’è anche tutto il menù della sera.",
    },
    features: [
      {
        title: "Il diario di bordo",
        text: "Il menù della settimana è in questa sezione, dal lunedì al venerdì.",
      },
      {
        title: "L’equipaggio dell’ufficio",
        text: "Siete in sei e avete un’ora? Scrivici in mattinata e trovate il tavolo pronto.",
      },
      {
        title: "La call non finisce?",
        text: "Take away: ordini al telefono, passi, mangi davanti al monitor. Non giudichiamo.",
      },
    ],
    whatsappCta: "Prenota il tavolo su WhatsApp",
    takeawayCta: "Ordina da asporto",
  },
  menu: {
    kicker: "capitolo IV · ventimila burger sotto i mari",
    title: "E tu cosa scegli?",
    items: [
      { name: "I Burgers", text: "Il motivo per cui la gente viene. Carne seria, pane ai semi, abbinamenti che non ti aspetti.", spinta: true },
      { name: "Carne", text: "Carni del mese: costata, bavetta e tagliata di picanha." },
      { name: "Specialità", text: "Pulled pork, tartare e roastbeef." },
      { name: "I Dolci", text: "Fatti in casa. Il tiramisù ha un fan club." },
      { name: "I Cocktail", text: "I classici fatti come si deve, più quello che si inventa il bancone." },
      { name: "Vini, Bolle & Birre", text: "Al calice, in bottiglia, alla spina." },
      { name: "E altro", text: "", sotto: "hot dog · club sandwich · taglieri" },
    ],
    takeaway: "Serata divano? Take away sempre attivo: chiami, passi, sparisci.",
    pdfLabel: "Scarica PDF",
    pdfHref: "/menu/pdf",
  },
  garden: {
    kicker: "capitolo VI · l’isola misteriosa",
    title: "Garden mode: on.",
    text: "Misteriosa fino a un certo punto: è il garden qui fuori. Gazebo, siepi, lucine. Appena il meteo collabora si mangia e si beve all’aperto.",
  },
  eventi: {
    kicker: "capitolo V · dalla Terra alla Luna",
    title: "Tu porti l’equipaggio. Al resto pensiamo noi.",
    text: "Compleanni, lauree, battesimi, cene aziendali che per una volta non sono una tortura. Aperitivo a buffet o cena su misura: dicci quanti siete.",
    tags: ["18 anni", "lauree", "compleanni", "battesimi", "cene aziendali"],
    cta: "Organizziamola",
  },
  info: {
    kicker: "capitolo VI · il faro in capo al mondo",
    title: "Segui il faro. Passa.",
    phoneLabel: "chiama o scrivi",
    whereLabel: "coordinate",
    socialLabel: "il diario di bordo",
  },
  footer: {
    lines: ["L’impossibile", "non è un limite,", "è una sfida."] as const,
    note: "(sta scritto sul muro, mica l’abbiamo detto noi)",
  },
  stemmaLabel: "Stemma Down Under Cafè, since 2010, Vanzago",
} as const;

export type Site = typeof site;
