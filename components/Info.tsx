import { CosaDelGiorno } from "@/components/CosaDelGiorno";
import { Faro } from "@/components/Faro";
import { Decorazioni } from "@/components/Decorazioni";
import { HoursTable } from "@/components/HoursTable";
import { site } from "@/content/site";

export async function Info() {
  return (
    <section id="info" className="section section-sea" aria-labelledby="info-title">
      <Decorazioni dove="info" />
      <div className="wrap">
        <div className="head">
          <div className="head-copy slim">
            <span className="rib rv">{site.info.kicker}</span>
            <h2 id="info-title" className="display rv">
              {site.info.title}
            </h2>
          </div>
          <Faro />
        </div>
        <CosaDelGiorno variant="breve" />
        <div className="info-grid">
          <HoursTable />
          <div className="rv contacts">
            <div>
              <div className="contact-label">{site.info.phoneLabel}</div>
              <a className="phone-link" href={site.phone.tel}>
                {site.phone.display}
              </a>
            </div>
            <div>
              <div className="contact-label">{site.info.whereLabel}</div>
              <address>
                <a className="address-link" href={site.hasMap}>
                  {site.addressFull}
                </a>
              </address>
              <div className="contact-actions">
                <a className="pill btn-solid" href={site.mapsUrl}>
                  Indicazioni
                </a>
                <a className="pill btn-ghost" href={site.reviewUrl}>
                  Lasciaci una recensione
                </a>
              </div>
            </div>
            <div>
              <div className="contact-label">{site.info.socialLabel}</div>
              <a className="ig-link" href={site.instagram.url}>
                {site.instagram.handle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
