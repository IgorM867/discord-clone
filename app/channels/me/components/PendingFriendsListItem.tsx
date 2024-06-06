import { AcceptPendingFriendButton } from "./AcceptNewFriendButton";
import { DeletePendingFriendButton } from "./DeletePendingFriendButton";
import Image from "next/image";

function PendingFriendsListItem({
  user,
}: {
  user: User & { request_direction: "Outgoing" | "Incoming" };
}) {
  return (
    <li className="flex justify-between p-3 border-t-d-gray-200 border-t-[1px] cursor-pointer hover:border-t-transparent hover:rounded-md hover:bg-d-gray-200 group">
      <div className="flex items-center gap-3 ">
        <Image src={user.image} alt="user avatar" width={32} height={32} />
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
