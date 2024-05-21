"use client";
import Image from "next/image";
import { ServerMenu } from "./ServerMenu";
import { SvgXIcon } from "../../../../components/svgIcons/SvgXIcon";
import { useState } from "react";
import { SidebarHeader } from "@/components/SidebarHeader";

type ChannelSidebarHeaderProps = {
  serverName: string;
  isAdmin: boolean;
  serverId: string;
  showForm: () => void;
};

function ChannelSidebarHeader({
  serverName,
  isAdmin,
  serverId,
  showForm,
}: ChannelSidebarHeaderProps) {
  const [isMenuActive, setisMenuActive] = useState(false);

  const closeMenu = () => {
    setisMenuActive(false);
  };
  return (
    <SidebarHeader onClick={() => setisMenuActive(!isMenuActive)} hoverOn>
      <h2 className="overflow-ellipsis overflow-hidden whitespace-nowrap w-full">{serverName}</h2>
      {isMenuActive ? (
        <>
          <SvgXIcon width={12} height={12} className="fill-white mr-1" />
          <ServerMenu isAdmin={isAdmin} close={closeMenu} serverId={serverId} showForm={showForm} />
        </>
      ) : (
        <Image
          src="/icons/angle-down.svg"
          alt="andle down icon"
          width={12}
          height={12}
          className="mr-1"
        />
      )}
    </SidebarHeader>
  );
}
export { ChannelSidebarHeader };
