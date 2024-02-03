import { SvghashtagIcon } from "@/components/svgIcons/SvgHashtagIcon";

export function ChannelsList({ channels }: { channels: Channel[] }) {
  return (
    <ul className="text-d-gray-150 p-2">
      {channels.map((channel) => (
        <li
          key={channel.id}
          className="flex items-center text-base gap-2 hover:bg-d-gray-250 p-1 pl-2 rounded-md cursor-pointer"
        >
          <SvghashtagIcon width={18} height={18} className="fill-d-gray-150" />
          {channel.name}
        </li>
      ))}
    </ul>
  );
}
