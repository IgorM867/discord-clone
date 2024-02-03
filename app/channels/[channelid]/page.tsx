import { SideBar } from "@/app/channels/[channelid]/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { SignOutButton } from "@/components/signOutButton";
import { getChannels, getCurrentUser, getServerByChannel, isServerAdmin } from "@/lib/actions";
import Image from "next/image";
import { redirect } from "next/navigation";

type ChannelPageProps = {
  params: {
    channelid: string;
  };
};

export default async function ChannelPage({ params: { channelid } }: ChannelPageProps) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  const server = await getServerByChannel(channelid);
  if (!server)
    return (
      <main className="flex flex-col items-center justify-center gap-8 h-screen ">
        <Image src="/logos/full_logo_white.svg" alt="Discord Logo" width={400} height={75} />
        <p className="text-2xl text-d-white">Something went wrong! Please refresh.</p>
      </main>
    );

  const isAdmin = await isServerAdmin(session.user.id, server.id);
  const channels = await getChannels(server.id);

  return (
    <main className="bg-d-gray-300 h-screen flex">
      <Navbar serverId={server.id} user={session.user} />
      <SideBar
        serverName={server.name}
        userId={session.user.id}
        serverId={server.id}
        isAdmin={isAdmin}
        channels={channels}
      />
      <div>
        Server Page <br></br>
        <SignOutButton />
      </div>
    </main>
  );
}
