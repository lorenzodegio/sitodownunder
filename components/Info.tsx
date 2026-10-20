import { Faro } from "@/components/Faro";
import { HoursTable } from "@/components/HoursTable";
import { site } from "@/content/site";

export function Info() {
  return (
    <section id="info" className="section" aria-labelledby="info-title">
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
                <a className="address-link" href={site.mapsUrl}>
                  {site.addressFull}
                </a>
              </address>
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
