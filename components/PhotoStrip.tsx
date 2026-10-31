import Image from "next/image";
import type { PublicPhoto } from "@/lib/archivio-shared";

export function PhotoStrip({ photos }: { photos: readonly PublicPhoto[] }) {
  if (photos.length === 0) return null;

  return (
    <div className="photo-strip">
      {photos.map((photo) => (
        <figure key={photo.src} className="photo-shot">
          <Image src={photo.src} alt={photo.alt} width={280} height={350} loading="lazy" className="strip-img" />
          {photo.alt ? <figcaption className="photo-caption">{photo.alt}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}
