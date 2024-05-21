import { AcceptPendingFriendButton } from "../pending/components/AcceptNewFriendButton";
import { DeletePendingFriendButton } from "../pending/components/DeletePendingFriendButton";
import Image from "next/image";

function PendingFriendsListItem({
  user,
}: {
  user: User & { request_direction: "Outgoing" | "Incoming" };
}) {
  return (
    <li className="flex justify-between p-3 border-t-d-gray-200 border-t-[1px] cursor-pointer hover:border-t-transparent hover:rounded-md hover:bg-d-gray-200 group">
      <div className="flex items-center gap-3 ">
        <div className="size-8 bg-d-red rounded-full grid place-items-center p-1 cursor-pointer">
          <Image src="/logos/icon_clyde_white.svg" alt="avatar" width={20} height={20} />
        </div>
        <div>
          <p className="text-d-white font-medium">{user.username}</p>
          <p className="text-d-gray-125 text-xs">{user.request_direction} Friend Request</p>
        </div>
      </div>
      <div className="flex gap-2">
        {user.request_direction == "Incoming" && <AcceptPendingFriendButton userId={user.id} />}
        <DeletePendingFriendButton userId={user.id} />
      </div>
    </li>
  );
}

export { PendingFriendsListItem };
