import { SvghashtagIcon } from "@/components/svgIcons/SvgHashtagIcon";

function ChannelWelcomeMessage({ channelName }: { channelName: string }) {
  return (
    <div className="py-7 mt-auto">
      <div className="rounded-full bg-d-gray-160 inline-block p-3">
        <SvghashtagIcon width={42} height={42} className="fill-d-white" />
      </div>
      <h3 className="text-d-white text-3xl font-bold">Welcome to #{channelName}!</h3>
      <p className="text-d-gray-150">This is the start of the #{channelName} channel</p>
    </div>
  );
}

export { ChannelWelcomeMessage };
