import { Murale } from "@/components/Murale";

export function Stemma() {
  return (
    <div className="bob stemma">
      <Murale
        src="/murales/logo-scudo.png"
        alt="Logo Down Under Cafè: Lunch & Happy Hour, since 2010, Vanzago"
        width={595}
        height={900}
        priority
        invert
        className="stemma-img"
      />
    </div>
  );
}
