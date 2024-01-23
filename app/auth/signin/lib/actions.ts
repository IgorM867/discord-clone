import { signIn } from "next-auth/react";

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
