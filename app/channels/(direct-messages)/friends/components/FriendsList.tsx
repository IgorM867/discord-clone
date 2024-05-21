import { WumpusNoFriends } from "./WumpusNoFriends";
import { WumpusNoBlockedFriends } from "./WumpusNoBlockedFriends";
import { WumpusNoOnlineFriends } from "../online/components/WumpusNoOnlineFriends";
import { FriendViewState } from "../page";
import { PendingFriendsListItem } from "./PendingFriendsListItem";
import { WumpusNoPendingFriends } from "../pending/components/WumpusNoPendingFriends";
import { AllFriendsListItem } from "./AllFriendsListItem";
import { AddFriendButton } from "./AddFriendButton";
import { BlockedFriendsListItem } from "./BlockedFriendsListItem";

function FriendsList({
  users,
  friendsViewState,
}: {
  users: Array<User>;
  friendsViewState: FriendViewState;
}) {
  if (users.length == 0) {
    switch (friendsViewState) {
      case "pending":
        return <WumpusNoPendingFriends />;
      case "blocked":
        return <WumpusNoBlockedFriends />;
      case "online":
        return <WumpusNoOnlineFriends />;
      case "all":
        return (
          <>
            <WumpusNoFriends />
            <AddFriendButton isActive={false} variant={"purple"} />
          </>
        );
    }
  }

  return (
    <ul className="w-full h-full px-4 overflow-y-scroll scrollbar">
      {users.map((user) => {
        switch (friendsViewState) {
          case "pending":
            return (
              <PendingFriendsListItem
                user={user as User & { request_direction: "Outgoing" | "Incoming" }}
                key={user.id}
              />
            );
          case "blocked":
            return <BlockedFriendsListItem user={user} key={user.id} />;
          case "online":
            return <AllFriendsListItem user={user} key={user.id} />;
          case "all":
            return <AllFriendsListItem user={user} key={user.id} />;
        }
      })}
    </ul>
  );
}

export { FriendsList };
