"use client";
import { SvgXIcon } from "@/components/svgIcons/SvgXIcon";
import { deletePendingFriend } from "@/lib/usersRelationshipsActions";

function DeletePendingFriendButton({ userId }: { userId: string }) {
  return (
    <button
      className="bg-d-gray-450 rounded-full w-9 h-9 grid place-items-center group-hover:bg-d-gray-500 group/button"
      onClick={async () => await deletePendingFriend(userId)}
    >
      <div className="hidden absolute -translate-y-9 bg-d-gray-600 text-d-gray-100 text-sm p-1 px-2 rounded-md group-hover/button:block">
        Cancel
      </div>
      <SvgXIcon width={20} height={20} className="fill-d-white group-hover/button:fill-d-red" />
    </button>
  );
}

export { DeletePendingFriendButton };
