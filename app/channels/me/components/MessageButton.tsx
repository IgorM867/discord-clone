"use client";
import { SvgMessageIcon } from "@/components/svgIcons/SvgMessageIcon";
import { createDirectChat } from "@/lib/actions/channelActions";

function MessageButton({ userId }: { userId: string }) {
  return (
    <button
      className="bg-d-gray-450 rounded-full w-9 h-9 grid place-items-center group-hover:bg-d-gray-500 group/button"
      onClick={() => createDirectChat(userId)}
    >
      <div className="hidden absolute -translate-y-9 bg-d-gray-600 text-d-gray-100 text-sm p-1 px-2 rounded-md group-hover/button:block">
        Message
      </div>
      <SvgMessageIcon
        width={20}
        height={20}
        className="fill-d-gray-125 group-hover/button:fill-d-white"
      />
    </button>
  );
}

export { MessageButton };
