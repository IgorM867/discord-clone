import { ChannelButton } from "./ChannelButton";

type ChannelsListProps = {
  channels: Channel[];
  activeChannel: string;
  contextMenuOptions: { name: string; event: () => void }[];
};

function ChannelsList({ channels, activeChannel, contextMenuOptions }: ChannelsListProps) {
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
