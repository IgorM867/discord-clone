import Image from "next/image";

function UserAvatar({ isOnline }: { isOnline: boolean }) {
  return (
    <div className="size-8 bg-d-red rounded-full grid place-items-center p-1 cursor-pointer">
      <Image src="/logos/icon_clyde_white.svg" alt="avatar" width={20} height={20} />
      {isOnline ? (
        <div className="absolute bg-d-gray-400 rounded-full size-4 -translate-x-[-70%] -translate-y-[-70%] grid place-items-center">
          <div className="rounded-full size-[10px] bg-d-green grid place-items-center">
            <div className="rounded-full size-[6px] bg-d-green"></div>
          </div>
        </div>
      ) : (
        <div className="absolute bg-d-gray-400 rounded-full size-4 -translate-x-[-70%] -translate-y-[-70%] grid place-items-center">
          <div className="rounded-full size-[10px] bg-d-gray-150 grid place-items-center">
            <div className="rounded-full size-[6px] bg-d-gray-400"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export { UserAvatar };
