import Link from "next/link";
import { ContextMenuOption } from "./ContextMenu";

type ContextMenuButtonProps = { option: ContextMenuOption };

function ContextMenuButton({ option }: ContextMenuButtonProps) {
  return option.type === "Button" ? (
    <button
      className="p-2 hover:bg-d-purple cursor-pointer rounded-sm block w-full text-left"
      onClick={option.event}
    >
      {option.name}
    </button>
  ) : (
    <Link
      href={option.path}
      className="p-2 hover:bg-d-purple cursor-pointer rounded-sm block w-full text-left"
    >
      {option.name}
    </Link>
  );
}

export { ContextMenuButton };
