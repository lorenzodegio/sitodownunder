import { AdminPanel } from "@/components/AdminPanel";
import { getMenuPdfUrl } from "@/lib/blob-archive";
import { blobEnvironmentLabel, blobTokenPresent } from "@/lib/blob-token";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminPage() {
  const menuUrl = await getMenuPdfUrl();
  return (
    <AdminPanel connected={blobTokenPresent()} menuUrl={menuUrl} environmentLabel={blobEnvironmentLabel()} />
  );
}
