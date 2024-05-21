import { getPendingFriendRequests } from "@/lib/actions/userActions";
import { FriendsHeader } from "../components/FriendsHeader";
import { PendingFriendsList } from "./components/PendingFriendsList";

async function PendingFriendsPage() {
  const users = await getPendingFriendRequests();
  return (
    <div className="w-full max-h-screen h-screen flex flex-col">
      <FriendsHeader friendsViewState="pending" />
      <PendingFriendsList users={users} />
    </div>
  );
}

export default PendingFriendsPage;
