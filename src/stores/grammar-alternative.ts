import { openAIAlternativeGrammar } from "@/actions/grammar-alternative/openAIAlternativeGrammar";
import { create } from "zustand";

interface GrammarAlternative {
  // Collection of all results the user has fetched in the session
  results: GrammarAlternativeResult[];
  // The current result the user is fetching
  currentResult: GrammarAlternativeResult | null;
  // Whether the user is fetching or not
  isFetching: boolean;
  // Improve the text
  alternate: (text: string) => void;
}

export const useGrammarAlternative = create<GrammarAlternative>((set, get) => ({
  // Collection of all results the user has fetched in the session
  results: [],
  // The current result the user is fetching
  currentResult: null,
  // Whether the user is fetching or not
  isFetching: false,
  // Improve the text
  alternate: async (text: string) => {
    // if the text is empty, return
    if (text === "") {
      set((state) => ({
        ...state,
        currentResult: null,
      }));
      return;
    }

    const { results, currentResult } = get();

    // if the text is the same as the current result, return
    if (currentResult && currentResult.text === text) {
      return;
    }

    // whether the text is already improved or not
    let isAlreadyAlternated = false;

    // loop through all the results to check if the text is already improved
    for (const result of results) {
      if (result.text === text) {
        // if the text is already improved, set the current result to the result
        set((state) => ({
          ...state,
          currentResult: result,
        }));
        // now break the loop and return
        isAlreadyAlternated = true;
        break;
      }
    }

    // if the text is already improved, return
    if (isAlreadyAlternated) return;

    // Now improve the text

    // turn on the fetching flag to show the loading indicator
    set((state) => ({
      ...state,
      isFetching: true,
    }));

    // improve the text
    const data = await openAIAlternativeGrammar(text);

    set((state) => ({
      ...state,
      isFetching: false,
      results: [...state.results, data],
      currentResult: data,
    }));
  },
}));
