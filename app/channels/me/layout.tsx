import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/actions/userActions";
import { redirect } from "next/navigation";

type ServerLayoutProps = {
  children: React.ReactNode;
};

async function Layout({ children }: ServerLayoutProps) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <main className="bg-d-gray-400 h-screen flex">
      <Navbar serverId={"direct-messages"} user={session.user} />
      {children}
    </main>
  );
}

export default Layout;
