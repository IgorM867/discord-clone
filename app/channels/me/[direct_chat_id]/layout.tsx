import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SidebarHeader } from "@/components/SidebarHeader";
import { SvgWavingFriendIcon } from "@/components/svgIcons/SvgWavingFriendIcon";
import { getCurrentUser } from "@/lib/actions/userActions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DirectsChatsList } from "../components/DirectsChatsList";

type LayoutProps = {
  children: React.ReactNode;
  params: { direct_chat_id: string };
};

export default async function Layout({ children, params }: LayoutProps) {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <main className="bg-d-gray-400 h-screen flex">
      <Navbar serverId={"direct-messages"} user={session.user} />
      <Sidebar>
        <SidebarHeader>
          <button className="bg-d-gray-550 text-sm text-d-gray-125 font-light rounded p-1 w-full text-left">
            Find or start a conversation
          </button>
        </SidebarHeader>
        <nav className="h-full">
          <ul className="p-2">
            <Link
              className="block group p-3 hover:bg-d-gray-250 rounded-md cursor-pointer"
              href={"/channels/me"}
            >
              <SvgWavingFriendIcon
                className="fill-d-gray-150 inline-block mr-2 group-hover:fill-d-gray-100"
                width={24}
                height={24}
              />
              <span className="text-d-gray-125 group-hover:text-d-gray-100">Friends</span>
            </Link>
            <li className="text-d-gray-125 text-xs p-3 font-medium hover:text-d-white cursor-default">
              DIRECT MESSAGES
            </li>
            <DirectsChatsList userId={session.user.id} activeChatId={params.direct_chat_id} />
          </ul>
        </nav>
      </Sidebar>
      {children}
    </main>
  );
}
