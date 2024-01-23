import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Navbar } from "@/components/Navbar";
import { SignOutButton } from "@/components/signOutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DirectMessagesPage() {
  const session = await getServerSession(authOptions);

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
