import { ChannelButton } from "./ChannelButton";

export function ChannelsList({
  channels,
  activeChannel,
  contextMenuOptions,
}: {
  channels: Channel[];
  activeChannel: string;
  contextMenuOptions: { name: string; event: () => void }[];
}) {
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
