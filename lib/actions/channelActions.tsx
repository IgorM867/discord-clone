"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServer } from "./serverActions";
import { getCurrentUser } from "./userActions";

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
export async function createDirectChat(userId: string, withRedirect: boolean = true) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  let result = null;
  try {
    result =
      await sql`SELECT * FROM direct_chats WHERE (user_id1 = ${userId} AND user_id2 = ${session.user.id}) OR (user_id1 = ${session.user.id} AND user_id2 = ${userId})`;
    if (result.rows.length == 0) {
      result =
        await sql`INSERT INTO direct_chats (user_id1,user_id2) VALUES (${session.user.id},${userId}) returning id;`;
    }
  } catch (error) {
    console.log(error);
    return;
  }
  if (withRedirect) {
    redirect(`/channels/me/${result.rows[0].id}`);
  }
}
export async function getDirectChat(userId1: string, userId2: string) {
  try {
    const { rows } =
      await sql`SELECT * FROM direct_chats WHERE (user_id1 = ${userId1} AND user_id2 = ${userId2}) OR (user_id1 = ${userId2} AND user_id2 = ${userId1});`;
    if (rows.length > 0) {
      return rows[0] as DirectChat;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getDirectChatUser(chatId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    const { rows } = await sql`SELECT users.id, username, email, image,
    CASE WHEN last_activity + interval '5 minute' >= now() THEN 'Online' ELSE 'Offline' END as status
    FROM users 
    JOIN direct_chats on users.id = user_id2 WHERE direct_chats.id = ${chatId} AND user_id1 = ${session.user.id}
    UNION
    SELECT users.id, username, email, image, 
    CASE WHEN last_activity + interval '5 minute' >= now() THEN 'Online' ELSE 'Offline' END as status
    FROM users 
    JOIN direct_chats on users.id = user_id1 WHERE direct_chats.id = ${chatId} AND user_id2 = ${session.user.id};`;

    return rows[0] as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getDirectChats(userId: string) {
  try {
    const { rows } = await sql`SELECT users.id, username, email, image,
    CASE WHEN last_activity + interval '5 minute' >= now() THEN 'Online' ELSE 'Offline' END as status,
    direct_chats.id as direct_chats_id
    FROM users 
    JOIN direct_chats on users.id = user_id2 WHERE user_id1 = ${userId}
    UNION
    SELECT users.id, username, email, image, 
    CASE WHEN last_activity + interval '5 minute' >= now() THEN 'Online' ELSE 'Offline' END as status,
    direct_chats.id as direct_chats_id
    FROM users 
    JOIN direct_chats on users.id = user_id1 WHERE user_id2 = ${userId};`;

    return rows.map((row) => {
      return {
        user: {
          id: row.id,
          username: row.username,
          email: row.email,
          image: row.image,
          status: row.status,
        },
        chatId: row.direct_chats_id,
      };
    }) as Array<{ user: User; chatId: string }>;
  } catch (error) {
    console.log(error);
    return [];
  }
}
