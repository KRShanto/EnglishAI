"use client";

import { RoomType, UserType } from "@/types/db";
import Header from "./Header";
import Input from "./Input";
import Messages from "./Messages";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";

export default function Conversation({
  otherUser,
  room,
  user,
}: {
  otherUser: UserType;
  room: RoomType;
  user: UserType;
}) {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.emit("setup", {
        id: user.id!,
      });

      socket.emit("join-room", {
        roomId: room.id!,
      });
    }
  }, [socket]);

  return (
    <>
      <Header otherUser={otherUser} />
      <Messages room={room} user={user} />
      <Input roomId={room.id!} />
    </>
  );
}
