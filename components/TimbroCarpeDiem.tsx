import { Murale } from "@/components/Murale";

export function TimbroCarpeDiem() {
  return (
    <Murale
      src="/murales/carpe-diem.png"
      alt="Cartiglio del murale: L’impossibile non è un limite, è una sfida"
      width={139}
      height={155}
      invert
      className="timbro"
    />
  );
}
