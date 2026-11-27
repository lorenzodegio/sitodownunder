import Link from "next/link";
import { MenuMobile } from "@/components/MenuMobile";
import { showGarden } from "@/data/flags";
import { novitaInElenco } from "@/data/novita";
import { site } from "@/content/site";
import { nataleAttivo } from "@/lib/natale";
import { whatsappLink } from "@/lib/whatsapp";

export function Header() {
  const novitaVisibile = novitaInElenco().length > 0;
  const links = site.nav.filter((item) => {
    if (!showGarden && item.href === "/#garden") return false;
    if (item.href === "/#natale" && !nataleAttivo()) return false;
    if (item.href === "/#novita" && !novitaVisibile) return false;
    return true;
  });

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="logo" href="/">
          {site.logo.word} <span className="logo-cafe">{site.logo.cafe}</span>
        </Link>
        <nav className="nav-links" aria-label="Sezioni">
          {links.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <MenuMobile
            voci={links.map((item) => ({
              href: item.href,
              label: item.label,
              evidenza: item.href === "/#natale",
            }))}
            chiama={{ href: site.phone.tel, label: "Chiama" }}
            whatsapp={{ href: whatsappLink("Ciao, vorrei prenotare un tavolo."), label: "Prenota su WhatsApp" }}
          />
          <a className="pill btn-solid btn-compact" href={site.phone.tel}>
            {site.header.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
