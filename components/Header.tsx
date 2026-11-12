import Link from "next/link";
import { showGarden } from "@/data/flags";
import { novitaInElenco } from "@/data/novita";
import { site } from "@/content/site";
import { nataleAttivo } from "@/lib/natale";

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
        <a className="pill btn-solid btn-compact" href={site.phone.tel}>
          {site.header.cta}
        </a>
      </div>
    </header>
  );
}
