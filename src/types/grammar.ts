export interface GrammarCheckerResult {
  text: string;
  result: {
    isCorrect: boolean;
    correctText: string;
    wrongText: {
      text: string;
      wrong: boolean;
    }[];
    description: string[];
  };
}

export interface GrammarAlternativeResult {
  text: string;
  alternative: string;
}

export interface GrammarImproverResult {
  text: string;
  improvedText: string;
}

export type CurrentStateType =
  | "Fetching"
  | "Null"
  | "Error"
  | "ResultCheck"
  | "ResultImprove"
  | "ResultAlternative";

export type ResultDataType =
  | GrammarCheckerResult
  | GrammarImproverResult
  | GrammarAlternativeResult;
