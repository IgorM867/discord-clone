import { ForwardedRef, forwardRef } from "react";

type ContextMenuProps = {
  options: { name: string; event: () => void }[];
  x: number;
  y: number;
  close: () => void;
};
const ContextMenu = forwardRef(function (
  { options, x, y, close }: ContextMenuProps,
  ref: ForwardedRef<HTMLMenuElement>
) {
  return (
    <menu
      ref={ref}
      className="absolute bg-d-gray-600 text-d-gray-100 p-2 text-sm rounded-md"
      style={{ left: x, top: y }}
      onClick={close}
    >
      {options.map((option, index) => (
        <button
          key={index}
          className="p-2 hover:bg-d-purple cursor-pointer rounded-sm block w-full text-left"
          onClick={option.event}
        >
          {option.name}
        </button>
      ))}
    </menu>
  );
});
export { ContextMenu };
