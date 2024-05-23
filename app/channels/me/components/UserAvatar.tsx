import Image from "next/image";

function UserAvatar({ isOnline, size }: { isOnline: boolean; size: "small" | "big" }) {
  return (
    <div
      className={`${
        size === "big" ? "size-8" : "size-6"
      } bg-d-red rounded-full grid place-items-center p-1 cursor-pointer`}
    >
      <Image src="/logos/icon_clyde_white.svg" alt="avatar" width={20} height={20} />
      {isOnline ? (
        <div
          className={`${
            size === "big"
              ? "-translate-x-[-70%] -translate-y-[-70%]"
              : "-translate-x-[-50%] -translate-y-[-50%]"
          } absolute bg-d-gray-400 rounded-full size-4  grid place-items-center`}
        >
          <div
            className={`${
              size === "big" ? "size-[10px]" : "size-2"
            } rounded-full bg-d-green grid place-items-center`}
          >
            <div
              className={`${
                size === "big" ? "size-[6px]" : "size-1"
              } rounded-full size-[6px] bg-d-green`}
            ></div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            size === "big"
              ? "-translate-x-[-70%] -translate-y-[-70%] size-4"
              : "-translate-x-[-65%] -translate-y-[-65%] size-3"
          } absolute bg-d-gray-400 rounded-full  grid place-items-center`}
        >
          <div
            className={`${
              size === "big" ? "size-[10px]" : "size-2"
            } rounded-full bg-d-gray-150 grid place-items-center`}
          >
            <div
              className={`${
                size === "big" ? "size-[6px]" : "size-1"
              } rounded-full size-[6px] bg-d-gray-400`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export { UserAvatar };
