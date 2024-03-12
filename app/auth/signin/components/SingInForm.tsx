"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/Input";
import { SignInGoogleButton } from "@/app/auth/signin/components/SignInGoogleButton";
import { SubmitButton } from "@/app/auth/signin/components/SubmitButton";
import { useFormState } from "react-dom";
import { logIn } from "../lib/actions";

const initialState = {
  error: "",
};

function SingInForm() {
  const [state, formAction] = useFormState(logIn, initialState);
  return (
    <form className="bg-d-white rounded-2xl p-9 min-w-[550px] flex flex-col" action={formAction}>
      <Image src="/logos/full_logo_black.svg" alt="Discord Logo" width={400} height={75} />
      <Input label="E-MAIL" type="email" name="email" />
      <Input label="PASSWORD" type="password" name="password" />
      {state && <p className="text-red-500">{`${state.error}`}</p>}
      <SubmitButton text="Log in" />
      <p className="text-center text-xl mt-5">Or</p>
      <SignInGoogleButton />
      <Link href="/auth/signin?newuser=true" className="text-center mt-5">
        No account? <span className="text-d-purple">Create one</span>
      </Link>
    </form>
  );
}
export { SingInForm };
