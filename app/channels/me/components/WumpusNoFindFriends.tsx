import Image from "next/image";

function WumpusNoFindFriends() {
  return (
    <div>
      <Image
        alt="Wumpus Image"
        src="/icons/wumpus-no-online-friends.svg"
        width={421}
        height={218}
      />
      <p className="text-d-gray-125 text-center mt-6">
        Wumpus looked but couldn't find anyone with that name.
      </p>
    </div>
  );
}

export { WumpusNoFindFriends };
