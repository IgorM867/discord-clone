import { Navbar } from "@/components/Navbar";
import SideBar from "@/app/servers/[serverid]/components/Sidebar";
import { SignOutButton } from "@/components/signOutButton";
import { getCurrentUser, getServer } from "@/lib/actions";
import Image from "next/image";
import { redirect } from "next/navigation";

type ServerPageProps = {
  params: { serverid: string };
};
async function ServerPage({ params }: ServerPageProps) {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  const server = await getServer(params.serverid);
  if (!server)
    return (
      <main className="flex flex-col items-center justify-center gap-8 h-screen ">
        <Image src="/logos/full_logo_white.svg" alt="Discord Logo" width={400} height={75} />
        <p className="text-2xl text-d-white">Something went wrong! Please refresh.</p>
      </main>
    );
  return (
    <main className="bg-d-gray-300 h-screen flex">
      <Navbar serverId={params.serverid} user={session.user} />
      <SideBar serverName={server.name} userId={session.user.id} serverId={server.id} />
      <div>
        Server Page <br></br>
        <SignOutButton />
      </div>
    </main>
  );
}

export default ServerPage;
