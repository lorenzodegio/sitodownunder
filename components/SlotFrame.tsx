import Image from "next/image";
import { slotById, type FotoSlot } from "@/data/foto-slot";
import type { SlotRecord } from "@/lib/slot-types";

function classi(slot: FotoSlot, extra: string): string {
  return [
    "photo-frame",
    slot.formato === "4:3" ? "landscape" : "",
    slot.formato === "1:1" ? "square" : "",
    slot.toneLight ? "tone-light" : "",
    slot.rotate ? `rot-${slot.rotate}` : "",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export function SlotFrame({
  id,
  record,
  indicazioni,
  className = "",
  priority = false,
  sizes,
}: {
  id: string;
  record: SlotRecord | null;
  indicazioni: boolean;
  className?: string;
  priority?: boolean;
  sizes: string;
}) {
  const slot = slotById(id);

  if (record) {
    return (
      <div className={classi(slot, `has-image ${className}`)} data-slot={id}>
        <Image
          src={record.url}
          alt={record.descrizione || record.piatto}
          fill
          sizes={sizes}
          className="photo-img"
          style={{ objectPosition: `${record.focusX}% ${record.focusY}%` }}
          priority={priority}
        />
      </div>
    );
  }

  if (indicazioni) {
    return (
      <div className={classi(slot, `is-slot ${className}`)} data-slot={id}>
        <span className="slot-num">{slot.etichetta}</span>
        <span className="slot-hint">{slot.hint}</span>
      </div>
    );
  }

  return (
    <div className={classi(slot, `has-fallback ${className}`)} data-slot={id}>
      <Image src={slot.fallbackSrc} alt={slot.fallbackAlt} fill sizes={sizes} className="photo-img photo-fallback" />
    </div>
  );
}

export function SlotEvPhoto({
  id,
  record,
  indicazioni,
  badge,
  sizes,
}: {
  id: string;
  record: SlotRecord | null;
  indicazioni: boolean;
  badge?: string;
  sizes: string;
}) {
  const slot = slotById(id);
  if (record) {
    return (
      <div className="ev-photo" data-slot={id}>
        {badge ? <span className="ev-badge">{badge}</span> : null}
        <Image
          src={record.url}
          alt={record.descrizione || record.piatto}
          fill
          sizes={sizes}
          className="photo-img"
          style={{ objectPosition: `${record.focusX}% ${record.focusY}%` }}
        />
      </div>
    );
  }

  return (
    <div className="ev-photo ev-photo-empty" data-slot={id}>
      {badge ? <span className="ev-badge">{badge}</span> : null}
      {indicazioni ? (
        <>
          <small>{slot.etichetta}</small>
          <span>{slot.hint}</span>
        </>
      ) : null}
    </div>
  );
}
