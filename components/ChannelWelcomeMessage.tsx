import { SvghashtagIcon } from "@/components/svgIcons/SvgHashtagIcon";
import Image from "next/image";

type ChannelWelcomeMessageProps = {
  message: string;
  chatType: "server_chat" | "direct_chat";
};

function ChannelWelcomeMessage({ message, chatType }: ChannelWelcomeMessageProps) {
  return (
    <div className="py-7 mt-auto pl-5">
      {chatType === "server_chat" ? (
        <>
          <div className="rounded-full bg-d-gray-200 inline-block p-3">
            <SvghashtagIcon width={42} height={42} className="fill-d-white" />
          </div>
          <h3 className="text-d-white text-3xl font-bold">Welcome to {message}!</h3>
          <p className="text-d-gray-150">This is the start of the {message} channel</p>
        </>
      ) : (
        <>
          <div className="rounded-full bg-d-red size-20 grid place-items-center ">
            <Image src="/logos/icon_clyde_white.svg" alt="avatar" width={48} height={48} />
          </div>
          <h3 className="text-d-white text-3xl font-bold">{message}</h3>
          <p className="text-d-gray-150">
            This is the begininng of you direct message history with{" "}
            <span className="font-semibold">{message}</span>
          </p>
        </>
      )}
    </div>
  );
}

export { ChannelWelcomeMessage };
