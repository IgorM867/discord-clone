import { SvghashtagIcon } from "@/components/svgIcons/SvgHashtagIcon";
import Image from "next/image";

type ChannelWelcomeMessageProps = {
  message: string;
  chatType: "server_chat" | "direct_chat";
  userImage?: string;
};

function ChannelWelcomeMessage({ message, chatType, userImage }: ChannelWelcomeMessageProps) {
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
          <Image src={userImage || ""} alt="user avatar" width={80} height={80} />
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
