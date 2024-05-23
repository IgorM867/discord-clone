import { getDirectChatUser } from "@/lib/actions/channelActions";
import { UserAvatar } from "../components/UserAvatar";
import { Chat } from "@/components/Chat";

type DirectMessagesProps = {
  params: {
    direct_chat_id: string;
  };
};

async function DirectMessages({ params }: DirectMessagesProps) {
  const { direct_chat_id: chatId } = params;
  const user = await getDirectChatUser(chatId);
  if (!user) {
    return;
  }

  return (
    <div className="w-full max-h-screen h-screen ">
      <header className="bg-d-gray-400 shadow-md text-d-gray-100 font-medium p-3 pl-4 flex gap-2">
        <UserAvatar isOnline={user.status === "Online"} size={"small"} />
        {user.username}
      </header>
      <Chat chatInfo={{ directChatId: chatId, username: user.username, type: "direct_chat" }} />
    </div>
  );
}

export default DirectMessages;
