import { getDirectChatUser } from "@/lib/directChatsActions";
import { UserAvatar } from "../components/UserAvatar";
import { Chat } from "@/components/Chat";
import { getCurrentUser } from "@/lib/userActions";
import { redirect } from "next/navigation";
import { DirectChatsSidebar } from "../components/DirectChatsSidebar";

type DirectMessagesProps = {
  params: {
    direct_chat_id: string;
  };
};

async function DirectMessages({ params }: DirectMessagesProps) {
  const { direct_chat_id: chatId } = params;

  const session = await getCurrentUser();
  if (!session) redirect("/api/auth/signin?callbackUrl=/");

  const user = await getDirectChatUser(chatId);
  if (!user) return;

  return (
    <>
      <DirectChatsSidebar activeChatId={params.direct_chat_id} userId={session.user.id} />
      <div className="w-full max-h-screen h-screen ">
        <header className="bg-d-gray-400 shadow-md text-d-gray-100 font-medium p-3 pl-4 flex gap-2">
          <UserAvatar isOnline={user.status === "Online"} size={"small"} />
          {user.username}
        </header>
        <Chat chatInfo={{ directChatId: chatId, username: user.username, type: "direct_chat" }} />
      </div>
    </>
  );
}

export default DirectMessages;
