import Link from "next/link";
import { getAllRelationships, getCurrentUser } from "@/lib/actions/userActions";
import { FriendsDashboard } from "./components/FriendsDashboard";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { SidebarHeader } from "@/components/SidebarHeader";
import { SvgWavingFriendIcon } from "@/components/svgIcons/SvgWavingFriendIcon";
import { DirectsChatsList } from "./components/DirectsChatsList";

async function FriendsPage() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  const userRelationships = await getAllRelationships();
  if (!userRelationships) {
    return;
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
                className=" inline-block mr-2 fill-d-gray-100"
                width={24}
                height={24}
              />
              <span className="text-d-gray-100">Friends</span>
            </Link>
            <li className="text-d-gray-125 text-xs p-3 font-medium hover:text-d-white cursor-default">
              DIRECT MESSAGES
            </li>
            <DirectsChatsList userId={session.user.id} />
          </ul>
        </nav>
      </Sidebar>
      <FriendsDashboard userRelationships={userRelationships} />
    </main>
  );
}

export default FriendsPage;
