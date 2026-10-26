import Link from "next/link";
import { showGarden } from "@/data/flags";
import { mostraNovita } from "@/data/novita";
import { site } from "@/content/site";

export function Header() {
  const base = site.nav.filter((item) => showGarden || item.href !== "/#garden");
  const menuAt = base.findIndex((item) => item.href === "/#menu");
  const links = mostraNovita()
    ? [...base.slice(0, menuAt + 1), { href: "/#novita", label: "novità" }, ...base.slice(menuAt + 1)]
    : base;

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
