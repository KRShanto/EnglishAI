import { UserType, RoomType, ChatMessage } from "@/types/db";
import React, { useRef, useEffect, useState } from "react";
import Message from "./Message";
import { pusher } from "@/lib/pusher/client";

export default function Messages({
  room,
  user,
}: {
  room: RoomType;
  user: UserType;
}) {
  const [messages, setMessages] = useState<any>(room.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const channel = pusher
      .subscribe(room.id as string)
      .bind("message", (data: any) => {
        const { msg, userId } = data;
        // add the message to the messages array
        setMessages((prev: any) => [...prev, { msg, user: { id: userId } }]);
      })
      .bind("openai-response", ({ msg }: { msg: ChatMessage }) => {
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

    return () => {
      channel.unbind();
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="messages">
      {messages!.map((message: any, index: number) => (
        <Message
          msg={message.msg}
          key={index}
          otherUser={message.user.id !== user.id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
