"use client";
import { useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { FriendsList } from "../../components/FriendsList";
import { WumpusNoFindFriends } from "../../components/WumpusNoFindFriends";

type PendingFriendsListProps = {
  users: Array<
    User & {
      request_direction: "Outgoing" | "Incoming";
    }
  >;
};

function PendingFriendsList({ users }: PendingFriendsListProps) {
  const [searchText, setSearchText] = useState("");

  const filredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {users.length > 0 && (
        <>
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <p className="mx-7 py-3 text-d-gray-125 text-xs font-semibold ">
            PENDING - {filredUsers.length}
          </p>
        </>
      )}
      <div className="flex-grow flex flex-col justify-center items-center gap-5 h-[calc(100%_-_48px)]">
        {filredUsers.length == 0 ? (
          <WumpusNoFindFriends />
        ) : (
          <FriendsList users={filredUsers} friendsViewState="pending" />
        )}
      </div>
    </>
  );
}

export { PendingFriendsList };
