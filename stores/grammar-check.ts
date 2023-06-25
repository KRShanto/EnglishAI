import { create } from "zustand";

interface GrammarChecker {
  results: GrammarCheckerResult[];
  currentResult: GrammarCheckerResult | null;
  isChecking: boolean;
  check: (text: string) => void;
}

export const useGrammarChecker = create<GrammarChecker>((set, get) => ({
  results: [],
  currentResult: null,
  isChecking: false,
  check: async (text: string) => {
    // First check if the text is empty
    // Then check if the current result is the text
    // Then check if the text is already being checked

    console.log("Text: ", text);

    if (text === "") {
      console.log("text is empty");
      set((state) => ({ ...state, currentResult: null }));
      return;
    }

    const { results, currentResult } = get();

    if (currentResult && currentResult.text === text) {
      return;
    }

    // now loop over the results and check if the text is already checked

    results.forEach((result) => {
      if (result.text === text) {
        set((state) => ({ ...state, currentResult: result }));
        return;
      }
    });

    // if the text is not checked then check it
    set((state) => ({ ...state, isChecking: true }));

    const res = await fetch("/api/grammar-check", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    console.log(data);

    set((state) => ({
      ...state,
      results: [...state.results, data],
      currentResult: data,
      isChecking: false,
    }));
  },
}));
