interface User {
  id: string;
  username: string;
  email: string;
  image: string;
  status: "Online" | "Offline";
  password?: string | null;
}
interface Server {
  id: string;
  name: string;
}
interface Channel {
  id: string;
  name: string;
}
interface DirectChat {
  id: string;
  user_id1: string;
  user_id2: string;
}
interface Message {
  id: string;
  creator_id: string;
  content: string;
  created_at: Date;
  channel_id: string;
}
interface DirectMessage {
  id: string;
  creator_id: string;
  content: string;
  created_at: Date;
  chat_id: string;
}
interface ServerInvitation {
  id: string;
  invite_code: string;
  inviter_id: string;
  server_id: string;
  uses: number;
  expires_time: Date;
}
