import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Navbar } from "@/components/Navbar";
import { SignOutButton } from "@/components/signOutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type ServerPageProps = {
  params: { serverid: string };
};
async function ServerPage({ params }: ServerPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <main className="bg-d-gray-300 h-screen flex">
      <Navbar serverId={params.serverid} user={session.user} />
      <div>
        Server Page <br></br>
        <SignOutButton />
      </div>
    </main>
  );
}

export default ServerPage;
