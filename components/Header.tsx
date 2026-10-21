import Link from "next/link";
import { showGarden } from "@/data/flags";
import { campaignState } from "@/data/martedi-nonna";
import { site } from "@/content/site";

export function Header() {
  const links = site.nav.filter((item) => showGarden || item.href !== "/#garden");
  const martedi = campaignState().visible;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="logo" href="/">
          {site.logo.word} <span className="logo-cafe">{site.logo.cafe}</span>
        </Link>
        <nav className="nav-links" aria-label="Sezioni">
          {martedi ? <Link href="/#martedi-nonna">martedì</Link> : null}
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
