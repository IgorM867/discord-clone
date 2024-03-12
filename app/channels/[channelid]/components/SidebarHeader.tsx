"use client";
import Image from "next/image";
import { ServerMenu } from "./ServerMenu";
import { SvgXIcon } from "../../../../components/svgIcons/SvgXIcon";
import { useState } from "react";

type SidebarHeaderProps = {
  serverName: string;
  isAdmin: boolean;
  serverId: string;
  showForm: () => void;
};

function SidebarHeader({ serverName, isAdmin, serverId, showForm }: SidebarHeaderProps) {
  const [isMenuActive, setisMenuActive] = useState(false);

  const closeMenu = () => {
    setisMenuActive(false);
  };
  return (
    <header
      className="text-d-gray-100 font-medium p-3 px-4 pr-5 shadow-md hover:bg-d-gray-300 cursor-pointer flex relative items-center"
      onClick={() => setisMenuActive(!isMenuActive)}
    >
      <h2 className="overflow-ellipsis overflow-hidden whitespace-nowrap w-full">{serverName}</h2>
      {isMenuActive ? (
        <>
          <SvgXIcon width={12} height={12} className="fill-white" />
          <ServerMenu isAdmin={isAdmin} close={closeMenu} serverId={serverId} showForm={showForm} />
        </>
      ) : (
        <Image src="/icons/angle-down.svg" alt="andle down icon" width={12} height={12} />
      )}
    </header>
  );
}
export { SidebarHeader };
