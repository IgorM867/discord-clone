import { getUserById } from "@/lib/userActions";
import Image from "next/image";

type MessageProps = {
  message: (Message | DirectMessage) & { creatorname: string };
  withUser?: boolean;
};

async function Message({ message, withUser }: MessageProps) {
  const user = await getUserById(message.creator_id);
  if (!user) return;

  return (
    <li className="hover:bg-d-gray-450 pl-5 font-normal flex last:mb-6 group py-1">
      {withUser ? (
        <>
          <div className="w-12">
            <Image src={user.image} alt="user avatar" width={40} height={40} />
          </div>
          <div>
            <div className="text-d-gray-100 font-medium">
              <span className="hover:underline cursor-pointer mr-2">{message.creatorname}</span>

              <span className="text-d-gray-150 text-xs">{getDateAndTime(message.created_at)}</span>
            </div>
            <div className="text-d-gray-100 ">{message.content}</div>
          </div>
        </>
      ) : (
        <>
          <span className="invisible flex text-[10px] text-d-gray-150 w-12 h-full items-center group-hover:visible">
            {getTime(message.created_at)}
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
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day >= 10 ? day : "0" + day}/${month >= 10 ? month : "0" + month}/${year} ${getTime(
    date
  )}`;
}
