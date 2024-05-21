import Image from "next/image";

function WumpusNoBlockedFriends() {
  return (
    <div>
      <Image
        alt="Wumpus Image"
        src="/icons/wumpus-no-blocked-friends.svg"
        width={433}
        height={232}
      />
      <p className="text-d-gray-125 text-center mt-6">You can't unblock the Wumpus.</p>
    </div>
  );
}

export { WumpusNoBlockedFriends };
