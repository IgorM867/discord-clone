import { sendInviteLink } from "@/lib/invitiesToServerActions";
import { FriendsListToInviteItem } from "./FriendsListToInviteItem";

type FriendsListToInviteProps = { friends: User[]; inviteLink: string };

function FriendsListToInvite({ friends, inviteLink }: FriendsListToInviteProps) {
  return (
    <ul className="h-60 px-4 py-1 overflow-y-scroll scrollbar">
      {friends.map((friend) => (
        <FriendsListToInviteItem
          key={friend.id}
          friend={friend}
          sendInviteLink={async (userId) => await sendInviteLink(userId, inviteLink)}
        />
      ))}
    </ul>
  );
}

export { FriendsListToInvite };
