import { WumpusNoOnlineFriends } from "./WumpusNoOnlineFriends";

function OnlineFriendsList() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center gap-5">
      <WumpusNoOnlineFriends />
    </div>
  );
}

export { OnlineFriendsList };
