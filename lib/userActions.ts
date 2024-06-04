import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { unstable_noStore as noStore } from "next/cache";

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

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    try {
      await sql`UPDATE users SET last_activity = now() WHERE id = ${session.user.id}`;
    } catch (error) {
      console.log("Could not update user last_activity", error);
    }
  }

  return session;
}
export async function getUserById(userId: string) {
  try {
    const { rows } = await sql`SELECT * FROM users WHERE id=${userId};`;
    if (rows.length === 0) return null;
    return rows[0] as User;
  } catch (error) {
    console.log(error);
    return null;
  }
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
