import { Navbar } from "@/components/Navbar";
import { SignOutButton } from "@/components/SignOutButton";
import { getCurrentUser } from "@/lib/actions/userActions";
import { redirect } from "next/navigation";

export default async function DirectMessagesPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <main className="bg-d-gray-400 h-screen flex">
      <Navbar serverId={"direct-messages"} user={session.user} />

      <div>
        Direct Messages <br></br> <SignOutButton />
      </div>
    </main>
  );
}
