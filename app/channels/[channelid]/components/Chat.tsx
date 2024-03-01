import { MessageForm } from "./MessageForm";
import { getCurrentUser, getMessages, sendMessage } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ChannelWelcomeMessage } from "./ChannelWelcomeMessage";

async function Chat({ channel }: { channel: Channel }) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  const messages = await getMessages(channel.id);

  async function handleFormSubmit(formData: FormData) {
    "use server";
    const message = formData.get("message") as string;
    if (!session) return;
    await sendMessage(message, session.user.id, channel.id);
  }

  return (
    <div className="h-[calc(100%_-_48px)]">
      <ol className="overflow-y-scroll pl-5 h-[calc(100%_-_64px)] flex flex-col scrollbar">
        <ChannelWelcomeMessage channelName={channel.name} />
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ol>
      <MessageForm channelName={channel.name} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export { Chat };
