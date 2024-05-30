import { Navbar } from "@/components/Navbar";
import { Error } from "@/components/Error";
import { Channel } from "./components/Channel";
import { ChannelsList } from "./components/ChannelsList";
import { ChannelSidebar } from "./components/ChannelSidebar";
import { NewChannelForm } from "./components/NewChannelForm";
import { NoChannelsPage } from "./components/NoChannelsPage";
import { InviteFriendsModal } from "./components/InviteFriendsModal";
import { ChannelSidebarHeader } from "./components/ChannelSidebarHeader";
import { getChannels } from "@/lib/actions/channelActions";
import { getCurrentUser } from "@/lib/actions/userActions";
import { getServerByChannel, isServerAdmin } from "@/lib/actions/serverActions";
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

  if (!server) return <Error />;

  const isAdmin = await isServerAdmin(session.user.id, server.id);
  const channels = await getChannels(server.id);

  return (
    <main className="bg-d-gray-400 h-screen flex">
      <Navbar serverId={server.id} user={session.user} />
      <ChannelSidebar>
        <ChannelSidebarHeader server={server} isAdmin={isAdmin} />
        <ChannelsList channels={channels} activeChannel={channelid} />
        <NewChannelForm serverId={server.id} />
        <InviteFriendsModal server={server} />
      </ChannelSidebar>

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
