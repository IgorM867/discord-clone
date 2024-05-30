"use client";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FriendsList } from "./FriendsList";
import { WumpusNoFindFriends } from "./WumpusNoFindFriends";
import { FriendsHeader } from "./FriendsHeader";
import { AddFriendPage } from "./AddFriendPage";

export type FriendsViewState = "online" | "all" | "blocked" | "pending" | "addfriends";

type FriendsPageProps = {
  userRelationships: Array<{
    user: User;
    status: "friend" | "pending" | "blocked";
    request_direction: "Outgoing" | "Incoming" | null;
  }>;
};

function FriendsDashboard({ userRelationships }: FriendsPageProps) {
  const [friendsViewState, setFriendsViewState] = useState<FriendsViewState>("online");
  const [searchText, setSearchText] = useState("");

  const filteredRelationships = userRelationships.filter(
    (relation) =>
      relation.status == friendsViewState ||
      (friendsViewState == "all" && relation.status == "friend") ||
      (friendsViewState == "online" &&
        relation.status == "friend" &&
        relation.user.status === "Online")
  );

  const filteredUsers = filteredRelationships
    .map((relation) => {
      if (relation.status == "pending") {
        return {
          ...relation.user,
          request_direction: relation.request_direction,
        };
      }
      return relation.user;
    })
    .filter((user) => user.username.toLowerCase().includes(searchText.toLowerCase()));

  const changeViewState = (state: FriendsViewState) => {
    setFriendsViewState(state);
  };

  if (friendsViewState == "addfriends") {
    return <AddFriendPage changeViewState={changeViewState} />;
  }

  return (
    <div className="w-full max-h-screen h-screen flex flex-col">
      <FriendsHeader friendsViewState={friendsViewState} changeViewState={changeViewState} />
      {filteredRelationships.length > 0 && (
        <>
          <SearchBar searchText={searchText} setSearchText={setSearchText} className="mx-7 my-3" />
          <p className="mx-7 py-3 text-d-gray-125 text-xs font-semibold ">
            {getLabel(friendsViewState)} - {filteredUsers.length}
          </p>
        </>
      )}
      <div className="flex-grow flex flex-col justify-center items-center gap-5 h-[calc(100%_-_48px)]">
        {filteredUsers.length == 0 ? (
          <WumpusNoFindFriends />
        ) : (
          <FriendsList
            users={filteredUsers}
            friendsViewState={friendsViewState}
            changeViewState={changeViewState}
          />
        )}
      </div>
    </div>
  );
}

export { FriendsDashboard };

function getLabel(friendsViewState: FriendsViewState) {
  switch (friendsViewState) {
    case "all":
      return "ALL FRIENDS";
    case "online":
      return "ONLINE";
    case "blocked":
      return "BLOCKED";
    case "pending":
      return "PENDING";
    default:
      return "";
  }
}
