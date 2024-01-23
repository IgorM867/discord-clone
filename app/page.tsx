import { Navbar } from "@/components/Navbar";
import { SignOutButton } from "@/components/signOutButton";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions";

export default async function Home() {
  const session = await getCurrentUser();
  if (!session) return redirect("/auth/signin");
  return (
    <main className="bg-d-gray-300 h-screen flex">
      <Navbar serverId="direct-messages" user={session?.user} />
      <div>
        User is sign in <br></br> <SignOutButton />
      </div>
    </main>
  );
}
