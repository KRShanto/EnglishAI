"use client";

import { useSocket } from "@/hooks/useSocket";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function Input({ roomId }: { roomId: string }) {
  const [input, setInput] = useState("");
  const socket = useSocket();

  const handler = () => {
    if (!input) return;

    socket &&
      socket.emit("send-message", {
        message: input,
        roomId,
      });

    setInput("");
  };

  return (
    <form className="form">
      <input
        type="text"
        placeholder="Type a message..."
        className="input"
        autoComplete="off"
        name="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />

      <button type="submit" formAction={handler}>
        <IoSend />
      </button>
    </form>
  );
}
