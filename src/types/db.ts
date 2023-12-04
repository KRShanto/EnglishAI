// NOTE: these properties are optional for prisma's select statement. But they aren't optional in the db.

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
  type?: RoomType;
  createdAt?: Date;
}

export interface MessageType {
  id?: string;
  createdAt?: Date;
  roomId?: string;
  userId?: string;
  text?: string;
  user?: UserType;
}

export enum RoomTypeEnum {
  INDIVIDUAL = "INDIVIDUAL",
  GROUP = "GROUP",
}
