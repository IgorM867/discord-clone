import { getAllFriends } from "@/lib/actions/userActions";
import { FriendsHeader } from "../components/FriendsHeader";
import { AllFriendsList } from "./components/AllFriendsList";

async function AllFriendsPage() {
  const users = await getAllFriends();

  return (
    <div className="w-full max-h-screen h-screen flex flex-col">
      <FriendsHeader friendsViewState="all" />
      <AllFriendsList users={users} />
    </div>
  );
}

export default AllFriendsPage;
