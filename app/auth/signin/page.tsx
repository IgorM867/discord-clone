"use client";
import { Input } from "@/components/Input";
import { SignInGoogleButton } from "@/components/SignInGoogleButton";
import { SubmitButton } from "@/components/SubmitButton";
import { logIn } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";

const initialState = {
  error: "",
};

export default function page() {
  const [state, formAction] = useFormState(logIn, initialState);

  return (
    <main className="h-screen grid place-items-center">
      <form className="bg-d-white rounded-2xl p-9 min-w-[550px] flex flex-col" action={formAction}>
        <Image src="/logos/full_logo_black.svg" alt="Discord Logo" width={400} height={75} />

        <Input label="E-MAIL" type="email" name="email" />
        <Input label="PASSWORD" type="password" name="password" />
        {state && <p className="text-red-500">{`${state.error}`}</p>}
        <SubmitButton text="Log in" />
        <p className="text-center text-xl mt-5">Or</p>
        <SignInGoogleButton />
        <Link href="/auth/new-user" className="text-center mt-5">
          No account? <span className="text-d-purple">Create one</span>
        </Link>
      </form>
    </main>
  );
}
