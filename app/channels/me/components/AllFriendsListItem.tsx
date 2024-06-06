"use client";
import { MoreOptionsButton } from "./MoreOptionsButton";
import { useContextMenu } from "@/hooks/useContextMenu";
import { ContextMenu, ContextMenuOption } from "@/components/ContextMenu";
import { UserAvatar } from "./UserAvatar";
import { MessageButton } from "./MessageButton";
import { deleteFriend, blockUser } from "@/lib/usersRelationshipsActions";

function AllFriendsListItem({ user }: { user: User }) {
  const { ref, contextMenu, handleContextMenu, resetMenu } = useContextMenu<HTMLLIElement>();

  const contextMenuOptions: ContextMenuOption[] = [
    {
      type: "Button",
      name: "Remove Friend",
      event: () => {
        deleteFriend(user.id);
      },
    },
    {
      type: "Button",
      name: "Block",
      event: () => {
        blockUser(user.id);
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
          <UserAvatar isOnline={user.status === "Online"} size="big" src={user.image} />
          <div>
            <p className="text-d-white font-medium">{user.username}</p>
            <p className="text-d-gray-125 text-xs">{user.status}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <MessageButton userId={user.id} />
          <MoreOptionsButton userId={user.id} />
        </div>
      </li>
      <ContextMenu
        key={`${user.id}-menu`}
        ref={ref}
        options={contextMenuOptions}
        contextMenu={contextMenu}
        close={resetMenu}
      />
    </>
  );
}

export { AllFriendsListItem };
