import Image from "next/image";
import { SvgSpinnerIcon } from "@/components/svgIcons/SvgSpinnerIcon";
import { useState } from "react";

type ButtonState = "initial" | "sending" | "sent";
type FriendsListToInviteItemProps = {
  friend: User;
  sendInviteLink: (userId: string) => void;
};
function FriendsListToInviteItem({ friend, sendInviteLink }: FriendsListToInviteItemProps) {
  const [itemState, setItemState] = useState<ButtonState>("initial");

  const handleClick = async () => {
    setItemState("sending");

    await sendInviteLink(friend.id);

    setItemState("sent");
  };

  return (
    <li className="group flex items-center justify-between rounded-md  p-2 hover:bg-d-gray-250">
      <div className="flex items-center gap-2">
        <Image src={friend.image} alt="user avatar" width={32} height={32} />
        {friend.username}
      </div>
      <button
        disabled={itemState === "sending" || itemState === "sent"}
        className={`${
          itemState === "sent" || itemState === "sending"
            ? "cursor-not-allowed text-d-gray-125"
            : "border-d-green border group-hover:bg-d-green"
        }   px-3 py-1 w-16 h-9 flex items-center justify-center `}
        onClick={handleClick}
      >
        {itemState === "initial" ? (
          "Invite"
        ) : itemState === "sending" ? (
          <SvgSpinnerIcon width={16} height={16} className="fill-d-green animate-spin" />
        ) : (
          "Sent"
        )}
      </button>
    </li>
  );
}

export { FriendsListToInviteItem };
