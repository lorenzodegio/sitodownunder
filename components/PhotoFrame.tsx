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
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {photo.src ? (
        <Image src={photo.src} alt={photo.label} fill sizes="(max-width: 800px) 90vw, 320px" className="photo-img" />
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
