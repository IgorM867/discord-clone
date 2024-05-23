import { ForwardedRef, forwardRef } from "react";
import { ContextMenuButton } from "./ContextMenuButton";

type ContextMenuProps = {
  options: { name: string; event: () => void }[];
  contextMenu: {
    isActive: boolean;
    x: number;
    y: number;
  };
  close: () => void;
};
const ContextMenu = forwardRef(function (
  { options, contextMenu, close }: ContextMenuProps,
  ref: ForwardedRef<HTMLMenuElement>
) {
  return (
    <menu
      ref={ref}
      className={`${
        contextMenu.isActive ? "absolute" : "hidden"
      } bg-d-gray-600 text-d-gray-100 p-2 text-sm rounded-md`}
      style={{ left: contextMenu.x, top: contextMenu.y }}
      onClick={close}
    >
      {options.map((option, index) => (
        <ContextMenuButton key={index} option={option} />
      ))}
    </menu>
  );
});

export { ContextMenu };
