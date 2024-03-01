import { Error } from "@/components/Error";
import { SvghashtagIcon } from "@/components/svgIcons/SvgHashtagIcon";
import { getChannel } from "@/lib/actions";
import { Chat } from "./Chat";

async function Channel({ channelId }: { channelId: string }) {
  const channel = await getChannel(channelId);

  if (!channel) return <Error />;

  return (
    <div className="w-full max-h-screen h-screen ">
      <header className="bg-d-gray-300 shadow-md text-d-gray-100 font-medium p-3 pl-4">
        <SvghashtagIcon width={22} height={22} className="fill-d-gray-150 inline align-middle" />{" "}
        {channel.name}
      </header>
      <Chat channel={channel} />
    </div>
  );
}

export { Channel };
