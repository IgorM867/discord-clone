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
    result =
      await sql`WITH server AS (INSERT INTO servers (name) VALUES (${servername}) returning id) 
    INSERT INTO server_users (userId,serverId,role) VALUES (${user.id},(SELECT id FROM server),'OWNER') returning (SELECT id FROM server);`;
  } catch (error) {
    console.log(error);
    return { error: "Database error" };
  }
  revalidatePath("/servers/[serverid]", "page");
  redirect(`/servers/${result.rows[0].id}`);
}
export async function getServers(userId: string) {
  const results =
    await sql`SELECT serverId as id,name FROM servers JOIN server_users on server_users.serverId = servers.id WHERE server_users.userId=${userId};`;

  return results.rows as Server[];
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
  revalidatePath("/servers/[serverid]", "page");
  redirect(`/servers/direct-messages`);
}
