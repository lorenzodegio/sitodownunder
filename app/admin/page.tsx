import { AdminPanel } from "@/components/AdminPanel";
import { loadArchivio } from "@/lib/blob-archive";
import { blobEnvironmentLabel, blobTokenEnvName } from "@/lib/blob-token";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const archivio = await loadArchivio();
  return (
    <AdminPanel
      configured={archivio.configured}
      menuUrl={archivio.menuUrl}
      photos={archivio.photos}
      pranzo={archivio.pranzo}
      tokenName={blobTokenEnvName()}
      environmentLabel={blobEnvironmentLabel()}
    />
  );
}
