'use server'
import { sql } from "@vercel/postgres";
import { getCurrentUser, getUserByUsername } from "./userActions";
import { revalidatePath } from "next/cache";

type RequestState = {
  success: boolean;
  message: string;
};

export async function sendFriendRequest(prevState: RequestState | null, formData: FormData) {
  const username = formData.get("username");
  if (!username) return { success: false, message: "Username can't be empty" };

  const user = await getUserByUsername(username as string);
  if (!user)
    return {
      success: false,
      message: "Hm, that didn't work. Double-check that the username is correct.",
    };

  const session = await getCurrentUser();
  if (!session?.user) return { success: false, message: "Please Sign In" };

  try {
    await sql`INSERT INTO user_relationships (user_id1,user_id2,status) VALUES (${session.user.id},${user.id},'pending');`;

    revalidatePath("/channels/me", "page");
    return { success: true, message: `Sucess! Your friend request to ${username} was sent.` };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function acceptFriendRequest(userId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    await sql`UPDATE user_relationships SET status = 'friend' WHERE user_id1=${userId} AND user_id2=${session.user.id};`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/channels/me", "page");
}

export async function deleteFriend(userId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    await sql`DELETE FROM user_relationships WHERE ((user_id1=${session.user.id} AND user_id2=${userId}) OR (user_id2=${session.user.id} AND user_id1=${userId})) AND status = 'friend';`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/channels/me", "page");
}

export async function deletePendingFriend(userId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    await sql`DELETE FROM user_relationships WHERE user_id1=${session.user.id} AND user_id2=${userId} AND status = 'pending';`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/channels/me", "page");
}

export async function blockUser(userId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;
  try {
    const { rows } =
      await sql`SELECT *  FROM user_relationships WHERE ((user_id1=${session.user.id} AND user_id2=${userId}) OR (user_id2=${session.user.id} AND user_id1=${userId}));`;
    if (rows.length < 0) {
      await sql`INSERT INTO user_relationships (user_id1,user_id2,status) VALUES (${session.user.id},${userId},'blocked');`;
      return;
    }
    if (rows[0].user_id1 === session.user.id) {
      await sql`UPDATE user_relationships SET status = 'blocked' WHERE user_id1=${session.user.id} AND user_id2=${userId};`;
      return;
    }
    await sql`WITH del as (DELETE FROM user_relationships WHERE user_id1=${userId} AND user_id2=${session.user.id})
        INSERT INTO user_relationships (user_id1,user_id2,status) VALUES (${session.user.id},${userId},'blocked');`;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/channels/me", "page");
}

export async function getAllRelationships() {
  const session = await getCurrentUser();
  if (!session?.user) return [];

  try {
    const { rows } =
      await sql`SELECT users.id ,username ,email ,image ,status, 'Outgoing' as request_direction, 
      CASE WHEN last_activity + interval '5 minute' >= now() THEN 'Online' ELSE 'Offline' END as user_status
      FROM users 
      JOIN user_relationships on users.id = user_id2 WHERE user_id1=${session.user.id}
      UNION
      SELECT users.id ,username ,email ,image ,status ,'Incoming' as request_direction, 
      CASE WHEN last_activity + interval '5 minute' >= now() THEN 'Online' ELSE 'Offline' END as user_status
      FROM users 
      JOIN user_relationships on users.id = user_id1 WHERE user_id2=${session.user.id};`;

    return rows.map((row) => {
      return {
        user: {
          id: row.id as string,
          username: row.username as string,
          email: row.email as string,
          image: row.image as string,
          status: row.user_status as "Online" | "Offline",
        },
        status: row.status as "friend" | "pending" | "blocked",
        request_direction:
          row.status == "pending" ? (row.request_direction as "Incoming" | "Outgoing") : null,
      };
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRelationship(userId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    await sql`DELETE FROM user_relationships WHERE ((user_id1=${session.user.id} AND user_id2=${userId}) OR (user_id2=${session.user.id} AND user_id1=${userId}));`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/channels/me", "page");
}

export async function getUserFriends(userId: string) {
  try {
    const { rows } = await sql`SELECT users.id, username, email, image,
      CASE WHEN last_activity + interval '5 minute' >= now() THEN 'Online' ELSE 'Offline' END as user_status
      FROM users 
      JOIN user_relationships on users.id = user_id2 WHERE user_id1=${userId} AND status = 'friend'
      UNION
      SELECT users.id, username, email, image, 
      CASE WHEN last_activity + interval '5 minute' >= now() THEN 'Online' ELSE 'Offline' END as user_status
      FROM users 
      JOIN user_relationships on users.id = user_id1 WHERE user_id2=${userId} AND status = 'friend';`;

    return rows as User[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
