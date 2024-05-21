import Image from "next/image";

function WumpusNoFriends() {
  return (
    <div>
      <Image alt="Wumpus Image" src="/icons/wumpus-no-friends.svg" width={376} height={162} />
      <p className="text-d-gray-125 mt-6">
        Wumpus is waiting on friends. You don't have to, though!
      </p>
    </div>
  );
}

export { WumpusNoFriends };
