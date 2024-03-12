"use client";
import { SignOutButton } from "@/components/SignOutButton";
import { SidebarHeader } from "./SidebarHeader";
import { ChannelsList } from "./ChannelsList";
import { ContextMenu } from "./ContextMenu";
import { NewChannelForm } from "./NewChannelForm";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useState } from "react";

type SideBarProps = {
  serverName: string;
  userId: string;
  serverId: string;
  isAdmin: boolean;
  channels: Channel[];
  channelId: string;
};

function SideBar({ serverName, serverId, isAdmin, channels, channelId }: SideBarProps) {
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
      <div
        className="bg-d-gray-450 w-60 min-w-60 flex flex-col justify-between"
        onContextMenu={handleContextMenu}
      >
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
        <div className="bg-d-gray-500 flex justify-end p-2">
          <SignOutButton />
        </div>
      </div>
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
export { SideBar };
