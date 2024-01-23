import { Navbar } from "@/components/Navbar";
import { SignOutButton } from "@/components/signOutButton";
import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function DirectMessagesPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <main className="bg-d-gray-300 h-screen flex">
      <Navbar serverId={"direct-messages"} user={session.user} />

      <div>
        Direct Messages <br></br> <SignOutButton />
      </div>
    </main>
  );
}
