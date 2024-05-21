import Image from "next/image";

function WumpusNoOnlineFriends() {
  return (
    <div>
      <Image
        alt="Wumpus Image"
        src="/icons/wumpus-no-online-friends.svg"
        width={421}
        height={218}
      />
      <p className="text-d-gray-125 text-center mt-6">No one's around to play with Wumpus.</p>
    </div>
  );
}

export { WumpusNoOnlineFriends };
