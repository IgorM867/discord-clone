"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  return await getServerSession(authOptions);
}

export async function getUserByEmail(email: string) {
  try {
    const { rows } = await sql`SELECT * FROM users WHERE email=${email};`;
    return rows[0] as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createUser({
  username,
  email,
  image,
  password,
}: {
  username: string;
  email: string;
  image: string | null;
  password: string | null;
}) {
  try {
    const result =
      await sql`INSERT INTO users (username,email,image,password) VALUES (${username},${email},${image},${password}) RETURNING *;`;

    return result.rows[0] as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createServer(
  prevState: {
    error: string;
  },
  formData: FormData
) {
  const servername = formData.get("servername");
  if (!servername || typeof servername != "string") return { error: "Server name can't be empty" };

  const session = await getCurrentUser();
  if (!session?.user) return { error: "Please Sign In" };
  const { user } = session;

  let result = null;
  try {
    result = await sql`WITH server AS (
        INSERT INTO servers (name,nullChannelId) VALUES (${servername},nextval('channels_sequence')) RETURNING id
    ), server_user AS (
        INSERT INTO server_users (userId, serverId, role)
        VALUES (${user.id}, (SELECT id FROM server), 'OWNER')
    )
    INSERT INTO channels (id,name,serverId) VALUES(nextval('channels_sequence'),'general',(SELECT id FROM server)) RETURNING id;`;
  } catch (error) {
    console.log(error);
    return { error: "Database error" };
  }
  revalidatePath("/channels/[channelid]", "page");
  redirect(`/channels/${result.rows[0].id}`);
}
export async function getServers(userId: string) {
  const results =
    await sql`SELECT DISTINCT ON (servers.id) servers.id AS id, servers.name, channels.id AS channelId, servers.nullChannelId FROM servers
    JOIN server_users on server_users.serverId = servers.id
    LEFT JOIN channels on channels.serverId = servers.id
    WHERE server_users.userId = ${userId};`;

  return results.rows as Array<Server & { channelid: string }>;
}
export async function getServer(serverId: string) {
  try {
    const result = await sql`SELECT * FROM servers where id=${serverId};`;
    return result.rows[0] as Server;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getServerByChannel(channelId: string) {
  try {
    const result =
      await sql`SELECT servers.id, servers.name, servers.nullChannelId FROM servers LEFT JOIN channels on servers.id = channels.serverId 
      WHERE channels.id=${channelId} OR servers.nullChannelId=${channelId};`;
    return result.rows[0] as Server;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function isServerAdmin(userId: string, serverId: string) {
  try {
    const result =
      await sql`SELECT * FROM server_users where userId=${userId} AND serverId=${serverId} AND role='OWNER';`;

    if (result.rows.length == 0) return false;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function deleteServer(serverId: string) {
  try {
    await sql`DELETE FROM servers where id=${serverId};`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/channels/[channelid]", "page");
  redirect(`/channels/direct-messages`);
}

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
      await sql`INSERT INTO channels (id,name,serverid) VALUES (nextval('channels_sequence'),${channelName},${serverId}) returning id`;
  } catch (error) {
    console.log(error);
    return { error: "Database error" };
  }
  revalidatePath("/channels/[channelid]", "page");
  redirect(`/channels/${result.rows[0].id}`);
}
export async function getChannels(serverId: string) {
  try {
    const result = await sql`SELECT * FROM channels where serverId=${serverId};`;
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
    const result = await sql`DELETE FROM channels where id=${channelId} returning serverId;`;
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
      redirect(`/channels/${server?.nullchannelid}`);
    }
}
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
