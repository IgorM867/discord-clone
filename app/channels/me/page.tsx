import { getAllRelationships } from "@/lib/actions/userActions";
import { FriendsDashboard } from "./components/FriendsDashboard";

async function FriendsPage() {
  const userRelationships = await getAllRelationships();
  if (!userRelationships) {
    return;
  }

  return <FriendsDashboard userRelationships={userRelationships} />;
}

export default FriendsPage;
