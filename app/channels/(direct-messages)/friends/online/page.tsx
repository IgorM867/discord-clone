import { FriendsHeader } from "../components/FriendsHeader";
import { OnlineFriendsList } from "./components/OnlineFriendsList";

function OnlineFriendsPage() {
  return (
    <div className="w-full max-h-screen h-screen flex flex-col">
      <FriendsHeader friendsViewState="online" />
      <OnlineFriendsList />
    </div>
  );
}

export default OnlineFriendsPage;
