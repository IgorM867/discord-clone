"use client";
import Link from "next/link";
import { SvghashtagIcon } from "@/components/svgIcons/SvgHashtagIcon";
import { ContextMenu, ContextMenuOption } from "@/components/ContextMenu";
import { useContextMenu } from "@/hooks/useContextMenu";
import { deleteChannel } from "../lib/actions";
import { useParams } from "next/navigation";

type ChannelButtonProps = {
  channel: Channel;
  isActive: boolean;
  contextMenuOptions: ContextMenuOption[];
  firstChannelId: string | null;
};

function ChannelButton({
  channel,
  isActive,
  contextMenuOptions,
  firstChannelId,
}: ChannelButtonProps) {
  const { ref, contextMenu, handleContextMenu, resetMenu } = useContextMenu<HTMLDivElement>();
  const params = useParams();

  const newContextMenuOptions: ContextMenuOption[] = [
    ...contextMenuOptions,
    {
      type: "Button",
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
          href={`/channels/${params.serverId}/${channel.id}`}
          key={channel.id}
          className={`flex items-center text-base gap-2 hover:bg-d-gray-350 p-1 pl-2 rounded-md cursor-pointer ${
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
export { ChannelButton };
