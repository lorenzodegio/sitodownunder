import Link from "next/link";
import { showGarden } from "@/data/flags";
import { novitaConFoto } from "@/data/novita";
import { site } from "@/content/site";
import { loadSlotVista } from "@/lib/slot-vista";

export async function Header() {
  const vista = await loadSlotVista();
  const novitaVisibile = novitaConFoto(vista.items).length > 0;
  const links = site.nav.filter((item) => {
    if (!showGarden && item.href === "/#garden") return false;
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
