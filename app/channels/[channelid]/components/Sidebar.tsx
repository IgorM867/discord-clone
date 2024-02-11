"use client";
import { useState } from "react";
import { NewChannelForm } from "./NewChannelForm";
import SidebarHeader from "./SidebarHeader";
import { ChannelsList } from "./ChannelsList";
import { useContextMenu } from "@/hooks/useContextMenu";
import { ContextMenu } from "./ContextMenu";

type SideBarProps = {
  serverName: string;
  userId: string;
  serverId: string;
  isAdmin: boolean;
  channels: Channel[];
  channelId: string;
};

export function SideBar({ serverName, serverId, isAdmin, channels, channelId }: SideBarProps) {
  const [isFormActive, setIsFormActive] = useState(false);
  const { ref, contextMenu, handleContextMenu, resetMenu } = useContextMenu();

  const contextMenuOptions = [
    {
      name: "Create Channel",
      event: () => {
        setIsFormActive(true);
      },
    },
    {
      name: "Create Category",
      event: () => {},
    },
    {
      name: "Invite People",
      event: () => {},
    },
  ];

  return (
    <>
      <div className="bg-d-gray-400 w-56" onContextMenuCapture={handleContextMenu}>
        <SidebarHeader
          serverName={serverName}
          isAdmin={isAdmin}
          serverId={serverId}
          showForm={() => {
            setIsFormActive(true);
          }}
        />
        <ChannelsList
          channels={channels}
          activeChannel={channelId}
          contextMenuOptions={contextMenuOptions}
        />
      </div>
      {contextMenu.isActive && (
        <ContextMenu
          ref={ref}
          close={resetMenu}
          options={contextMenuOptions}
          x={contextMenu.x}
          y={contextMenu.y}
        />
      )}
      {isFormActive && (
        <NewChannelForm
          isOpen={isFormActive}
          serverId={serverId}
          close={() => {
            setIsFormActive(false);
          }}
        />
      )}
    </>
  );
}
