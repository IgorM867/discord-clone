import { MessageForm } from "./MessageForm";
import { MessagesList } from "./MessagesList";
import { ChatLoadingSkeleton } from "./ChatLoadingSkeleton";
import { sendMessage } from "@/lib/messagesActions";
import { Suspense } from "react";

type ChatProps = {
  chatInfo:
    | { channel: Channel; type: "server_chat" }
    | { directChatId: string; user: User; type: "direct_chat" };
};

async function Chat({ chatInfo }: ChatProps) {
  const chatId = chatInfo.type === "server_chat" ? chatInfo.channel.id : chatInfo.directChatId;
  const chatName = chatInfo.type === "server_chat" ? chatInfo.channel.name : chatInfo.user.username;
  const placeholder = chatInfo.type === "server_chat" ? `#${chatName}` : `@${chatName}`;

  async function handleFormSubmit(formData: FormData) {
    "use server";
    const message = formData.get("message") as string;
    await sendMessage(message, chatId, chatInfo.type);
  }

  return (
    <div className="h-[calc(100%_-_48px)]">
      <Suspense fallback={<ChatLoadingSkeleton />}>
        <MessagesList
          chatType={chatInfo.type}
          chatId={chatId}
          chatName={chatName}
          userImage={chatInfo.type === "direct_chat" ? chatInfo.user.image : ""}
        />
      </Suspense>
      <MessageForm placeholder={placeholder} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export { Chat };
