import { Navbar } from "@/components/Navbar";
import { SignOutButton } from "@/components/signOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
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
