import { SvghashtagIcon } from "@/components/svgIcons/SvgHashtagIcon";
import { useContextMenu } from "@/hooks/useContextMenu";
import Link from "next/link";
import { ContextMenu } from "./ContextMenu";

type ChannelButtonProps = {
  channel: Channel;
  isActive: boolean;
  contextMenuOptions: { name: string; event: () => void }[];
};

export function ChannelButton({ channel, isActive, contextMenuOptions }: ChannelButtonProps) {
  const { ref, contextMenu, handleContextMenu, resetMenu } = useContextMenu();

  return (
    <>
      <div onContextMenuCapture={handleContextMenu}>
        <Link
          href={`/channels/${channel.id}`}
          key={channel.id}
          className={`flex items-center text-base gap-2 hover:bg-d-gray-250 p-1 pl-2 rounded-md cursor-pointer ${
            isActive && "text-d-white"
          }`}
        >
          <SvghashtagIcon width={18} height={18} className="fill-d-gray-150" />
          {channel.name}
        </Link>
      </div>
      {contextMenu.isActive && (
        <ContextMenu
          key={channel.id}
          ref={ref}
          close={resetMenu}
          options={contextMenuOptions}
          x={contextMenu.x}
          y={contextMenu.y}
        />
      )}
    </>
  );
}
