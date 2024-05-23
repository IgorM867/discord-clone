import { getDirectChats } from "@/lib/actions/channelActions";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";

async function DirectsChatsList({
  userId,
  activeChatId,
}: {
  userId: string;
  activeChatId?: string;
}) {
  const directChats = await getDirectChats(userId);

  return (
    <>
      {directChats.map((chat) => (
        <Link
          key={chat.chatId}
          className={`${
            chat.chatId === activeChatId ? "bg-d-gray-200 text-d-white" : "text-d-gray-125"
          } group px-3 py-2 hover:bg-d-gray-250 rounded-md cursor-pointer flex items-center gap-2`}
          href={`/channels/me/${chat.chatId}`}
        >
          <UserAvatar size="big" isOnline={chat.user.status === "Online"} />
          <span className="group-hover:text-d-gray-100">{chat.user.username}</span>
        </Link>
      ))}
    </>
  );
}

export { DirectsChatsList };
