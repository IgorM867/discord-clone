import { ContextMenuOption } from "@/components/ContextMenu";
import { ChannelButton } from "./ChannelButton";

type ChannelsListProps = {
  channels: Channel[];
  activeChannel: string;
};

function ChannelsList({ channels, activeChannel }: ChannelsListProps) {
  const contextMenuOptions: ContextMenuOption[] = [
    {
      type: "Link",
      name: "Create Channel",
      path: `${activeChannel}/?newChannelDialog=true`,
    },
    {
      type: "Link",
      name: "Create Category",
      path: "",
    },
    {
      type: "Link",
      name: "Invite People",
      path: `${activeChannel}/?inviteUsersDialog=true`,
    },
  ];

  return (
    <div className="text-d-gray-150 p-2 h-full">
      {channels.map((channel, index) => (
        <ChannelButton
          channel={channel}
          isActive={activeChannel == channel.id}
          key={channel.id}
          contextMenuOptions={contextMenuOptions}
          firstChannelId={channels.length > 1 ? channels[index == 0 ? 1 : 0].id : null}
        />
      ))}
    </div>
  );
}
export { ChannelsList };
