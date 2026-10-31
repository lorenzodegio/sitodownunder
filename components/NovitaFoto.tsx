import { PhotoFrame } from "@/components/PhotoFrame";
import type { PublicPhoto } from "@/lib/archivio-shared";

export function NovitaFoto({ photo, tone }: { photo: PublicPhoto; tone?: "light" }) {
  return (
    <div className="novita-shot">
      <span className="novita-bollino">novità del mese</span>
      <PhotoFrame photo={{ src: photo.src, label: photo.alt, ratio: "portrait", radius: 20, tone }} />
    </div>
  );
}
