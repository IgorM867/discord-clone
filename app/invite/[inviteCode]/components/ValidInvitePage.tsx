"use client";
import { acceptInvite } from "@/lib/invitiesToServerActions";
import Image from "next/image";

type ValidInvitePagePros = {
  inviteCode: string;
  inviter: User;
  serverName: string;
};

function ValidInvitePage({ inviteCode, inviter, serverName }: ValidInvitePagePros) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px]  bg-d-gray-400 flex flex-col items-center p-5 rounded">
      <Image src={inviter.image} alt="user avatar" width={80} height={80} />
      <p className="text-d-gray-125 text-center mt-5">{inviter.username} invited you to join</p>
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
