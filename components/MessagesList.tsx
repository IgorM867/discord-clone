import { Fragment } from "react";
import { ChannelWelcomeMessage } from "./ChannelWelcomeMessage";
import { Message } from "./Message";
import { MessagesDivider } from "./MessagesDivider";
import { getMessages } from "@/lib/messagesActions";

type MessagesListProps = {
  chatId: string;
  chatType: "server_chat" | "direct_chat";
  chatName: string;
};

async function MessagesList({ chatId, chatType, chatName }: MessagesListProps) {
  const messages = await getMessages(chatId, chatType);

  let lastDate: Date | null = null;
  let lastUserId: string | null = null;

  const message = chatType === "server_chat" ? `#${chatName}` : chatName;

  return (
    <ol className="overflow-y-scroll  h-[calc(100%_-_64px)] flex flex-col scrollbar ">
      <ChannelWelcomeMessage message={message} chatType={chatType} />
      {messages.map((message) => {
        const isNewDay = checkIsNewDay(lastDate, message.created_at);
        const isNewUser = lastUserId !== message.creator_id;
        if (isNewDay) lastDate = message.created_at;
        if (isNewUser) lastUserId = message.creator_id;

        return (
          <Fragment key={message.id}>
            {isNewDay && <MessagesDivider text={getDate(message.created_at)} />}
            <Message message={message} withUser={isNewUser || isNewDay} />
          </Fragment>
        );
      })}
    </ol>
  );
}

export { MessagesList };
function getDate(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function checkIsNewDay(date1: Date | null, date2: Date) {
  if (!date1) return true;
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();

  if (year1 < year2) return true;
  if (year1 > year2) return false;

  const month1 = date1.getMonth();
  const month2 = date2.getMonth();

  if (month1 < month2) return true;
  if (month1 > month2) return false;

  const day1 = date1.getDate();
  const day2 = date2.getDate();

  if (day1 < day2) return true;

  return false;
}
