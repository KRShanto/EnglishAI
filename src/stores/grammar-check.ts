import { openAICheckGrammar } from "@/actions/grammar-checker/openAICheckGrammar";
import { create } from "zustand";

interface GrammarChecker {
  // Collection of all results the user has fetched in the session
  results: GrammarCheckerResult[];
  // The current result the user is fetching
  currentResult: GrammarCheckerResult | null;
  // Whether the user is fetching or not
  isFetching: boolean;
  // Check the text
  check: (text: string) => void;
}

export const useGrammarChecker = create<GrammarChecker>((set, get) => ({
  // Collection of all results the user has fetched in the session
  results: [],
  // The current result the user is fetching
  currentResult: null,
  // Whether the user is fetching or not
  isFetching: false,
  // Check the text
  check: async (text: string) => {
    // if the text is empty then return
    if (text === "") {
      set((state) => ({ ...state, currentResult: null }));
      return;
    }

    const { results, currentResult } = get();

    // if the current result is the text then return
    if (currentResult && currentResult.text === text) return;

    // whether the text is already checked or not
    let isAlreadyChecked = false;

    // loop through the results and check if the text is already checked
    for (let i = 0; i < results.length; i++) {
      if (results[i].text === text) {
        // if the text is already checked, then set the current result to the matched result
        set((state) => ({ ...state, currentResult: results[i] }));
        // now break the loop and return from the function
        isAlreadyChecked = true;
        break;
      }
    }

    if (isAlreadyChecked) return;

    // if the text is not checked then check it

    // turn on the isFetching flag to show the loading indicator
    set((state) => ({ ...state, isFetching: true }));

    // check the text
    const data = await openAICheckGrammar(text);

    set((state) => ({
      ...state,
      results: [...state.results, data],
      currentResult: data,
      isFetching: false,
    }));
  },
}));
