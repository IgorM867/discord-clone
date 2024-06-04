import { getCurrentUser } from "@/lib/userActions";
import { redirect } from "next/navigation";
import { NoServerPage } from "../components/NoServerPage";
import { getChannels } from "../lib/actions";
import { ChannelSidebar } from "../components/ChannelSidebar";
import { ChannelSidebarHeader } from "../components/ChannelSidebarHeader";
import { ChannelsList } from "../components/ChannelsList";
import { InviteFriendsModal } from "../components/InviteFriendsModal";
import { NewChannelForm } from "../components/NewChannelForm";
import { NoChannelsPage } from "../components/NoChannelsPage";
import { Channel } from "../components/Channel";
import { getServer, isServerAdmin } from "@/lib/serverActions";

type ChannelPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};

async function ChannelPage({ params }: ChannelPageProps) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const server = await getServer(params.serverId);
  if (!server) {
    return <NoServerPage />;
  }
  const isAdmin = await isServerAdmin(session.user.id, server.id);
  const channels = await getChannels(server.id);

  return (
    <>
      <ChannelSidebar>
        <ChannelSidebarHeader server={server} isAdmin={isAdmin} />
        <ChannelsList channels={channels} activeChannel={params.channelId} />
        <NewChannelForm serverId={server.id} />
        <InviteFriendsModal server={server} />
      </ChannelSidebar>
      {channels.length == 0 ? (
        <NoChannelsPage />
      ) : (
        <>
          <Channel channelId={params.channelId} />
        </>
      )}
    </>
  );
}

export default ChannelPage;
