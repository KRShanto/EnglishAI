// NOTE: these properties are optional for prisma's select statement. But they aren't optional in the db.

import { $Enums, Prisma } from "@prisma/client";
import { GrammarCheckerResult } from "./grammar";

export interface UserType {
  id?: string;
  name?: string;
  country?: string;
  username?: string;
  email?: string;
  image?: string;
  createdAt?: Date;
}

export interface RoomType {
  id?: string;
  users?: UserType[];
  messages?: MessageType[];
  type?: $Enums.RoomType;
  createdAt?: Date;
}

export interface MessageType {
  id?: string;
  createdAt?: Date;
  roomId?: string;
  userId?: string;
  user?: UserType;
  msg?: Prisma.JsonValue;
}

export interface ChatMessage {
  id: string;
  openAIstatus: "fetching" | "done";
  message: GrammarCheckerResult;
}
