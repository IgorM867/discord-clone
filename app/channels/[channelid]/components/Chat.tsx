import { MessageForm } from "./MessageForm";
import { getCurrentUser, sendMessage } from "@/lib/actions";
import { redirect } from "next/navigation";
import { MessagesList } from "./MessagesList";
import { ChatLoadingSkeleton } from "./ChatLoadingSkeleton";
import { Suspense } from "react";

async function Chat({ channel }: { channel: Channel }) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  async function handleFormSubmit(formData: FormData) {
    "use server";
    const message = formData.get("message") as string;
    if (!session) return;
    await sendMessage(message, session.user.id, channel.id);
  }

  return (
    <div className="h-[calc(100%_-_48px)]">
      <Suspense fallback={<ChatLoadingSkeleton />}>
        <MessagesList channel={channel} />
      </Suspense>
      <MessageForm channelName={channel.name} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export { Chat };
