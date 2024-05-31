import { getInvite, getServer } from "@/lib/actions/serverActions";
import { getUserById } from "@/lib/actions/userActions";
import { InvalidInvitePage } from "./components/InvalidInvitePage";
import { ValidInvitePage } from "./components/ValidInvitePage";

type InvitePageProps = {
  params: {
    inviteCode: string;
  };
};

async function InvitePage({ params }: InvitePageProps) {
  const invition = await getInvite(params.inviteCode);
  if (!invition) {
    return <InvalidInvitePage />;
  }
  const inviter = await getUserById(invition.inviter_id);
  if (!inviter) return <InvalidInvitePage />;

  const server = await getServer(invition.server_id);
  if (!server) return <InvalidInvitePage />;

  return (
    <ValidInvitePage
      inviteCode={params.inviteCode}
      inviterUsername={inviter.username}
      serverName={server.name}
    />
  );
}

export default InvitePage;
