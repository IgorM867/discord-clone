import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/userActions";
import { redirect } from "next/navigation";

type ServerLayoutProps = {
  params: {
    serverId: string;
  };
  children: React.ReactNode;
};

async function ServerLayout({ params, children }: ServerLayoutProps) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <main className="bg-d-gray-400 h-screen flex">
      <Navbar serverId={params.serverId} user={session.user} />
      {children}
    </main>
  );
}

export default ServerLayout;
