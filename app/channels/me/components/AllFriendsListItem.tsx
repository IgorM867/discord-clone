"use client";
import Image from "next/image";
import { MoreOptionsButton } from "./MoreOptionsButton";
import { useContextMenu } from "@/hooks/useContextMenu";
import { ContextMenu } from "@/app/channels/[channelid]/components/ContextMenu";
import { blockUser, deleteFriend } from "@/lib/actions/userActions";

function AllFriendsListItem({ user }: { user: User }) {
  const { ref, contextMenu, handleContextMenu, resetMenu } = useContextMenu<HTMLLIElement>();

  const contextMenuOptions = [
    {
      name: "Remove Friend",
      event: () => {
        deleteFriend(user.id);
      },
    },
    {
      name: "Block",
      event: () => {
        blockUser(user.id, "/channels/friends/all");
      },
    },
  ];
  return (
    <>
      <li
        className="flex justify-between p-3 border-t-d-gray-200 border-t-[1px] cursor-pointer hover:border-t-transparent hover:rounded-md hover:bg-d-gray-200 group"
        key={user.id}
        onContextMenu={handleContextMenu}
      >
        <div className="flex items-center gap-3 ">
          <div className="size-8 bg-d-red rounded-full grid place-items-center p-1 cursor-pointer">
            <Image src="/logos/icon_clyde_white.svg" alt="avatar" width={20} height={20} />
          </div>
          <div>
            <p className="text-d-white font-medium">{user.username}</p>
            <p className="text-d-gray-125 text-xs">Offline</p>
          </div>
        </div>
        <div className="flex gap-2">
          <MoreOptionsButton userId={user.id} />
        </div>
      </li>
      <ContextMenu
        key={user.id}
        ref={ref}
        options={contextMenuOptions}
        contextMenu={contextMenu}
        close={resetMenu}
      />
    </>
  );
}

export { AllFriendsListItem };
