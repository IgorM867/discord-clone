import { MouseEventHandler, ReactNode } from "react";

type SidebarHeaderProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  hoverOn?: boolean;
};

function SidebarHeader({ children, onClick, hoverOn }: SidebarHeaderProps) {
  return (
    <header
      className={`text-d-gray-100 font-medium p-3 px-3 shadow-md flex relative items-center h-12${
        hoverOn ? "hover:bg-d-gray-300 cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </header>
  );
}
export { SidebarHeader };
