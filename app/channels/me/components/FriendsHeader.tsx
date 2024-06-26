import { SvgWavingFriendIcon } from "@/components/svgIcons/SvgWavingFriendIcon";
import { FriendsHeaderButton } from "./FriendsHeaderButton";
import { AddFriendButton } from "./AddFriendButton";
import { FriendsViewState } from "./FriendsDashboard";

type FriendsHeaderProps = {
  friendsViewState: FriendsViewState;
  changeViewState: (state: FriendsViewState) => void;
};
function FriendsHeader({ friendsViewState, changeViewState }: FriendsHeaderProps) {
  return (
    <header className="bg-d-gray-400 shadow-md text-d-gray-100 font-medium p-3 pl-4 h-12 flex items-center">
      <SvgWavingFriendIcon width={24} height={24} className="fill-d-gray-150 inline align-middle" />
      <span className="border-r border-d-gray-150 px-2 pr-4">Friends</span>
      <FriendsHeaderButton
        value="Online"
        isActive={friendsViewState == "online"}
        onClick={() => changeViewState("online")}
      />
      <FriendsHeaderButton
        value="All"
        isActive={friendsViewState == "all"}
        onClick={() => changeViewState("all")}
      />
      <FriendsHeaderButton
        value="Pending"
        isActive={friendsViewState == "pending"}
        onClick={() => changeViewState("pending")}
      />
      <FriendsHeaderButton
        value="Blocked"
        isActive={friendsViewState == "blocked"}
        onClick={() => changeViewState("blocked")}
      />
      <AddFriendButton
        isActive={friendsViewState == "addfriends"}
        onClick={() => changeViewState("addfriends")}
      />
    </header>
  );
}

export { FriendsHeader };
