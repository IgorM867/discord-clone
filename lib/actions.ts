"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./actions/userActions";
import { redirect } from "next/navigation";

export async function sendMessage(
  content: string,
  chatId: string,
  chatType: "server_chat" | "direct_chat"
) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  if (chatType === "server_chat") {
    try {
      await sql`INSERT INTO messages (creator_id, Content, channel_id) VALUES (${session.user.id},${content},${chatId});`;
    } catch (error) {
      console.log(error);
    }
    revalidatePath(`/channels/${chatId}`, "page");
  } else {
    try {
      await sql`INSERT INTO direct_messages (creator_id, Content, chat_id) VALUES (${session.user.id},${content},${chatId});`;
    } catch (error) {
      console.log(error);
    }
    revalidatePath(`/channels/me/${chatId}`, "page");
  }
}
export async function getMessages(channelId: string, chatType: "server_chat" | "direct_chat") {
  if (chatType === "server_chat") {
    try {
      const result =
        await sql`SELECT messages.id,creator_id,content,created_at,channel_id,users.username as creatorname FROM messages JOIN users on messages.creator_id = users.id where channel_id=${channelId} Order By created_at;`;
      return result.rows as Array<Message & { creatorname: string }>;
    } catch (error) {
      console.log(error);
      return [];
    }
  } else {
    try {
      const result =
        await sql`SELECT direct_messages.id,creator_id,content,created_at,chat_id,users.username as creatorname 
        FROM direct_messages JOIN users on direct_messages.creator_id = users.id where chat_id=${channelId} Order By created_at;`;
      return result.rows as Array<DirectMessage & { creatorname: string }>;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
