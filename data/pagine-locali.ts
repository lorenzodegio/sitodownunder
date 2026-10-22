import type { Faq } from "@/data/faq";
import type { FotoSection } from "@/lib/archivio-shared";

export type PaginaLocale = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  navLabel: string;
  paragraphs: readonly string[];
  comeArrivare: string;
  piatti: readonly { name: string; text: string }[];
  murales: readonly { src: string; alt: string; width: number; height: number }[];
  photoSection: FotoSection;
  faq: readonly Faq[];
  links: readonly { href: string; label: string }[];
};

export const pagineLocali: readonly PaginaLocale[] = [
  {
    slug: "hamburger-provincia-di-milano",
    title: "Hamburger in provincia di Milano",
    description:
      "Hamburger a Vanzago, in provincia di Milano: burger, pizza e cocktail tra i murales di Jules Verne. Pranzo, aperitivo e cena. Prenota al 338 439 5727.",
    h1: "Hamburger in provincia di Milano: il Down Under a Vanzago",
    kicker: "provincia di Milano · Milano ovest",
    navLabel: "Hamburger in provincia",
    paragraphs: [
      "Cercare un hamburger in provincia di Milano, fuori dal centro, finisce spesso in due posti: una catena sul viale commerciale, oppure un locale che ha una cucina e una sala sua. Il Down Under Cafè sta a Vanzago, in Via Primo Maggio 1, ed è la seconda cosa. Dal 2010 si mangiano burger e pizza e si beve al bancone, in una sala coperta di murales tratti dai romanzi di Jules Verne.",
      "Il burger qui non è un contorno dell’aperitivo. È il motivo per cui si attraversa la provincia ovest: pane ai semi, carne seria, abbinamenti che non sono la solita lista fotocopiata. Accanto ci sono le pizze, dalla margherita a burrata, crudo e pistacchio, le piade romagnole, i club sandwich e i dolci fatti in casa, tiramisù compreso. A pranzo: primo + secondo con contorno da 14€, primi e secondi da 7€, bevande escluse. C’è anche tutto il menù della sera.",
      "La sala è un romanzo aperto. Polpo, dirigibile, caverne, gabbie, faro: ogni parete cita un libro, e il monogramma DUC torna tra i fossili e le nuvole. Non è una scenografia da sfilata. È il locale in cui, dal 22 novembre 2010, a Vanzago si pranza, si fa l’aperitivo e si cena. Gli orari sono lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30.",
      "Se stai confrontando le hamburagerie della provincia, vieni a vedere la sala prima di decidere dal solo nome. Il menù completo è in questa stessa pagina, anche in PDF quando il file è online. Per un tavolo si chiama o si scrive al 338 439 5727. L’asporto è sempre attivo: si ordina, si passa in Via Primo Maggio, si porta a casa.",
    ],
    comeArrivare:
      "Vanzago è su Milano ovest, lungo l’asse del Sempione. Via Primo Maggio 1 sta sul lato del paese rivolto verso Pregnana Milanese e Rho: da quel lato si entra senza attraversare tutto il centro. In auto si cerca posto lungo la via e nelle strade del quartiere. Non indichiamo un parcheggio multipiano, perché non c’è un silos da promettere. Da Mantegazza, che è frazione di Vanzago, la strada è ancora più corta.",
    piatti: [
      { name: "I burger", text: "Pane ai semi e carne seria: è la voce per cui il locale è conosciuto in zona." },
      { name: "Pranzo", text: "Primo + secondo con contorno da 14€. Primi e secondi da 7€, bevande escluse. C’è anche tutto il menù della sera." },
      { name: "Tiramisù", text: "Fatto in casa, a fine cena, quando il burger ha già fatto il suo." },
    ],
    murales: [
      {
        src: "/murales/polpo.png",
        alt: "Murale del polpo gigante: 20.000 leghe sotto i mari, Down Under Cafè Vanzago",
        width: 690,
        height: 558,
      },
      {
        src: "/murales/centro-terra.png",
        alt: "Lettering del murale: Voyage au centre de la Terre, Down Under Cafè Vanzago",
        width: 375,
        height: 374,
      },
    ],
    photoSection: "burger",
    faq: [
      {
        q: "È un hamburger di catena?",
        a: "No. Il Down Under è un cafè di Vanzago, aperto dal 2010, con cucina, bancone e sala disegnata sui romanzi di Jules Verne.",
      },
      {
        q: "Si può prenotare un tavolo dalla provincia?",
        a: "Sì. Chiama o scrivi al 338 439 5727. Se siete in più e venite a pranzo, meglio avvisare in mattinata.",
      },
    ],
    links: [
      { href: "/hamburger-rho", label: "Hamburger vicino a Rho" },
      { href: "/pizza-vanzago", label: "Pizza a Vanzago" },
    ],
  },
  {
    slug: "hamburger-rho",
    title: "Hamburger vicino a Rho",
    description:
      "Hamburger vicino a Rho: il Down Under è a Vanzago, in Via Primo Maggio 1. Burger, pizza e aperitivo verso la Fiera. Chiama subito il 338 439 5727.",
    h1: "Hamburger vicino a Rho",
    kicker: "da Rho verso Vanzago",
    navLabel: "Hamburger Rho",
    paragraphs: [
      "Rho ha i suoi bar e i suoi centri commerciali. Per un hamburger seduti, con una sala che non sia un food court, tanti si spostano di un paese: Vanzago, Via Primo Maggio 1, Down Under Cafè. È il lato di Vanzago rivolto proprio verso Rho e Pregnana, quindi non si tratta di attraversare Milano. Si esce da Rho in direzione ovest, lungo l’asse che porta al Sempione, e si arriva sulla via del locale.",
      "Il piatto che cerchi è il burger: pane ai semi, carne seria, abbinamenti del bancone e della cucina, non una lista identica a quella del centro commerciale. Se la fame è diversa ci sono le pizze, le piade, i taglieri e i cocktail. A pranzo, primo + secondo con contorno da 14€ e primi o secondi da 7€, bevande escluse. Aperitivo e cena seguono gli orari lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30.",
      "La differenza, rispetto a un pub qualunque vicino a Rho, è il locale stesso. Le pareti sono murales di Jules Verne: il polpo delle ventimila leghe, il dirigibile, la caverna con il monogramma DUC, le gabbie, il faro. Si viene per mangiare e si resta a guardare i muri. Dal 2010 è la stessa insegna, Lunch & Happy Hour, Vanzago.",
      "Per il tavolo usa il 338 439 5727, telefono o WhatsApp. Se sei a Rho e non vuoi sederti, l’asporto funziona allo stesso modo: ordini, passi in Via Primo Maggio, torni indietro. Il menù scritto, con le voci e il PDF quando c’è, sta nella pagina del menù.",
    ],
    comeArrivare:
      "Da Rho si prende la direzione Vanzago, senza entrare in tangenziale verso Milano. Via Primo Maggio è la porta est del paese, quella che guarda Pregnana Milanese. Il civico 1 è il Down Under. Il posto auto si cerca sulla via e nelle strade intorno: contiamo i parcheggi di quartiere, non un garage convenzionato. Dalla Fiera Milano Rho il senso di marcia è lo stesso, ancora verso ovest.",
    piatti: [
      { name: "Burger", text: "La voce da ordinare se sei uscito da Rho con questa fame precisa." },
      { name: "Pizza", text: "Margherita, burrata, crudo e pistacchio, se il tavolo è diviso." },
      { name: "Cocktail", text: "Dopo il burger, o al posto del secondo giro di macchina." },
    ],
    murales: [
      {
        src: "/murales/dirigibile.png",
        alt: "Murale del dirigibile, Down Under Cafè Vanzago",
        width: 347,
        height: 198,
      },
      {
        src: "/murales/gabbie-pesci.png",
        alt: "Murale delle gabbie con i pesci, Down Under Cafè Vanzago",
        width: 596,
        height: 501,
      },
    ],
    photoSection: "burger",
    faq: [
      {
        q: "Quanto dista da Rho, in minuti?",
        a: "Non pubblichiamo un tempo di viaggio: dipende dal traffico sull’asse del Sempione. La strada è breve, verso ovest, fino a Via Primo Maggio 1 a Vanzago.",
      },
      {
        q: "Il lunedì sera siete aperti per chi esce da Rho?",
        a: "Il lunedì a pranzo siamo aperti 11:30–15. La sera il lunedì è chiuso.",
      },
    ],
    links: [
      { href: "/pranzo-di-lavoro-rho", label: "Pranzo di lavoro" },
      { href: "/aperitivo-rho", label: "Aperitivo vicino a Rho" },
    ],
  },
  {
    slug: "pizza-vanzago",
    title: "Pizza a Vanzago",
    description:
      "Pizza a Vanzago al Down Under Cafè, in sala tra i murales di Jules Verne oppure d’asporto. Anche burger e cocktail. Via Primo Maggio 1, 338 439 5727.",
    h1: "Pizza a Vanzago",
    kicker: "in sala, non solo in scatola",
    navLabel: "Pizza Vanzago",
    paragraphs: [
      "A Vanzago la pizza del Down Under si mangia al tavolo, sotto i murales, non solo nel cartone sul divano. Il locale è in Via Primo Maggio 1, cafè dal 2010: burger, pizza e cocktail nello stesso posto. Le pizze partono dalla margherita e arrivano a burrata, crudo e pistacchio. Il resto della carta — specialità, piade, dolci — sta nel menù, che aggiorniamo in PDF e in questa pagina.",
      "Ha senso sedersi, se abiti a Vanzago o a Mantegazza, perché la sala è il motivo per cui il locale non somiglia a una pizzeria d’asporto. Jules Verne è sulle pareti: il viaggio al centro della terra, il faro, le gabbie, il polpo. Si ordina, si aspetta, si mangia, e intorno c’è un romanzo disegnato.",
      "L’asporto c’è, e non è un piano B di cui vergognarsi. Si chiama il 338 439 5727, si passa, si porta a casa. È la stessa pizza della sala. A pranzo molti mescolano: qualcuno prende primo e secondo da 14€, qualcuno la pizza, qualcuno il burger. La sera la pizza sta bene con un calice o con un cocktail del bancone.",
      "Gli orari sono lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30, non quelli di una consegna fino a tardi a tutti i costi. Se vuoi il tavolo, prenota prima. Da Mantegazza la strada è ancora più corta. Il numero è sempre 338 439 5727.",
    ],
    comeArrivare:
      "Se sei già a Vanzago, Via Primo Maggio è la strada sul lato est, verso Pregnana Milanese. Il civico 1 è il Down Under. Da Pogliano Milanese e da Pregnana si arriva da quella stessa parte, senza entrare nel centro storico per forza. Il parcheggio è lungo la via e nelle strade vicine: meglio non contare su un piazzale riservato.",
    piatti: [
      { name: "Margherita", text: "Il punto di partenza, prima delle varianti." },
      { name: "Burrata, crudo e pistacchio", text: "Le pizze per cui in sala parte la foto, come diciamo in carta." },
      { name: "Asporto", text: "Stessa pizza, ordinata al telefono e ritirata in Via Primo Maggio." },
    ],
    murales: [
      {
        src: "/murales/centro-terra.png",
        alt: "Lettering Voyage au centre de la Terre, Down Under Cafè Vanzago",
        width: 375,
        height: 374,
      },
      {
        src: "/murales/mongolfiera.png",
        alt: "Murale della mongolfiera: Il giro del mondo in 80 giorni, Down Under Cafè Vanzago",
        width: 775,
        height: 907,
      },
    ],
    photoSection: "pizza",
    faq: [
      {
        q: "Fate solo asporto?",
        a: "No. La pizza si mangia in sala e si può anche portare via. L’asporto si ordina al 338 439 5727.",
      },
      {
        q: "La domenica a pranzo fate pizza?",
        a: "La domenica si apre alle 18 e si chiude alle 00:30. La pizza si mangia in sala e anche d’asporto.",
      },
    ],
    links: [
      { href: "/hamburger-provincia-di-milano", label: "Hamburger in provincia" },
      { href: "/menu", label: "Menù completo" },
    ],
  },
  {
    slug: "pranzo-di-lavoro-rho",
    title: "Pranzo di lavoro tra Rho e Vanzago",
    description:
      "Pranzo di lavoro tra Rho e Vanzago: primo e secondo con contorno da 14€. Burger, piade e asporto al Down Under. Prenota al 338 439 5727.",
    h1: "Pranzo di lavoro tra Rho e Vanzago",
    kicker: "capitolo pranzo · un’ora, non ottanta giorni",
    navLabel: "Pranzo di lavoro",
    paragraphs: [
      "Il pranzo di lavoro, tra Rho e Vanzago, ha un problema solo: l’ora. Phileas Fogg ci ha messo ottanta giorni, tu hai la pausa. Il Down Under, in Via Primo Maggio 1 a Vanzago, a pranzo fa primo + secondo con contorno da 14€, primi e secondi da 7€, bevande escluse. Ti siedi, mangi, torni. Non è un pranzo di rappresentanza e non è un panino mangiato in macchina sul Sempione.",
      "Accanto al pranzo restano burger, piade, insalatone e tutto il menù della sera, per chi quel giorno vuole altro. I buoni pasto accettati vanno chiesti al telefono, così non elenchiamo marchi a caso. Il numero è 338 439 5727.",
      "Se siete l’equipaggio dell’ufficio, in sei e con un’ora, scrivete in mattinata su WhatsApp: il tavolo si prepara. Se la call slitta, c’è l’asporto. Ordini, passi da Via Primo Maggio, mangi davanti al monitor. Non è il modo più bello di vedere i murales, ma la cucina è la stessa. Apertura e chiusura sono lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30.",
      "Chi arriva dagli uffici di Rho, da Pregnana Milanese o dalla zona della Fiera trova il locale sul lato est di Vanzago, senza dover entrare a Milano. È un pranzo di provincia ovest, con una sala che almeno non sembra una mensa: Jules Verne sui muri, dal 2010. Il diario di bordo della settimana, quando c’è, esce anche su Instagram @downundercafe.",
    ],
    comeArrivare:
      "Da Rho e dalla Fiera Milano Rho si va verso Vanzago, direzione ovest. Via Primo Maggio 1 è prima del cuore del paese se si arriva da est. Per un’ora di pausa conta il tragitto reale di quel giorno, non un minutaggio stampato qui: il traffico sul Sempione non si lascia promettere. All’arrivo si parcheggia lungo la via, se c’è posto.",
    piatti: [
      { name: "Pranzo", text: "Primo + secondo con contorno da 14€. Primi e secondi da 7€, bevande escluse. C’è anche tutto il menù della sera." },
      { name: "Piade e insalatone", text: "Se il fisso non fa per quel giorno, la carta di mezzogiorno resta aperta." },
      { name: "Asporto", text: "Per la call che non finisce: si ordina e si ritira." },
    ],
    murales: [
      {
        src: "/murales/mongolfiera.png",
        alt: "Murale della mongolfiera, Il giro del mondo in 80 giorni, Down Under Cafè Vanzago",
        width: 775,
        height: 907,
      },
      {
        src: "/murales/faro.png",
        alt: "Murale del faro con il monogramma DUC, Down Under Cafè Vanzago",
        width: 357,
        height: 212,
      },
    ],
    photoSection: "bancone",
    faq: [
      {
        q: "Il pranzo c’è anche il sabato?",
        a: "Nel weekend, se la settimana successiva è già pronta, si vede quel menù. Altrimenti gli orari restano lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30.",
      },
      {
        q: "Accettate buoni pasto?",
        a: "Chiedilo al 338 439 5727: i marchi accettati li conferma il locale, non li indoviniamo sul sito.",
      },
    ],
    links: [
      { href: "/hamburger-rho", label: "Hamburger vicino a Rho" },
      { href: "/ristorante-vicino-fiera-milano-rho", label: "Vicino alla Fiera" },
    ],
  },
  {
    slug: "aperitivo-rho",
    title: "Aperitivo vicino a Rho",
    description:
      "Aperitivo vicino a Rho, al Down Under di Vanzago: cocktail, bollicine e taglieri negli orari lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30. Via Primo Maggio 1. 338 439 5727.",
    h1: "Aperitivo vicino a Rho",
    kicker: "dal martedì, dalle 18:30",
    navLabel: "Aperitivo Rho",
    paragraphs: [
      "L’aperitivo tra Rho e Vanzago, al Down Under, segue gli orari lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30. L’indirizzo è Via Primo Maggio 1, Vanzago, sul lato che guarda Rho. Si esce dal paese, si fa poca strada verso ovest, si entra in un cafè che dal 2010 scrive Lunch & Happy Hour sullo scudo.",
      "«Uno e andiamo» è la frase che sentiamo più spesso, e di solito non è vero. Cocktail fatti come si deve, bollicine, birre alla spina, taglieri da dividere. Se l’aperitivo diventa cena, la carta ha burger, pizze e i piatti del giorno. Se resta un giro solo, il bancone basta.",
      "La sala, dentro, non è neutra. I murales di Jules Verne occupano le pareti: è un aperitivo in un romanzo, non in un bancone interchangeable. Specchi, lampadari, il polpo, il faro. Si può venire da Rho dopo il lavoro, da Pregnana, da Pogliano, da Arluno, senza dossier di locali del centro. Per il tavolo, soprattutto se siete in tanti o se è venerdì, scrivete al 338 439 5727.",
      "Il giovedì e il martedì, a volte, l’aperitivo sconfina nelle serate a tema: gnocchi, cena della nonna, menù che va prenotato perché i posti finiscono. Il calendario del mese sta in sala e su Instagram. Se cercate solo un calice e un tagliere, la carta di tutti i giorni resta comunque lì.",
    ],
    comeArrivare:
      "Da Rho la direzione è Vanzago, asse verso il Sempione, fino a Via Primo Maggio. Non serve entrare in centro a Milano né cercare parcheggio sotto i portici di un corso. Si lascia la macchina lungo la via, se il posto c’è, e si entra. La sera il rientro è la stessa strada, al contrario.",
    piatti: [
      { name: "Cocktail", text: "I classici e quello che decide il bancone quella sera." },
      { name: "Taglieri", text: "Da dividere, così «uno e andiamo» dura un po’ di più." },
      { name: "In sala", text: "Lo stesso aperitivo, tra specchi, lampadari e murales." },
    ],
    murales: [
      {
        src: "/murales/camaleonte.png",
        alt: "Murale del camaleonte con il fumetto yo, Down Under Cafè Vanzago",
        width: 463,
        height: 204,
      },
      {
        src: "/murales/order-here.png",
        alt: "Murale order here del bancone, Down Under Cafè Vanzago",
        width: 224,
        height: 706,
      },
    ],
    photoSection: "bancone",
    faq: [
      {
        q: "L’aperitivo c’è anche il lunedì?",
        a: "Il lunedì sera è chiuso. Dal martedì al sabato l’aperitivo è dalle 18:30, la domenica dalle 18.",
      },
    ],
    links: [
      { href: "/hamburger-rho", label: "Hamburger vicino a Rho" },
      { href: "/feste-compleanni-vanzago", label: "Feste e compleanni" },
    ],
  },
  {
    slug: "ristorante-vicino-fiera-milano-rho",
    title: "Dove mangiare vicino a Fiera Milano Rho",
    description:
      "Dove mangiare vicino a Fiera Milano Rho: burger, pizza e cena al Down Under di Vanzago, Via Primo Maggio 1. Fuori dal quartiere fieristico. 338 439 5727.",
    h1: "Dove mangiare vicino a Fiera Milano Rho",
    kicker: "fuori dal quartiere fieristico",
    navLabel: "Vicino alla Fiera",
    paragraphs: [
      "Fiera Milano Rho, a fine giornata, ha i suoi punti ristoro dentro il quartiere e poco desiderio di restarci. Il Down Under non è in fiera. Sta a Vanzago, Via Primo Maggio 1, a ovest di Rho: si esce dal polo fieristico, si prende la direzione Vanzago e si arriva in un cafè, non in un altro padiglione. Burger, pizza, cocktail, sala con i murales di Jules Verne. Aperto dal 2010.",
      "Ha senso se vuoi sederti, parlare e mangiare qualcosa che non sia il menù del congresso. A pranzo, primo + secondo con contorno da 14€ per chi ha un’ora tra un incontro e l’altro, più la carta con burger e piade. La sera si cena. Apertura e chiusura sono lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30: se la fiera chiude tardi, meglio chiedere prima.",
      "Non promettiamo una navetta e non inventiamo un tempo di percorrenza. Dal quartiere Rho Fiera si va verso ovest. In alcune fasce orarie la strada è libera, in altre il Sempione è il Sempione. Meglio partire con questo in testa che con un «dieci minuti» stampato su un sito. All’arrivo si parcheggia in via, non in un garage del locale.",
      "Per il tavolo, soprattutto se siete un gruppo appena uscito da un padiglione, chiamate il 338 439 5727. Se volete solo portar via la cena in albergo o in appartamento, l’asporto è attivo: stesso numero, ritiro in Via Primo Maggio. Il menù si legge per intero nella pagina dedicata, così si sceglie prima di muoversi.",
    ],
    comeArrivare:
      "Si lascia Fiera Milano Rho verso Rho e poi verso Vanzago, direzione ovest, asse del Sempione. Il Down Under è in Via Primo Maggio 1, all’ingresso est di Vanzago, dal lato di Pregnana Milanese. Non è una fermata interna al quartiere fieristico: è un locale di paese, volutamente fuori dai padiglioni. Il ritorno in fiera o in stazione Rho Fiera è la stessa strada al contrario.",
    piatti: [
      { name: "Cena dopo la fiera", text: "Burger o pizza, a tavola, quando il badge si può togliere." },
      { name: "Pranzo tra due incontri", text: "Primo + secondo con contorno da 14€. Primi e secondi da 7€, bevande escluse. C’è anche tutto il menù della sera." },
      { name: "Asporto", text: "Se l’albergo è dall’altra parte e non vuoi cenare in fiera." },
    ],
    murales: [
      {
        src: "/murales/faro-fine-mondo.png",
        alt: "Lettering Il faro alla fine del mondo, Down Under Cafè Vanzago",
        width: 240,
        height: 184,
      },
      {
        src: "/murales/caverna-duc.png",
        alt: "Murale della caverna con il monogramma DUC, Down Under Cafè Vanzago",
        width: 801,
        height: 477,
      },
    ],
    photoSection: "sala",
    faq: [
      {
        q: "Siete dentro Fiera Milano?",
        a: "No. Siamo a Vanzago, in Via Primo Maggio 1, a ovest di Rho. Si esce dal quartiere fieristico e si viene in locale.",
      },
      {
        q: "Fate da mangiare tardi, dopo la chiusura dei padiglioni?",
        a: "La sera: martedì, mercoledì e giovedì 18:30–00:30, venerdì e sabato 18:30–1, domenica 18–00:30. Il lunedì sera è chiuso.",
      },
    ],
    links: [
      { href: "/pranzo-di-lavoro-rho", label: "Pranzo di lavoro" },
      { href: "/aperitivo-rho", label: "Aperitivo" },
    ],
  },
  {
    slug: "feste-compleanni-vanzago",
    title: "Feste, compleanni e lauree a Vanzago",
    description:
      "Compleanni, lauree e cene a Vanzago: il Down Under allestisce feste tra i murales di Jules Verne. Raccontaci quanti siete e chiama il 338 439 5727.",
    h1: "Feste, compleanni e lauree a Vanzago",
    kicker: "tu porti l’equipaggio",
    navLabel: "Feste e compleanni",
    paragraphs: [
      "Compleanni, lauree, diciotto anni, battesimi, cene aziendali che per una volta non sono una tortura: al Down Under di Vanzago si organizzano in Via Primo Maggio 1. Tu porti l’equipaggio. Al resto — aperitivo a buffet o cena su misura — pensiamo noi, dopo aver saputo quanti siete e che giorno vi serve. Non pubblichiamo una capienza inventata: la sala ha un limite vero, e si dice al telefono, non in una brochure.",
      "Il locale aiuta, perché non è una sala neutra da congresso. I murales di Jules Verne fanno già scena: polpo, faro, caverne, gabbie, il monogramma DUC. Per un diciottesimo o una laurea è una sala di cui la gente si ricorda, senza doverla addobbare fino a coprirla. Dal 22 novembre 2010, giorno dell’inaugurazione, di feste qui ne sono passate: i volantini di quella sera stanno ancora in archivio, sul sito.",
      "Si parte da una telefonata, 338 439 5727, o da un messaggio WhatsApp. Servono il numero delle persone, il tipo di festa e se preferite aperitivo a buffet o cena. I tag che sentiamo più spesso sono diciotto anni, lauree, compleanni, battesimi, cene aziendali. Il menù si costruisce da lì, non da un pacchetto unico con un prezzo copia-incollato. I prezzi si fanno sul preventivo, dopo la chiamata.",
      "Le feste stanno negli orari lunedì 11:30–15, martedì mercoledì e giovedì 11:30–15 e 18:30–00:30, venerdì 11:30–15 e 18:30–1, sabato 18:30–1, domenica 18–00:30, oppure in un accordo preciso preso prima. Una data fuori da quegli orari non si incastra da sola: va chiesta, e può essere un no. Meglio dirlo subito che scoprirlo il giorno prima. Prezzo: [prezzo da confermare].",
    ],
    comeArrivare:
      "Gli ospiti che arrivano da Vanzago, Mantegazza, Rho, Pregnana, Arluno, Sedriano, Nerviano, Cornaredo, Lainate o Bareggio usano la stessa indicazione: Via Primo Maggio 1, lato est del paese, verso Pregnana. Per una festa conviene dirlo agli invitati per scritto, insieme al numero 338 439 5727. Le macchine si sistemano lungo le vie del quartiere: se siete tanti, meglio dirlo anche a chi guida, così non contano tutti sullo stesso spiazzo.",
    piatti: [
      { name: "Aperitivo a buffet", text: "Per i diciotto e le lauree, quando la gente arriva a ondate." },
      { name: "Cena su misura", text: "Per il tavolo che vuole stare seduto, dal burger al tiramisù." },
      { name: "Sala", text: "Tra i murales, senza doverla addobbare fino a coprirla." },
    ],
    murales: [
      {
        src: "/murales/carpe-diem.png",
        alt: "Cartiglio del murale: L’impossibile non è un limite, è una sfida, Down Under Cafè Vanzago",
        width: 139,
        height: 155,
      },
      {
        src: "/murales/gabbie.png",
        alt: "Murale della voliera di gabbie, Down Under Cafè Vanzago",
        width: 1000,
        height: 431,
      },
    ],
    photoSection: "eventi",
    faq: [
      {
        q: "Quante persone ci stanno?",
        a: "Dipende da buffet o cena, e da quanti siete in sala. Chiamaci al 338 439 5727 con il numero degli invitati: ti diciamo se la data regge.",
      },
      {
        q: "Posso fare una festa di lunedì sera?",
        a: "Il lunedì sera il locale è chiuso. Una festa fuori dagli orari va chiesta a parte e può non essere possibile.",
      },
    ],
    links: [
      { href: "/aperitivo-rho", label: "Aperitivo" },
      { href: "/menu", label: "Menù" },
    ],
  },
];

export function paginaBySlug(slug: string): PaginaLocale | undefined {
  return pagineLocali.find((page) => page.slug === slug);
}
