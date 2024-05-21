"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./userActions";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

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
          INSERT INTO servers (name,null_channel_id) VALUES (${servername},nextval('channels_sequence')) RETURNING id
      ), server_user AS (
          INSERT INTO server_users (user_id, server_id, role)
          VALUES (${user.id}, (SELECT id FROM server), 'OWNER')
      )
      INSERT INTO channels (id,name,server_id) VALUES(nextval('channels_sequence'),'general',(SELECT id FROM server)) RETURNING id;`;
  } catch (error) {
    console.log(error);
    return { error: "Database error" };
  }
  revalidatePath("/channels/[channelid]", "page");
  redirect(`/channels/${result.rows[0].id}`);
}

export async function getServers(userId: string) {
  const results =
    await sql`SELECT DISTINCT ON (servers.id) servers.id AS id, servers.name, channels.id AS channel_id, servers.null_channel_id FROM servers
      JOIN server_users on server_users.server_id = servers.id
      LEFT JOIN channels on channels.server_id = servers.id
      WHERE server_users.user_id = ${userId};`;

  return results.rows as Array<Server & { channel_id: string }>;
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
      await sql`SELECT servers.id, servers.name, servers.null_channel_id FROM servers LEFT JOIN channels on servers.id = channels.server_id 
        WHERE channels.id=${channelId} OR servers.null_channel_id=${channelId};`;
    return result.rows[0] as Server;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isServerAdmin(userId: string, serverId: string) {
  try {
    const result =
      await sql`SELECT * FROM server_users where user_id=${userId} AND server_id=${serverId} AND role='OWNER';`;

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
  redirect(`/channels/me`);
}
