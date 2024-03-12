"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function sendMessage(content: string, creatorId: string, channelId: string) {
  try {
    await sql`INSERT INTO messages (CreatorId, Content, ChannelId) VALUES (${creatorId},${content},${channelId});`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/channels/${channelId}`, "page");
}
export async function getMessages(channelId: string) {
  try {
    const result =
      await sql`SELECT messages.id,creatorid,content,createdat,channelid,users.username as creatorname FROM messages JOIN users on messages.creatorid = users.id where channelId=${channelId} Order By createdat;`;
    return result.rows as Array<Message & { creatorname: string }>;
  } catch (error) {
    console.log(error);
    return [];
  }
}
