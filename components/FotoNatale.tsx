import Image from "next/image";
import { urlMediaSlot } from "@/lib/archivio-shared";
import type { SlotRecord } from "@/lib/slot-types";

function Quadro({ record, priority, sizes }: { record: SlotRecord; priority: boolean; sizes: string }) {
  return (
    <div className="albero-quadro">
      <Image
        src={urlMediaSlot(record.pathname, record.url)}
        alt={record.descrizione || record.piatto}
        fill
        unoptimized
        sizes={sizes}
        priority={priority}
        className="photo-img photo-intera"
      />
    </div>
  );
}

/** Cornice da biglietto. Non disegna nulla se la foto manca: il chiamante non la monta. */
export function BigliettoAlbero({ record }: { record: SlotRecord }) {
  return (
    <figure className="albero-biglietto">
      <span className="albero-nastro" aria-hidden="true" />
      <svg className="albero-fiocco" aria-hidden="true" viewBox="0 0 120 70">
        <path d="M60 36C44 14 14 6 8 22s22 26 52 14z" fill="#B5372E" stroke="#8E2A23" strokeWidth="2" />
        <path d="M60 36C76 14 106 6 112 22s-22 26-52 14z" fill="#B5372E" stroke="#8E2A23" strokeWidth="2" />
        <path d="M56 40l-14 28M64 40l14 28" stroke="#B5372E" strokeWidth="9" strokeLinecap="round" />
        <rect x="51" y="28" width="18" height="16" rx="5" fill="#8E2A23" />
      </svg>
      <Quadro record={record} priority sizes="(max-width: 800px) 72vw, 240px" />
    </figure>
  );
}

export function GalleriaAlbero({ foto }: { foto: readonly SlotRecord[] }) {
  if (!foto.length) return null;

  return (
    <section className="albero-galleria" aria-labelledby="albero-title">
      <div className="local-wrap">
        <h2 id="albero-title" className="display">
          Il nostro albero, quest&apos;anno
        </h2>
        <ul className="albero-lista">
          {foto.map((record, index) => (
            <li key={record.slot}>
              <Quadro record={record} priority={index === 0} sizes="(max-width: 800px) 46vw, 240px" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
