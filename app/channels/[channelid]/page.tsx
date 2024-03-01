import { SideBar } from "@/app/channels/[channelid]/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { getChannels, getCurrentUser, getServerByChannel, isServerAdmin } from "@/lib/actions";
import { redirect } from "next/navigation";
import { NoChannelsPage } from "./components/NoChannelsPage";
import { Channel } from "./components/Channel";
import { Error } from "@/components/Error";

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

  if (!server) return <Error />;

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
        channelId={channelid}
      />

      {channels.length == 0 ? (
        <NoChannelsPage />
      ) : (
        <>
          <Channel channelId={channelid} />
        </>
      )}
    </main>
  );
}
