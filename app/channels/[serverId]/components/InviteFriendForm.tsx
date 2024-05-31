"use client";
import { SvgXIcon } from "@/components/svgIcons/SvgXIcon";
import { useState } from "react";
import { FriendsListToInvite } from "./FriendsListToInvite";
import { InviteLink } from "./InviteLink";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";

type InviteFriendFormProps = {
  server: Server;
  friends: User[];
  inviteCode: string;
};

function InviteFriendForm({ server, friends, inviteCode }: InviteFriendFormProps) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const closeModal = () => {
    router.back();
  };
  const inviteLink = `${window.location.protocol}//${window.location.host}/${inviteCode}`;
  return (
    <>
      <header className="border-b border-b-d-gray-500 pb-7 p-4">
        <div className="flex justify-between">
          Invite friends to {server.name}
          <SvgXIcon
            width={28}
            height={28}
            className="fill-d-gray-150 hover:fill-d-gray-100 cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <SearchBar searchText={searchText} setSearchText={setSearchText} className="mt-3" />
      </header>
      <FriendsListToInvite friends={filteredFriends} inviteLink={inviteLink} />
      <InviteLink inviteLink={inviteLink} />
    </>
  );
}

export { InviteFriendForm };
