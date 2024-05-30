import { SignOutButton } from "@/components/SignOutButton";
import { MouseEventHandler, ReactNode } from "react";

type SideBarProps = {
  children: ReactNode;
  onContextMenu?: MouseEventHandler<HTMLDivElement>;
};

function Sidebar({ children, onContextMenu }: SideBarProps) {
  return (
    <div
      className="bg-d-gray-450 w-60 min-w-60 flex flex-col justify-between"
      onContextMenu={onContextMenu}
    >
      {children}
      <div className="bg-d-gray-500 flex justify-end p-2">
        <SignOutButton />
      </div>
    </div>
  );
}
export { Sidebar };
