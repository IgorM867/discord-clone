import { ChannelSidebarHeader } from "./components/ChannelSidebarHeader";
import { InviteFriendsModal } from "./components/InviteFriendsModal";
import { ChannelSidebar } from "./components/ChannelSidebar";
import { NoChannelsPage } from "./components/NoChannelsPage";
import { NewChannelForm } from "./components/NewChannelForm";
import { NoServerPage } from "./components/NoServerPage";
import { ChannelsList } from "./components/ChannelsList";
import { Channel } from "./components/Channel";
import { getServer, isServerAdmin } from "@/lib/actions/serverActions";
import { getCurrentUser } from "@/lib/actions/userActions";
import { getChannels } from "@/lib/actions/channelActions";
import { redirect } from "next/navigation";

type ServerPageProps = {
  params: {
    serverId: string;
  };
};

async function ServerPage({ params }: ServerPageProps) {
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
        <ChannelsList
          channels={channels}
          activeChannel={channels.length > 0 ? channels[0].id : ""}
        />
        <NewChannelForm serverId={server.id} />
        <InviteFriendsModal server={server} />
      </ChannelSidebar>
      {channels.length == 0 ? (
        <NoChannelsPage />
      ) : (
        <>
          <Channel channelId={channels[0].id} />
        </>
      )}
    </>
  );
}
export default ServerPage;
