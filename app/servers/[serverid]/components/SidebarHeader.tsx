"use client";
import { useState } from "react";
import { SvgXIcon } from "../../../../components/svgIcons/SvgXIcon";
import Image from "next/image";
import ServerMenu from "./ServerMenu";

type SidebarHeaderProps = {
  serverName: string;
  isAdmin: boolean;
  serverId: string;
};

export default function SidebarHeader({ serverName, isAdmin, serverId }: SidebarHeaderProps) {
  const [isMenuActive, setisMenuActive] = useState(false);

  const closeMenu = () => {
    setisMenuActive(false);
  };
  return (
    <header
      className="text-d-gray-100 p-4 font-bold shadow-md hover:bg-d-gray-200 cursor-pointer flex relative"
      onClick={() => setisMenuActive(!isMenuActive)}
    >
      <h2 className="overflow-ellipsis overflow-hidden whitespace-nowrap w-full">{serverName}</h2>
      {isMenuActive ? (
        <>
          <SvgXIcon width={20} height={20} className="fill-white" />
          <ServerMenu isAdmin={isAdmin} close={closeMenu} serverId={serverId} />
        </>
      ) : (
        <Image src="/icons/angle-down.svg" alt="andle down icon" width={20} height={20} />
      )}
    </header>
  );
}
