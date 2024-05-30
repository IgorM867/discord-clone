"use client";
import { ContextMenu, ContextMenuOption } from "@/components/ContextMenu";
import { useContextMenu } from "@/hooks/useContextMenu";
import { Sidebar } from "@/components/Sidebar";
import { ReactNode } from "react";

type ChannelSidebarProps = {
  children: ReactNode;
};

function ChannelSidebar({ children }: ChannelSidebarProps) {
  const { ref, contextMenu, handleContextMenu, resetMenu } = useContextMenu();

  const contextMenuOptions: ContextMenuOption[] = [
    {
      type: "Link",
      name: "Create Channel",
      path: `?newChannelDialog=true`,
    },
    {
      type: "Link",
      name: "Create Category",
      path: "",
    },
    {
      type: "Link",
      name: "Invite People",
      path: `?inviteUsersDialog=true`,
    },
  ];

  return (
    <>
      <Sidebar onContextMenu={handleContextMenu}>{children}</Sidebar>
      <ContextMenu
        ref={ref}
        options={contextMenuOptions}
        contextMenu={contextMenu}
        close={resetMenu}
      />
    </>
  );
}
export { ChannelSidebar };
