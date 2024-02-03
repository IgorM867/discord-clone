"use client";
import { useState } from "react";
import { NewChannelForm } from "./NewChannelForm";
import SidebarHeader from "./SidebarHeader";
import { ChannelsList } from "./ChannelsList";

type SideBarProps = {
  serverName: string;
  userId: string;
  serverId: string;
  isAdmin: boolean;
  channels: Channel[];
};

export function SideBar({ serverName, serverId, isAdmin, channels }: SideBarProps) {
  const [isFormActive, setIsFormActive] = useState(false);

  const showForm = () => {
    setIsFormActive(true);
  };

  const hideForm = () => {
    setIsFormActive(false);
  };
  return (
    <>
      <div className="bg-d-gray-400 w-56">
        <SidebarHeader
          serverName={serverName}
          isAdmin={isAdmin}
          serverId={serverId}
          showForm={showForm}
        />
        <ChannelsList channels={channels} />
      </div>
      {isFormActive && (
        <NewChannelForm isOpen={isFormActive} serverId={serverId} close={hideForm} />
      )}
    </>
  );
}
