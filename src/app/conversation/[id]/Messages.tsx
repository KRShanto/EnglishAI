import { useSocket } from "@/hooks/useSocket";
import { UserType, RoomType, MessageType } from "@/types/db";
import React, { useRef, useEffect, useState } from "react";

export default function Messages({
  room,
  user,
}: {
  room: RoomType;
  user: UserType;
}) {
  const [messages, setMessages] = useState<MessageType[]>(room.messages!);
  const socket = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket &&
      socket.on("message", ({ message, userId }) => {
        console.log("message came: ", message, userId);

        setMessages((prev) => [
          ...prev,
          {
            text: message,
            user: {
              id: userId,
            },
          },
        ]);
      });
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="messages">
      {messages!.map((message, index) => (
        <div
          className={`message ${
            message.user!.id === user.id ? "sent-msg" : "received-msg"
          }`}
          key={index}
        >
          <p className="text">{message.text}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
