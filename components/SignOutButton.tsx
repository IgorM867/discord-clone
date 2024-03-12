"use client";
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="border border-black rounded-md p-2 cursor-pointer bg-d-gray-350"
    >
      Sign out
    </button>
  );
}
export { SignOutButton };
