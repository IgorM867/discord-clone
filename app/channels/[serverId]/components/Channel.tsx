import { Error } from "@/components/Error";
import { SvghashtagIcon } from "@/components/svgIcons/SvgHashtagIcon";
import { Chat } from "@/components/Chat";
import { getChannel } from "../lib/actions";

async function Channel({ channelId }: { channelId: string }) {
  const channel = await getChannel(channelId);

  if (!channel) return <Error />;

  return (
    <div className="w-full max-h-screen h-screen ">
      <header className="bg-d-gray-400 shadow-md text-d-gray-100 font-medium p-3 pl-4">
        <SvghashtagIcon width={22} height={22} className="fill-d-gray-150 inline align-middle" />{" "}
        {channel.name}
      </header>
      <Chat chatInfo={{ channel, type: "server_chat" }} />
    </div>
  );
}

export { Channel };
