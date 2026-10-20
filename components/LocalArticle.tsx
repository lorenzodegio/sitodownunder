import Image from "next/image";
import Link from "next/link";
import { Murale } from "@/components/Murale";
import type { PaginaLocale } from "@/data/pagine-locali";
import { locale } from "@/data/locale";
import { site } from "@/content/site";
import type { PublicPhoto } from "@/lib/archivio-shared";

export function LocalArticle({ page, photos }: { page: PaginaLocale; photos: readonly PublicPhoto[] }) {
  return (
    <article className="local-page">
      <div className="local-wrap">
        <p className="breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> · </span>
          <span>{page.navLabel}</span>
        </p>
        <span className="rib">{page.kicker}</span>
        <h1 className="display local-h1">{page.h1}</h1>
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <h2>Come arrivare</h2>
        <p>{page.comeArrivare}</p>
        <h2>Cosa ordinare</h2>
        <ul className="local-dishes">
          {page.piatti.map((dish) => (
            <li key={dish.name}>
              <strong>{dish.name}.</strong> {dish.text}
            </li>
          ))}
        </ul>
        <div className="local-murales">
          {page.murales.map((murale) => (
            <Murale key={murale.src} src={murale.src} alt={murale.alt} width={murale.width} height={murale.height} className="local-murale" />
          ))}
        </div>
        {photos.length > 0 ? (
          <div className="local-photos">
            {photos.slice(0, 2).map((photo) => (
              <Image key={photo.src} src={photo.src} alt={photo.alt} width={800} height={600} loading="lazy" className="local-photo" />
            ))}
          </div>
        ) : null}
        <h2>Domande su questa zona</h2>
        {page.faq.map((item) => (
          <div key={item.q} className="local-faq">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
        <div className="hero-actions">
          <a className="pill btn-solid" href={site.phone.tel}>
            Chiama {locale.phoneDisplay}
          </a>
          <a className="pill btn-ghost" href={site.phone.whatsapp}>
            Scrivi su WhatsApp
          </a>
        </div>
        <p className="local-links">
          <Link href="/">Torna alla home</Link>
          <Link href="/menu">Leggi il menù</Link>
          {page.links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </p>
        <address>{locale.nap}</address>
      </div>
    </article>
  );
}
