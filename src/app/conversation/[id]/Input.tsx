"use client";

import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function Input({ roomId }: { roomId: string }) {
  const [input, setInput] = useState("");

  const handler = async () => {
    if (!input) return;

    const res = await fetch("/api/pusher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input, roomId }),
    });

    const json = await res.json();

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
