import { isServerAdmin } from "@/lib/actions";
import SidebarHeader from "./SidebarHeader";

export default async function SideBar({
  serverName,
  userId,
  serverId,
}: {
  serverName: string;
  userId: string;
  serverId: string;
}) {
  const isAdmin = await isServerAdmin(userId, serverId);

  return (
    <div className="bg-d-gray-400 w-56">
      <SidebarHeader serverName={serverName} isAdmin={isAdmin} serverId={serverId} />
    </div>
  );
}
