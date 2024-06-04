import { sql } from "@vercel/postgres";
import { getCurrentUser } from "./userActions";
import { redirect } from "next/navigation";

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
