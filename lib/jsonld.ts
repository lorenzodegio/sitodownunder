import { homeFaq, type Faq } from "@/data/faq";
import { showGarden } from "@/data/flags";
import { areaServed, hours, locale, schemaDays } from "@/data/locale";
import { eventiAttivi } from "@/data/eventi";
import type { FotoSection, PublicPhoto } from "@/lib/archivio-shared";
import { FOTO_SECTIONS } from "@/lib/archivio-shared";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function clock(total: number): string {
  const minutes = total % 1440;
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

function openingHoursSpecification() {
  if (!hours) return [];
  return hours.flatMap((ranges, day) =>
    ranges.map(([start, end]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: schemaDays[day],
      opens: clock(start),
      closes: clock(end),
    })),
  );
}

function faqNode(faqs: readonly Faq[], id: string) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function restaurantNode(photos: Record<FotoSection, PublicPhoto[]>) {
  const images = [absoluteUrl("/murales/logo-scudo.png")];
  const sections = showGarden ? FOTO_SECTIONS : FOTO_SECTIONS.filter((section) => section !== "garden");
  for (const section of sections) {
    for (const photo of photos[section]) {
      if (images.length >= 4) break;
      images.push(photo.src);
    }
  }

  return {
    "@type": ["Restaurant", "BarOrPub"],
    "@id": `${siteUrl()}/#ristorante`,
    name: locale.name,
    legalName: locale.legalName,
    vatID: `IT${locale.vat}`,
    url: siteUrl(),
    image: images,
    logo: absoluteUrl("/murales/logo-scudo.png"),
    telephone: locale.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: locale.streetAddress,
      postalCode: locale.postalCode,
      addressLocality: locale.addressLocality,
      addressRegion: locale.addressRegion,
      addressCountry: locale.addressCountry,
    },
    servesCuisine: ["Hamburger", "Pizza", "Italiana", "Cucina lombarda"],
    acceptsReservations: true,
    menu: absoluteUrl("/menu"),
    hasMap: locale.hasMap,
    ...(hours ? { openingHoursSpecification: openingHoursSpecification() } : {}),
    sameAs: [locale.instagram],
    areaServed: areaServed.map((area) => ({ "@type": area.type, name: area.name })),
  };
}

function martediEvents(photos: Record<FotoSection, PublicPhoto[]>) {
  return eventiAttivi().flatMap((evento) =>
    evento.date.map((day, index) => {
      const photo = day.foto || photos.martedi[index]?.src;
      return {
        "@type": "Event",
        "@id": `${siteUrl()}/#${evento.id}-${day.data}`,
        name: `${evento.titolo}: ${day.piatto}`,
        startDate: day.data,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        description: evento.descrizione,
        ...(photo ? { image: photo.startsWith("http") ? photo : absoluteUrl(photo) } : {}),
        location: {
          "@type": "Place",
          name: locale.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: locale.streetAddress,
            postalCode: locale.postalCode,
            addressLocality: locale.addressLocality,
            addressRegion: locale.addressRegion,
            addressCountry: locale.addressCountry,
          },
        },
        organizer: { "@id": `${siteUrl()}/#ristorante` },
        offers: {
          "@type": "Offer",
          price: day.amount,
          priceCurrency: "EUR",
          availability: "https://schema.org/LimitedAvailability",
          url: `${siteUrl()}/#prossimamente`,
        },
      };
    }),
  );
}

export function homeJsonLd(photos: Record<FotoSection, PublicPhoto[]>) {
  return {
    "@context": "https://schema.org",
    "@graph": [restaurantNode(photos), ...martediEvents(photos), faqNode(homeFaq, `${siteUrl()}/#faq`)],
  };
}

export function breadcrumb(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl()}/` },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}

export function localJsonLd(page: { h1: string; slug: string; faq: readonly Faq[] }) {
  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumb(page.h1, `/${page.slug}`), faqNode(page.faq, `${siteUrl()}/${page.slug}#faq`)],
  };
}

export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumb("Menù", "/menu")],
  };
}
