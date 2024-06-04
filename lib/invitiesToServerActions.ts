import { sql } from "@vercel/postgres";
import { getCurrentUser } from "./userActions";
import { sendMessage } from "./messagesActions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createDirectChat, getDirectChat } from "./directChatsActions";

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
