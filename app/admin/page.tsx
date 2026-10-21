import { AdminPanel } from "@/components/AdminPanel";
import { loadArchivio } from "@/lib/blob-archive";
import { blobEnvironmentLabel, blobTokenPresent } from "@/lib/blob-token";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminPage() {
  const archivio = await loadArchivio();
  return (
    <AdminPanel
      connected={blobTokenPresent()}
      menuUrl={archivio.menuUrl}
      photos={archivio.photos}
      pranzo={archivio.pranzo}
      environmentLabel={blobEnvironmentLabel()}
    />
  );
}
