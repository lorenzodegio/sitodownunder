import { site } from "@/content/site";

export function CallBar() {
  return (
    <div className="callbar">
      <a className="call-primary" href={site.phone.tel}>
        {site.callbar.call}
      </a>
      <a className="call-secondary" href={site.mapsUrl}>
        {site.callbar.maps}
      </a>
      <a className="call-secondary" href={site.reviewUrl}>
        Lasciaci una recensione
      </a>
    </div>
  );
}
