"use client";
import Image from "next/image";
import { UnblockUserButton } from "./UnblockUserButton";

function BlockedFriendsListItem({ user }: { user: User }) {
  return (
    <>
      <li
        className="flex justify-between p-3 border-t-d-gray-200 border-t-[1px] cursor-pointer hover:border-t-transparent hover:rounded-md hover:bg-d-gray-200 group"
        key={user.id}
      >
        <div className="flex items-center gap-3 ">
          <Image src={user.image} alt="user avatar" width={32} height={32} />
          <div>
            <p className="text-d-white font-medium">{user.username}</p>
            <p className="text-d-gray-125 text-xs">Blocked</p>
          </div>
        </div>
        <div className="flex gap-2">
          <UnblockUserButton userId={user.id} />
        </div>
      </li>
    </>
  );
}

export { BlockedFriendsListItem };
