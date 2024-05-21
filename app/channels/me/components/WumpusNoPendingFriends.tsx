import Image from "next/image";

function WumpusNoPendingFriends() {
  return (
    <div>
      <Image
        alt="Wumpus Image"
        src="/icons/wumpus-no-pending-friends.svg"
        width={415}
        height={200}
      />
      <p className="text-d-gray-125 text-center mt-6">
        There are no pending friend requests. Here's Wumpus for now.
      </p>
    </div>
  );
}

export { WumpusNoPendingFriends };
