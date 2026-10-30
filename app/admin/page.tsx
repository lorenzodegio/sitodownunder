import { AdminPanel } from "@/components/AdminPanel";
import { getMenuPdfUrl, loadDelMese } from "@/lib/blob-archive";
import { blobEnvironmentLabel, blobTokenPresent } from "@/lib/blob-token";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminPage() {
  const [menuUrl, delMese] = await Promise.all([getMenuPdfUrl(), loadDelMese()]);
  return (
    <AdminPanel
      connected={blobTokenPresent()}
      menuUrl={menuUrl}
      environmentLabel={blobEnvironmentLabel()}
      delMese={delMese}
    />
  );
}
