import { WumpusNoFriends } from "./WumpusNoFriends";
import { WumpusNoBlockedFriends } from "./WumpusNoBlockedFriends";
import { WumpusNoOnlineFriends } from "./WumpusNoOnlineFriends";
import { WumpusNoPendingFriends } from "./WumpusNoPendingFriends";
import { FriendsViewState } from "./FriendsDashboard";
import { PendingFriendsListItem } from "./PendingFriendsListItem";
import { AllFriendsListItem } from "./AllFriendsListItem";
import { AddFriendButton } from "./AddFriendButton";
import { BlockedFriendsListItem } from "./BlockedFriendsListItem";

function FriendsList({
  users,
  friendsViewState,
  changeViewState,
}: {
  users: Array<User>;
  friendsViewState: FriendsViewState;
  changeViewState: (state: FriendsViewState) => void;
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
            <AddFriendButton
              isActive={false}
              variant={"purple"}
              onClick={() => changeViewState("addfriends")}
            />
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
