import { getAllRelationships } from "@/lib/usersRelationshipsActions";
import { getCurrentUser } from "@/lib/userActions";
import { FriendsDashboard } from "./components/FriendsDashboard";
import { redirect } from "next/navigation";
import { DirectChatsSidebar } from "./components/DirectChatsSidebar";

async function FriendsPage() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  const userRelationships = await getAllRelationships();
  if (!userRelationships) {
    return;
  }

  return (
    <>
      <DirectChatsSidebar activeChatId="" userId={session.user.id} />
      <FriendsDashboard userRelationships={userRelationships} />
    </>
  );
}

export default FriendsPage;
