import Image from "next/image";
import type { Photo } from "@/content/site";

export function PhotoFrame({ photo }: { photo: Photo }) {
  const classes = [
    "photo-frame",
    "rv",
    photo.ratio === "landscape" ? "landscape" : "",
    photo.ratio === "wide" ? "wide" : "",
    photo.tone === "light" ? "tone-light" : "",
    photo.radius === 20 ? "radius-20" : "",
    photo.rotate ? `rot-${photo.rotate}` : "",
    photo.src ? "has-image" : "",
    !photo.src && photo.fallbackSrc ? "has-fallback" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (photo.src) {
    return (
      <figure className="photo-shot">
        <div className={classes}>
          <Image src={photo.src} alt={photo.label} fill sizes="(max-width: 800px) 90vw, 320px" className="photo-img" />
        </div>
        {photo.label ? <figcaption className="photo-caption">{photo.label}</figcaption> : null}
      </figure>
    );
  }

  return (
    <div className={classes}>
      {photo.fallbackSrc ? (
        <Image
          src={photo.fallbackSrc}
          alt={photo.fallbackAlt || ""}
          fill
          sizes="(max-width: 800px) 90vw, 320px"
          className="photo-img photo-fallback"
        />
      ) : photo.lines ? (
        <span>
          {photo.lines[0]}
          <br />
          {photo.lines[1]}
        </span>
      ) : (
        <span>{photo.label}</span>
      )}
    </div>
  );
}
