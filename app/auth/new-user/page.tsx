"use client";
import { Input } from "@/components/Input";
import { SignInGoogleButton } from "@/components/SignInGoogleButton";
import { SubmitButton } from "@/components/SubmitButton";
import { authenticate } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";

const initialState = {
  error: "",
};

export default function page() {
  const [state, formAction] = useFormState(authenticate, initialState);

  return (
    <main className="h-screen grid place-items-center">
      <form className="bg-d-white rounded-2xl p-9 min-w-[550px] flex flex-col" action={formAction}>
        <Image src="/logos/full_logo_black.svg" alt="Discord Logo" width={400} height={75} />
        <Input label="USERNAME" type="text" name="username" />
        <Input label="E-MAIL" type="email" name="email" />
        <Input label="PASSWORD" type="password" name="password" />
        <Input label="REPEAT PASSWORD" type="password" name="repeatedpassword" />
        {state && <p className="text-red-500">{`${state.error}`}</p>}
        <SubmitButton text="Create account" />
        <p className="text-center text-xl mt-5">Or</p>
        <SignInGoogleButton />
        <Link href="/auth/signin" className="text-center mt-5">
          Already have an account? <span className="text-d-purple">Log in </span>
        </Link>
      </form>
    </main>
  );
}
