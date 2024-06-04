"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./userActions";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { sendMessage } from "../actions";
import { createDirectChat, getDirectChat } from "./channelActions";

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
          INSERT INTO servers (name) VALUES (${servername}) RETURNING id
      ), server_user AS (
          INSERT INTO server_users (user_id, server_id, role)
          VALUES (${user.id}, (SELECT id FROM server), 'OWNER')
      )
      INSERT INTO channels (name,server_id) VALUES('general',(SELECT id FROM server)) RETURNING (SELECT id FROM server), id as channel_id;`;
  } catch (error) {
    console.log(error);
    return { error: "Database error" };
  }
  revalidatePath("/channels/[serverId]", "page");
  redirect(`/channels/${result.rows[0].id}/${result.rows[0].channel_id}`);
}

export async function getServers(userId: string) {
  try {
    const results =
      await sql`SELECT DISTINCT ON (servers.id) servers.id AS id, servers.name FROM servers
        JOIN server_users on server_users.server_id = servers.id
        WHERE server_users.user_id = ${userId};`;
    return results.rows as Server[];
  } catch (error) {
    console.log("Error during getting servers", error);
    return [];
  }
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
  revalidatePath("/channels/[serverId]", "page");
  redirect(`/channels/me`);
}
export async function getInviteCode(serverId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    const result =
      await sql`SELECT * FROM server_invitations WHERE inviter_id = ${session.user.id} AND server_id = ${serverId};`;
    if (result.rows.length > 0) {
      return result.rows[0].invite_code;
    } else {
      const result =
        await sql`INSERT INTO server_invitations (inviter_id,server_id) VALUES (${session.user.id},${serverId}) returning *;`;

      return result.rows[0].invite_code;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function sendInviteLink(userId: string, inviteLink: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    let direct_chat = await getDirectChat(session.user.id, userId);

    if (direct_chat === null) {
      await createDirectChat(userId, false);
      direct_chat = await getDirectChat(session.user.id, userId);
      if (direct_chat === null) return;
    }

    await sendMessage(inviteLink, direct_chat.id, "direct_chat");
  } catch (error) {
    console.log("Failed to send invite link", error);
  }
}
export async function getInvite(inviteCode: string) {
  try {
    const result = await sql`SELECT * FROM server_invitations where invite_code=${inviteCode};`;
    if (result.rows.length > 0) {
      return result.rows[0] as ServerInvitation;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function acceptInvite(inviteCode: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  let invition = null;
  try {
    invition = await getInvite(inviteCode);
    if (!invition) return;

    await sql`INSERT INTO server_users (user_id,server_id,role) VALUES (${session.user.id},${invition.server_id},'MEMBER');`;
  } catch (error) {
    console.log(error);
    return;
  }
  revalidatePath("/channels/[serverId]", "page");
  redirect(`/channels/${invition.server_id}`);
}
export async function leaveServer(serverId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    await sql`DELETE FROM server_users WHERE user_id = ${session.user.id} AND server_id = ${serverId}`;
  } catch (error) {
    console.log(error);
    return;
  }
  revalidatePath("/channels/me", "page");
  redirect(`/channels/me`);
}
