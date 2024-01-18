import { sql } from "@vercel/postgres";
import { signIn } from "next-auth/react";

export const getUserByEmail = async (email: string) => {
  try {
    const { rows } = await sql`SELECT * FROM users WHERE email=${email};`;
    return rows[0] as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUser = async ({
  username,
  email,
  image,
  password,
}: {
  username: string;
  email: string;
  image: string | null;
  password: string | null;
}) => {
  try {
    const result =
      await sql`INSERT INTO users (username,email,image,password) VALUES (${username},${email},${image},${password}) RETURNING *;`;

    return result.rows[0] as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export async function authenticate(
  prevState: {
    error: string;
  },
  formData: FormData
) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatedPassword: formData.get("repeatedpassword"),
  };

  const result = await signIn("register", { ...data, callbackUrl: "/" });

  if (result?.error) {
    return {
      error: result.error,
    };
  }
  return {
    error: "",
  };
}
export async function logIn(
  prevState: {
    error: string;
  },
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await signIn("sign-in", { ...data, callbackUrl: "/" });

  if (result?.error) {
    return {
      error: result.error,
    };
  }
  return {
    error: "",
  };
}
