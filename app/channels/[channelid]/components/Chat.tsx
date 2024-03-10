import { MessageForm } from "./MessageForm";
import { getCurrentUser, getMessages, sendMessage } from "@/lib/actions";
import { redirect } from "next/navigation";
import { MessagesList } from "./MessagesList";

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
      <MessagesList channelName={channel.name} messages={messages} />
      <MessageForm channelName={channel.name} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export { Chat };
