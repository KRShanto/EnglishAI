import { useSocket } from "@/hooks/useSocket";
import { UserType, RoomType, MessageType, ChatMessage } from "@/types/db";
import React, { useRef, useEffect, useState } from "react";
import Message from "./Message";

export default function Messages({
  room,
  user,
}: {
  room: RoomType;
  user: UserType;
}) {
  const [messages, setMessages] = useState<any>(room.messages);
  const socket = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket &&
      socket.on("message", ({ msg, userId }) => {
        // add the message to the messages array
        setMessages((prev: any) => [...prev, { msg, user: { id: userId } }]);
      });

    // response from openai api (grammar correction)
    socket?.on("openai-response", ({ msg }) => {
      // update the message with the new grammar
      // find the message with the same id and update it
      setMessages((prev: any) => {
        const newMessages = prev.map((message: any) => {
          if (message.msg.id === msg.id) {
            return { ...message, msg };
          }

          return message;
        });

        return newMessages;
      });
    });
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="messages">
      {messages!.map((message: any, index: number) => (
        <Message
          // @ts-ignore
          msg={message.msg}
          key={index}
          otherUser={message.user.id !== user.id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
