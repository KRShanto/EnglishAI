import { openAICheckGrammar } from "@/actions/grammar-checker/openAICheckGrammar";
import { openAIImproveGrammar } from "@/actions/grammar-improver/openAIImproveGrammar";
import { create } from "zustand";

interface GrammarImprover {
  // Collection of all results the user has checked in the session
  results: GrammarImproverResult[];
  // The current result the user is checking
  currentResult: GrammarImproverResult | null;
  // Whether the user is checking or not
  isFetching: boolean;
  // Improve the text
  improve: (text: string) => void;
}

export const useGrammarImprover = create<GrammarImprover>((set, get) => ({
  // Collection of all results the user has checked in the session
  results: [],
  // The current result the user is checking
  currentResult: null,
  // Whether the user is checking or not
  isFetching: false,
  // Improve the text
  improve: async (text: string) => {
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
    let isAlreadyImproved = false;

    // loop through all the results to check if the text is already improved
    for (const result of results) {
      if (result.text === text) {
        // if the text is already improved, set the current result to the result
        set((state) => ({
          ...state,
          currentResult: result,
        }));
        // now break the loop and return
        isAlreadyImproved = true;
        break;
      }
    }

    // if the text is already improved, return
    if (isAlreadyImproved) return;

    // Now improve the text

    // turn on the fetching flag to show the loading indicator
    set((state) => ({
      ...state,
      isFetching: true,
    }));

    // improve the text
    const data = await openAIImproveGrammar(text);

    set((state) => ({
      ...state,
      isFetching: false,
      results: [...state.results, data],
      currentResult: data,
    }));
  },
}));
