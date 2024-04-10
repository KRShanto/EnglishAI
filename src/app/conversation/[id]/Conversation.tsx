"use client";

import { RoomType, UserType } from "@/types/db";
import Header from "./Header";
import Input from "./Input";
import Messages from "./Messages";

export default function Conversation({
  otherUser,
  room,
  user,
}: {
  otherUser: UserType;
  room: RoomType;
  user: UserType;
}) {
  return (
    <>
      <Header otherUser={otherUser} />
      <Messages room={room} user={user} />
      <Input roomId={room.id!} />
    </>
  );
}
