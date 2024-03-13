"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServer } from "./serverActions";

export async function createChannel(
  prevState: {
    error: string;
  },
  formData: FormData
) {
  const channelName = formData.get("channelname");
  if (!channelName || typeof channelName != "string")
    return { error: "Server name can't be empty" };
  const serverId = formData.get("serverid") as string;

  let result = null;
  try {
    result =
      await sql`INSERT INTO channels (id,name,server_id) VALUES (nextval('channels_sequence'),${channelName},${serverId}) returning id`;
  } catch (error) {
    console.log(error);
    return { error: "Database error" };
  }
  revalidatePath("/channels/[channelid]", "page");
  redirect(`/channels/${result.rows[0].id}`);
}

export async function getChannels(serverId: string) {
  try {
    const result = await sql`SELECT * FROM channels where server_id=${serverId};`;
    return result.rows.map((channel) => {
      return { id: channel.id, name: channel.name };
    }) as Channel[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getChannel(channelId: string) {
  try {
    const result = await sql`SELECT * FROM channels where id=${channelId};`;
    return result.rows.map((channel) => {
      return { id: channel.id, name: channel.name };
    })[0] as Channel;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteChannel(
  channelId: string,
  isActive: boolean,
  firstChannelId: string | null
) {
  let serverId;
  try {
    const result = await sql`DELETE FROM channels where id=${channelId} returning server_id;`;
    serverId = result.rows[0].serverid;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/channels/[channelid]", "page");
  if (isActive)
    if (firstChannelId) {
      redirect(`/channels/${firstChannelId}`);
    } else {
      const server = await getServer(serverId);
      redirect(`/channels/${server?.null_channel_id}`);
    }
}
