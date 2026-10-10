import { TimbroCarpeDiem } from "@/components/TimbroCarpeDiem";
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
      <p className="footer-legal">
        {site.name} · {site.addressFull} · {site.phone.display} · {site.placeholders.vat}
      </p>
    </footer>
  );
}
