import { SingInForm } from "./components/SingInForm";
import { SignInNewUserForm } from "./components/SignInNewUserForm";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/userActions";

export default async function page({ searchParams }: { searchParams: { newuser?: string } }) {
  const session = await getCurrentUser();
  if (session) {
    redirect("/");
  }
  return (
    <main className="h-screen grid place-items-center">
      {searchParams.newuser ? <SignInNewUserForm /> : <SingInForm />}
    </main>
  );
}
