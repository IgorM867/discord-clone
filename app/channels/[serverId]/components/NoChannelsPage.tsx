import Image from "next/image";
import React from "react";

function NoChannelsPage() {
  return (
    <div className="bg-d-gray-550 w-full h-full flex justify-center align-middle">
      <div className="flex justify-center flex-col text-d-gray-150 text-center w-[440px] items-center">
        <Image src="/icons/no-channels.svg" alt="No channel image" width={272} height={222} />
        <h4 className="font-bold mt-8">NO TEXT CHANNELS</h4>
        <p>
          You find yourself in a strange place. You don't have access to any text channels or there
          are none in this server.
        </p>
      </div>
    </div>
  );
}
export { NoChannelsPage };
