import Link from "next/link";
import { Murale } from "@/components/Murale";
import { TimbroCarpeDiem } from "@/components/TimbroCarpeDiem";
import { pagineLocali } from "@/data/pagine-locali";
import { locale } from "@/data/locale";
import { site } from "@/content/site";

const tilts = ["tilt-2", "tilt-15", "tilt-n1"] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lines">
        {site.footer.lines.map((line, index) => (
          <span key={line} className={`rib rib-lg ${tilts[index]}`}>
            {line}
          </span>
        ))}
      </div>
      <TimbroCarpeDiem />
      <p className="footer-note">{site.footer.note}</p>
      <address className="footer-legal">
        <a href={locale.hasMap}>{locale.nap}</a>
      </address>
      <nav className="footer-local" aria-label="Pagine locali">
        <p>Ci trovi vicino a…</p>
        <ul>
          {pagineLocali.map((page) => (
            <li key={page.slug}>
              <Link href={`/${page.slug}`}>{page.navLabel}</Link>
            </li>
          ))}
          <li>
            <Link href="/menu">Menù</Link>
          </li>
        </ul>
      </nav>
      <p className="footer-legal">
        {locale.legalName}
        <br />
        P. IVA {locale.vat}
        {" · "}
        PEC <a href={`mailto:${locale.pec}`}>{locale.pec}</a>
      </p>
      <details className="toilettes-egg">
        <summary>C’è anche scritto sul muro</summary>
        <Murale
          src="/murales/mano-toilettes.png"
          alt=""
          decorative
          width={352}
          height={678}
          invert
          className="toilettes-img"
        />
      </details>
    </footer>
  );
}
