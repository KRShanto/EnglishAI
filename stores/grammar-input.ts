import { create } from "zustand";

interface GrammarInputState {
  input: string;
  setInput: (input: string) => void;
}

export const useGrammarInput = create<GrammarInputState>((set) => ({
  input: "",
  setInput: (input) => set({ input }),
}));
