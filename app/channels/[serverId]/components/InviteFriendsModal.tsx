import { Modal } from "@/components/Modal";
import { InviteFriendForm } from "./InviteFriendForm";
import { getUserFriends } from "@/lib/usersRelationshipsActions";
import { getInviteCode } from "@/lib/invitiesToServerActions";
import { getCurrentUser } from "@/lib/userActions";
import { redirect } from "next/navigation";

type InviteFriendsModalProps = {
  server: Server;
};

async function InviteFriendsModal({ server }: InviteFriendsModalProps) {
  const session = await getCurrentUser();
  if (!session?.user) if (!session) return redirect("/auth/signin");

  const friends = await getUserFriends(session.user.id);
  const inviteCode = await getInviteCode(server.id);

  return (
    <Modal searchParam="inviteUsersDialog">
      <InviteFriendForm server={server} friends={friends} inviteCode={inviteCode} />
    </Modal>
  );
}

export { InviteFriendsModal };
