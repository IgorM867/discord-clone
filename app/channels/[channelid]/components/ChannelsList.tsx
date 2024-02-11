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
    <div className="text-d-gray-150 p-2">
      {channels.map((channel) => (
        <ChannelButton
          channel={channel}
          isActive={activeChannel == channel.id}
          key={channel.id}
          contextMenuOptions={contextMenuOptions}
        />
      ))}
    </div>
  );
}
