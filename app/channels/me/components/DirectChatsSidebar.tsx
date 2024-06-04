import { Sidebar } from "@/components/Sidebar";
import { SidebarHeader } from "@/components/SidebarHeader";
import { SvgWavingFriendIcon } from "@/components/svgIcons/SvgWavingFriendIcon";
import Link from "next/link";
import { DirectsChatsList } from "./DirectsChatsList";

type DirectChatsSidebarProps = {
  userId: string;
  activeChatId: string;
};

function DirectChatsSidebar({ userId, activeChatId }: DirectChatsSidebarProps) {
  return (
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
              className={`${
                activeChatId ? "fill-d-gray-150 group-hover:fill-d-gray-100" : "fill-d-gray-100"
              } inline-block mr-2`}
              width={24}
              height={24}
            />
            <span
              className={`${
                activeChatId ? "text-d-gray-125 group-hover:text-d-gray-100" : "text-d-gray-100"
              } `}
            >
              Friends
            </span>
          </Link>
          <li className="text-d-gray-125 text-xs p-3 font-medium hover:text-d-white cursor-default">
            DIRECT MESSAGES
          </li>
          <DirectsChatsList userId={userId} activeChatId={activeChatId} />
        </ul>
      </nav>
    </Sidebar>
  );
}

export { DirectChatsSidebar };
