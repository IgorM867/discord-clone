"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

function SignInGoogleButton() {
  return (
    <button
      type="button"
      className="border-2 border-black rounded-md flex justify-center p-3 gap-4 mt-5"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <Image src="/logos/google_logo.svg" width={26} height={26} alt="google logo" />
      Continue with Google
    </button>
  );
}
export { SignInGoogleButton };
