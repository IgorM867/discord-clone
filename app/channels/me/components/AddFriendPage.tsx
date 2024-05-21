import { AddFriendForm } from "./AddFriendForm";
import { FriendsViewState } from "./FriendsDashboard";
import { FriendsHeader } from "./FriendsHeader";
import { WumpusNoFriends } from "./WumpusNoFriends";

type AddFriendPageProps = {
  changeViewState: (state: FriendsViewState) => void;
};

function AddFriendPage({ changeViewState }: AddFriendPageProps) {
  return (
    <div className="w-full max-h-screen h-screen flex flex-col">
      <FriendsHeader friendsViewState="addfriends" changeViewState={changeViewState} />
      <div className="flex-grow flex flex-col">
        <AddFriendForm />
        <div className="flex-grow grid place-items-center">
          <WumpusNoFriends />
        </div>
      </div>
    </div>
  );
}

export { AddFriendPage };
