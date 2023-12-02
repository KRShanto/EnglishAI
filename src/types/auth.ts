import { Session } from "next-auth";

export interface AuthSession extends Session {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
  };
}
