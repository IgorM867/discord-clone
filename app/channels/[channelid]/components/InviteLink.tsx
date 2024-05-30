"use client";
import { CopyButton } from "./CopyButton";

function InviteLink({ inviteLink }: { inviteLink: string }) {
  return (
    <div className="p-4">
      <p className="text-xs text-d-gray-125 font-bold mb-2">
        OR SEND A SERVER INVITE LINK TO A FRIEND
      </p>
      <div className="bg-d-gray-550 rounded-sm p-1 px-2 flex justify-between">
        <input className="bg-transparent flex-grow outline-none" readOnly value={inviteLink} />
        <CopyButton copyText={inviteLink} />
      </div>
    </div>
  );
}

export { InviteLink };
