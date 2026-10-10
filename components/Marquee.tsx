import { site } from "@/content/site";

export function Marquee() {
  const loop = [...site.marquee, ...site.marquee];

  return (
    <div className="marquee-bar" aria-hidden="true">
      <div className="marquee">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
