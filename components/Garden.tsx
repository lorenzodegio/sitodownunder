import { PhotoFrame } from "@/components/PhotoFrame";
import { site } from "@/content/site";

export function Garden() {
  return (
    <section id="garden" className="section-tight">
      <div className="wrap sheet-garden">
        <svg className="ink spin rosa" aria-hidden="true" viewBox="0 0 120 120">
          <circle className="w" cx="60" cy="60" r="54" />
          <circle cx="60" cy="60" r="42" />
          <path className="k" d="M60 14l9 37l37 9l-37 9l-9 37l-9-37l-37-9l37-9z" />
        </svg>
        <PhotoFrame photo={site.photos.garden} />
        <div className="rv">
          <span className="rib">{site.garden.kicker}</span>
          <h2 className="display display-md">{site.garden.title}</h2>
          <p className="prose-lg prose-mutedL">{site.garden.text}</p>
        </div>
      </div>
    </section>
  );
}
