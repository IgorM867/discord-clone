"use client";
import { ChannelSidebarHeader } from "./ChannelSidebarHeader";
import { ChannelsList } from "./ChannelsList";
import { ContextMenu } from "@/components/ContextMenu";
import { NewChannelForm } from "./NewChannelForm";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";

type ChannelSidebarProps = {
  serverName: string;
  userId: string;
  serverId: string;
  isAdmin: boolean;
  channels: Channel[];
  channelId: string;
};

function ChannelSidebar({
  serverName,
  serverId,
  isAdmin,
  channels,
  channelId,
}: ChannelSidebarProps) {
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
      <Sidebar onContextMenu={handleContextMenu}>
        <ChannelSidebarHeader
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
      </Sidebar>
      <ContextMenu
        ref={ref}
        options={contextMenuOptions}
        contextMenu={contextMenu}
        close={resetMenu}
      />
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
export { ChannelSidebar };
