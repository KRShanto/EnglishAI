import { create } from "zustand";

interface GrammarInputState {
  input: string;
  setInput: (input: string) => void;
}

export const useGrammarInput = create<GrammarInputState>((set) => ({
  input: "Shanto is my name",
  setInput: (input) => set({ input }),
}));
