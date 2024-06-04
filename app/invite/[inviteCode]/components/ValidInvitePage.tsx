"use client";
import { acceptInvite } from "@/lib/invitiesToServerActions";
import Image from "next/image";

type ValidInvitePagePros = {
  inviteCode: string;
  inviterUsername: string;
  serverName: string;
};

function ValidInvitePage({ inviteCode, inviterUsername, serverName }: ValidInvitePagePros) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px]  bg-d-gray-400 flex flex-col items-center p-5 rounded">
      <div className="bg-d-red size-20 rounded-full grid place-items-center">
        <Image src="/logos/icon_clyde_white.svg" alt="user_image" width={44} height={44} />
      </div>
      <p className="text-d-gray-125 text-center mt-5">{inviterUsername} invited you to join</p>
      <h1 className="text-d-white text-2xl font-semibold mb-7">{serverName}</h1>
      <button
        className="bg-d-purple text-d-white text-center p-2 rounded-sm w-full hover:brightness-90"
        onClick={async () => await acceptInvite(inviteCode)}
      >
        Accept Invite
      </button>
    </div>
  );
}

export { ValidInvitePage };
