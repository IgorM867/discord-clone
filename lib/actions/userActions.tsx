"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

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
export async function getUserByUsername(username: string) {
  noStore();
  try {
    const { rows } = await sql`SELECT * FROM users WHERE username=${username};`;
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

    revalidatePath("/channels/friends/pending", "page");
    return { success: true, message: `Sucess! Your friend request to ${username} was sent.` };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function getPendingFriendRequests() {
  const session = await getCurrentUser();
  if (!session?.user) return [];

  try {
    const { rows } = await sql`
    SELECT users.id,username,email,image,'Outgoing' as request_direction FROM users 
    JOIN user_relationships on users.id = user_id2 WHERE user_id1=${session.user.id} AND status = 'pending'
    UNION
    SELECT users.id,username,email,image,'Incoming' as request_direction FROM users 
    JOIN user_relationships on users.id = user_id1 WHERE user_id2=${session.user.id} AND status = 'pending';`;

    return rows as Array<User & { request_direction: "Outgoing" | "Incoming" }>;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deletePendingFriend(userId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    await sql`DELETE FROM user_relationships WHERE user_id1=${session.user.id} AND user_id2=${userId} AND status = 'pending';`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/channels/friends/pending", "page");
}

export async function acceptFriendRequest(userId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    await sql`UPDATE user_relationships SET status = 'friend' WHERE user_id1=${userId} AND user_id2=${session.user.id};`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/channels/friends/pending", "page");
}
export async function getAllFriends() {
  const session = await getCurrentUser();
  if (!session?.user) return [];

  try {
    const { rows } = await sql`
    SELECT users.id,username,email,image FROM users 
    JOIN user_relationships on users.id = user_id2 WHERE user_id1=${session.user.id} AND status = 'friend'
    UNION
    SELECT users.id,username,email,image FROM users 
    JOIN user_relationships on users.id = user_id1 WHERE user_id2=${session.user.id} AND status = 'friend';`;

    return rows as Array<User & { request_direction: "Outgoing" | "Incoming" }>;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function deleteFriend(userId: string) {
  const session = await getCurrentUser();
  if (!session?.user) return;

  try {
    await sql`DELETE FROM user_relationships WHERE ((user_id1=${session.user.id} AND user_id2=${userId}) OR (user_id2=${session.user.id} AND user_id1=${userId})) AND status = 'friend';`;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/channels/friends/all", "page");
}
export async function blockUser(userId: string, path: string) {
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

  revalidatePath(path, "page");
}
export async function getBlockUsers() {
  const session = await getCurrentUser();
  if (!session?.user) return [];

  try {
    const { rows } = await sql`
    SELECT users.id,username,email,image FROM users 
    JOIN user_relationships on users.id = user_id2 WHERE user_id1=${session.user.id} AND status = 'blocked'`;

    return rows as Array<User>;
  } catch (error) {
    console.log(error);
    return [];
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
  revalidatePath("/channels/friends/blocked", "page");
}
