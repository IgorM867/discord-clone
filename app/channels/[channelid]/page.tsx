import { Navbar } from "@/components/Navbar";
import { Error } from "@/components/Error";
import { NoChannelsPage } from "./components/NoChannelsPage";
import { Channel } from "./components/Channel";
import { getServerByChannel, isServerAdmin } from "@/lib/actions/serverActions";
import { getCurrentUser } from "@/lib/actions/userActions";
import { getChannels } from "@/lib/actions/channelActions";
import { redirect } from "next/navigation";
import { ChannelSidebar } from "./components/ChannelSidebar";

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
    <main className="bg-d-gray-400 h-screen flex">
      <Navbar serverId={server.id} user={session.user} />
      <ChannelSidebar
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
