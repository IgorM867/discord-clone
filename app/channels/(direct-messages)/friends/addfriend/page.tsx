import { FriendsHeader } from "../components/FriendsHeader";
import { AddFriendForm } from "./components/AddFriendForm";
import { WumpusNoFriends } from "../components/WumpusNoFriends";

function AddFriendsPage() {
  return (
    <div className="w-full max-h-screen h-screen flex flex-col">
      <FriendsHeader friendsViewState="addfriends" />
      <div className="flex-grow flex flex-col">
        <AddFriendForm />
        <div className="flex-grow grid place-items-center">
          <WumpusNoFriends />
        </div>
      </div>
    </div>
  );
}

export default AddFriendsPage;
