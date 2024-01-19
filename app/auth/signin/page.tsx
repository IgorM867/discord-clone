import { SingInForm } from "./components/SingInForm";
import { SignInNewUserForm } from "./components/SignInNewUserForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const initialState = {
  error: "",
};

export default async function page({ searchParams }: { searchParams: { newuser?: string } }) {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <main className="h-screen grid place-items-center">
      {searchParams.newuser ? <SignInNewUserForm /> : <SingInForm />}
    </main>
  );
}
