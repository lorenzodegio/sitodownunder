import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MenuPranzoSettimana } from "@/components/MenuPranzoSettimana";
import { SiteFrame } from "@/components/SiteFrame";
import { pranzoFisso, serateMenu, vociMenu } from "@/data/menu";
import { locale } from "@/data/locale";
import { site } from "@/content/site";
import { menuJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Menù",
  description:
    "Menù del Down Under Cafè a Vanzago: burger, pizze, piade, cocktail e pranzo fisso. Prezzi [prezzo da confermare]. Prenota al 338 439 5727.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menù · Down Under Cafè Vanzago",
    description:
      "Burger, pizze, piade, cocktail e pranzo fisso. Il PDF si scarica da questa pagina quando è online.",
    locale: "it_IT",
    type: "website",
    url: "/menu",
  },
};

export const revalidate = 3600;

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ pdf?: string }> }) {
  const { pdf } = await searchParams;

  return (
    <SiteFrame>
      <JsonLd data={menuJsonLd()} />
      <article className="local-page">
        <div className="local-wrap">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> · </span>
            <span>Menù</span>
          </p>
          <span className="rib">carta · Vanzago</span>
          <h1 className="display local-h1">Menù del Down Under</h1>
          <p>
            Burger, pizza e cocktail in Via Primo Maggio 1, a Vanzago. I prezzi si confermano in sala e sul PDF: finché una
            voce non ha un prezzo verificato, qui non ne inventiamo uno.
          </p>
          {pdf === "assente" ? (
            <p className="admin-warn">Il PDF non è ancora online. Intanto il menù si legge qui sotto.</p>
          ) : null}
          <p>
            <Link className="pill btn-solid" href="/menu/pdf">
              Scarica il menù in PDF
            </Link>
          </p>

          <MenuPranzoSettimana />

          <h2>{pranzoFisso.name}</h2>
          <p>
            {pranzoFisso.when}. {pranzoFisso.text}
          </p>

          <ul className="local-dishes">
            {vociMenu.map((voce) => (
              <li key={voce.name}>
                <strong>{voce.name}.</strong> {voce.text}{" "}
                <span>{voce.price}</span>
              </li>
            ))}
          </ul>

          <h2>Serate su prenotazione</h2>
          {serateMenu.map((night) => (
            <div key={night.title}>
              <h3>
                {night.day} · {night.title}
              </h3>
              <p>{night.text}</p>
              <ul className="local-dishes">
                {night.dishes.map((dish) => (
                  <li key={dish}>{dish}</li>
                ))}
              </ul>
            </div>
          ))}

          <p>L’asporto è sempre attivo: si chiama, si passa, si porta via.</p>
          <div className="hero-actions">
            <a className="pill btn-solid" href={site.phone.tel}>
              Chiama {locale.phoneDisplay}
            </a>
            <Link className="pill btn-ghost" href="/">
              Torna alla home
            </Link>
          </div>
          <address>{locale.nap}</address>
        </div>
      </article>
    </SiteFrame>
  );
}
