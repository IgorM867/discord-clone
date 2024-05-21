import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

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

  const result = await signIn("sign-in", { ...data, redirect: false });

  if (result?.error) {
    return {
      error: result.error,
    };
  }
  if (result?.ok) {
    redirect("/");
  }
  return {
    error: "",
  };
}
