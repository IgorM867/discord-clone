"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button onClick={() => signOut()} className="border border-black rounded-md p-2 cursor-pointer">
      Sign out
    </button>
  );
}
