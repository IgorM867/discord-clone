import { Modal } from "@/components/Modal";
import { InviteFriendForm } from "./InviteFriendForm";
import { getFriends } from "@/lib/actions/userActions";
import { getInviteCode } from "@/lib/actions/serverActions";

type InviteFriendsModalProps = {
  server: Server;
};

async function InviteFriendsModal({ server }: InviteFriendsModalProps) {
  const friends = await getFriends();
  const inviteCode = await getInviteCode(server.id);

  return (
    <Modal searchParam="inviteUsersDialog">
      <InviteFriendForm server={server} friends={friends} inviteCode={inviteCode} />
    </Modal>
  );
}

export { InviteFriendsModal };
