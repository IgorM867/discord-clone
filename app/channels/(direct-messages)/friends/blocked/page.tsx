import { BlockedFriendsList } from "./components/BlockedFriendsList";
import { FriendsHeader } from "../components/FriendsHeader";
import { getBlockUsers } from "@/lib/actions/userActions";

async function BlockedFriendsPage() {
  const users = await getBlockUsers();

  return (
    <div className="w-full max-h-screen h-screen flex flex-col">
      <FriendsHeader friendsViewState="blocked" />
      <BlockedFriendsList users={users} />
    </div>
  );
}

export default BlockedFriendsPage;
