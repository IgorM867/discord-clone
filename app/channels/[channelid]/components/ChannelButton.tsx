import { SvghashtagIcon } from "@/components/svgIcons/SvgHashtagIcon";
import { useContextMenu } from "@/hooks/useContextMenu";
import Link from "next/link";
import { ContextMenu } from "./ContextMenu";
import { deleteChannel } from "@/lib/actions";

type ChannelButtonProps = {
  channel: Channel;
  isActive: boolean;
  contextMenuOptions: { name: string; event: () => void }[];
  firstChannelId: string | null;
};

export function ChannelButton({
  channel,
  isActive,
  contextMenuOptions,
  firstChannelId,
}: ChannelButtonProps) {
  const { ref, contextMenu, handleContextMenu, resetMenu } = useContextMenu();

  const newContextMenuOptions = [
    ...contextMenuOptions,
    {
      name: "Delete Channel",
      event: () => {
        deleteChannel(channel.id, isActive, firstChannelId);
      },
    },
  ];

  return (
    <>
      <div onContextMenu={handleContextMenu}>
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
      <ContextMenu
        key={channel.id}
        ref={ref}
        options={newContextMenuOptions}
        contextMenu={contextMenu}
        close={resetMenu}
      />
    </>
  );
}
