interface User {
  id: string;
  username: string;
  email: string;
  image: string | null;
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
