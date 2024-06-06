import Image from "next/image";

type UserAvatarProps = {
  isOnline: boolean;
  size: "small" | "big";
  src: string;
};
function UserAvatar({ isOnline, size, src }: UserAvatarProps) {
  return (
    <div className={`${size === "big" ? "size-8" : "size-6"} cursor-pointer relative`}>
      <Image src={src} alt="user avatar" fill />
      {isOnline ? (
        <div
          className={`${
            size === "big" ? "size-4" : "size-3"
          } absolute -translate-x-[-120%] -translate-y-[-120%] bg-d-gray-400 rounded-full grid place-items-center`}
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
            size === "big" ? "size-4" : "size-3"
          } absolute -translate-x-[-120%] -translate-y-[-120%] bg-d-gray-400 rounded-full  grid place-items-center`}
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
