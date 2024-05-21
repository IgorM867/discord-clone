"use client";
import { SvgEllipsisVerticalIcon } from "@/components/svgIcons/SvgEllipsisVerticalIcon";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { deleteFriend } from "@/lib/actions/userActions";
import { useState } from "react";

function MoreOptionsButton({ userId }: { userId: string }) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleClick = async () => {
    setIsMenuActive(false);
    await deleteFriend(userId);
  };

  return (
    <button
      className="bg-d-gray-450 rounded-full w-9 h-9 grid place-items-center group-hover:bg-d-gray-500 group/button"
      onClick={() => setIsMenuActive(true)}
    >
      <div className="hidden absolute -translate-y-9 bg-d-gray-600 text-d-gray-100 text-sm p-1 px-2 rounded-md group-hover/button:block">
        More
      </div>
      <SvgEllipsisVerticalIcon
        width={20}
        height={20}
        className="fill-d-white group-hover/button:fill-d-red"
      />
      {isMenuActive && (
        <Menu
          isActive={isMenuActive}
          close={() => setIsMenuActive(false)}
          handleClick={handleClick}
        />
      )}
    </button>
  );
}
type MenuProps = {
  isActive: boolean;
  close: () => void;
  handleClick: () => void;
};

function Menu({ isActive, close, handleClick }: MenuProps) {
  const ref = useOnClickOutside(close);
  return (
    <menu
      ref={ref}
      className={`w-32 bg-d-gray-600 text-d-red p-2 text-sm rounded-md ${
        isActive ? "absolute -translate-x-16 -translate-y-[-30px]" : "hidden"
      }`}
    >
      <button
        className="p-2 hover:bg-d-red hover:text-d-gray-100 cursor-pointer rounded-sm block w-full text-left"
        onClick={handleClick}
      >
        Remove Friend
      </button>
    </menu>
  );
}
export { MoreOptionsButton };
