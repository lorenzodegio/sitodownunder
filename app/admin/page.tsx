import { AdminPanel } from "@/components/AdminPanel";
import { loadArchivio } from "@/lib/blob-archive";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const archivio = await loadArchivio();
  return <AdminPanel configured={archivio.configured} menuUrl={archivio.menuUrl} photos={archivio.photos} />;
}
