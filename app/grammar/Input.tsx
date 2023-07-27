"use client";

import React from "react";
import { useGrammarInput } from "@/stores/grammar-input";

export default function Input() {
  const { input, setInput } = useGrammarInput();

  return (
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="input"
      placeholder="Enter your sentences here"
    />
  );
}
