import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AperitivoNatale } from "@/components/AperitivoNatale";
import { CeneNatale } from "@/components/CeneNatale";
import { GalleriaAlbero } from "@/components/FotoNatale";
import { aperitivoNatale } from "@/data/eventi";
import { JsonLd } from "@/components/JsonLd";
import { SiteFrame } from "@/components/SiteFrame";
import { natale, nataleFaq } from "@/data/natale";
import { nataleJsonLd } from "@/lib/jsonld";
import { nataleAttivo } from "@/lib/natale";
import { fotoAlbero, loadSlotVista } from "@/lib/slot-vista";

const title = "Cene di Natale aziendali e tra amici · Down Under Cafè Vanzago";
const description = `Tre menù per gruppi: ${natale.proposte.map((proposta) => `${proposta.nome} ${proposta.prezzo}€`).join(", ")}. Per almeno 10 persone, tutto dicembre.`;

export function generateMetadata(): Metadata {
  if (!nataleAttivo()) return { robots: { index: false, follow: false } };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/cene-di-natale" },
    openGraph: {
      title,
      description,
      locale: "it_IT",
      type: "website",
      url: "/cene-di-natale",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CeneDiNatalePage() {
  if (!nataleAttivo()) notFound();
  const aperitivo = aperitivoNatale();
  const vista = await loadSlotVista();
  const albero = fotoAlbero(vista.items);

  return (
    <SiteFrame>
      <JsonLd data={nataleJsonLd()} />
      <article className="local-page natale-intro">
        <div className="local-wrap">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> · </span>
            <span>Cene di Natale</span>
          </p>
          <h1 className="display local-h1">Cene di Natale a Vanzago: tre menù per gruppi</h1>
        </div>
      </article>
      <GalleriaAlbero foto={albero} />
      <CeneNatale albero={albero[0] ?? null} />
      <article className="local-page">
        <div className="local-wrap">
          <p>
            Le tre proposte si consumano al Down Under Cafè, in Via I Maggio 1 a Vanzago. Da Rho, dalla Fiera Milano
            Rho, da Pogliano, da Pregnana e da Arluno si arriva senza attraversare Milano.
          </p>
          <h2>Domande</h2>
          {nataleFaq.map((voce) => (
            <div key={voce.q} className="local-faq">
              <h3>{voce.q}</h3>
              <p>{voce.a}</p>
            </div>
          ))}
          {aperitivo ? <AperitivoNatale evento={aperitivo} /> : null}
          <p className="local-links">
            <Link href="/">Torna alla home</Link>
            <Link href="/#natale">I tre menù</Link>
          </p>
        </div>
      </article>
    </SiteFrame>
  );
}
