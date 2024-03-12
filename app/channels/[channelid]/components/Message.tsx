import Image from "next/image";

type MessageProps = {
  message: Message & { creatorname: string };
  withUser?: boolean;
};

function Message({ message, withUser }: MessageProps) {
  return (
    <li className="hover:bg-d-gray-450 pl-5 font-normal flex last:mb-6 group py-1">
      {withUser ? (
        <>
          <div className="w-12">
            <div className="size-10 bg-d-red rounded-full grid place-items-center p-1 cursor-pointer">
              <Image src="/logos/icon_clyde_white.svg" alt="avatar" width={24} height={24} />
            </div>
          </div>
          <div>
            <div className="text-d-gray-100 font-medium">
              <span className="hover:underline cursor-pointer mr-2">{message.creatorname}</span>

              <span className="text-d-gray-150 text-xs">{getDateAndTime(message.createdat)}</span>
            </div>
            <div className="text-d-gray-100 ">{message.content}</div>
          </div>
        </>
      ) : (
        <>
          <span className="invisible flex text-[10px] text-d-gray-150 w-12 h-full items-center group-hover:visible">
            {getTime(message.createdat)}
          </span>

          <div className="text-d-gray-100">{message.content}</div>
        </>
      )}
    </li>
  );
}

export { Message };

function getTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours >= 10 ? hours : "0" + hours}:${minutes >= 10 ? minutes : "0" + minutes}`;
}

function getDateAndTime(date: Date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day >= 10 ? day : "0" + day}/${month >= 10 ? month : "0" + month}/${year} ${getTime(
    date
  )}`;
}
