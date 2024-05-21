"use client";
import { useState } from "react";
import { FriendsList } from "../../components/FriendsList";
import { SearchBar } from "../../components/SearchBar";
import { WumpusNoFindFriends } from "../../components/WumpusNoFindFriends";

function AllFriendsList({ users }: { users: User[] }) {
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
            ALL FRIENDS - {filredUsers.length}
          </p>
        </>
      )}
      <div className="flex-grow flex flex-col justify-center items-center gap-5 h-[calc(100%_-_48px)]">
        {filredUsers.length == 0 ? (
          <WumpusNoFindFriends />
        ) : (
          <FriendsList users={filredUsers} friendsViewState="all" />
        )}
      </div>
    </>
  );
}

export { AllFriendsList };
