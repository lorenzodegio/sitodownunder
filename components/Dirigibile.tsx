import { Murale } from "@/components/Murale";

export function Dirigibile() {
  return (
    <div className="fly dirigibile" aria-hidden="true">
      <Murale
        src="/murales/dirigibile.png"
        alt=""
        decorative
        width={347}
        height={198}
        invert
        className="dirigibile-img"
      />
    </div>
  );
}
