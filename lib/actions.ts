"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function sendMessage(content: string, creatorId: string, channelId: string) {
  try {
    await sql`INSERT INTO messages (creator_id, Content, channel_id) VALUES (${creatorId},${content},${channelId});`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/channels/${channelId}`, "page");
}
export async function getMessages(channelId: string) {
  try {
    const result =
      await sql`SELECT messages.id,creator_id,content,created_at,channel_id,users.username as creatorname FROM messages JOIN users on messages.creator_id = users.id where channel_id=${channelId} Order By created_at;`;
    return result.rows as Array<Message & { creatorname: string }>;
  } catch (error) {
    console.log(error);
    return [];
  }
}
