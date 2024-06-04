"use client";
import { SvgCheckIcon } from "@/components/svgIcons/SvgCheckIcon";
import { acceptFriendRequest } from "@/lib/usersRelationshipsActions";

function AcceptPendingFriendButton({ userId }: { userId: string }) {
  return (
    <button
      className="bg-d-gray-450 rounded-full w-9 h-9 grid place-items-center group-hover:bg-d-gray-500 group/button"
      onClick={async () => await acceptFriendRequest(userId)}
    >
      <div className="hidden absolute -translate-y-9 bg-d-gray-600 text-d-gray-100 text-sm p-1 px-2 rounded-md group-hover/button:block">
        Accept
      </div>
      <SvgCheckIcon
        width={20}
        height={20}
        className="fill-d-white group-hover/button:fill-d-green"
      />
    </button>
  );
}

export { AcceptPendingFriendButton };
