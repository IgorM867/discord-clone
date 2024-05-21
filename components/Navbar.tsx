import Image from "next/image";
import { NavbarButton } from "./NavbarButton";
import { NewServerButton } from "./NewServerButton";
import { getServers } from "@/lib/actions/serverActions";

async function Navbar({ serverId, user }: { serverId: string; user: User }) {
  const servers = await getServers(user.id);

  return (
    <nav className="bg-d-gray-550 p-3 flex flex-col gap-2 items-center z-10">
      <NavbarButton
        key={"ket1"}
        label="Direct Messages"
        href="/channels/me"
        isActive={serverId === "direct-messages"}
      >
        <Image src="/logos/icon_clyde_white.svg" alt="discord logo" width={30} height={30} />
      </NavbarButton>
      <div className={`bg-d-gray-300 h-[2px] rounded-s-md w-4/5`} />
      {servers.map((server) => (
        <NavbarButton
          key={server.id}
          label={server.name}
          href={`/channels/${server.channel_id || server.null_channel_id}`}
          isActive={serverId === server.id}
        >
          {server.name
            .split(" ")
            .map((word) => word[0])
            .concat()}
        </NavbarButton>
      ))}
      {servers.length != 0 && <div className={`bg-d-gray-300 h-[2px] rounded-s-md w-4/5`} />}
      <NewServerButton username={user.username} />
    </nav>
  );
}
export { Navbar };
