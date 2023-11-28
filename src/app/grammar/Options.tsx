"use client";

import { openAIAlternativeGrammar } from "@/actions/grammar-alternative/openAIAlternativeGrammar";
import { openAICheckGrammar } from "@/actions/grammar-checker/openAICheckGrammar";
import { openAIImproveGrammar } from "@/actions/grammar-improver/openAIImproveGrammar";
import { CurrentStateType, ResultDataType } from "@/types/grammar";

export default function CheckButton({
  input,
  setInput,
  setCurrentState,
  setResultData,
}: {
  input: string;
  setInput: (input: string) => void;
  setCurrentState: (state: CurrentStateType) => void;
  setResultData: (data: ResultDataType) => void;
}) {
  // handler function for calling openAI api
  const openAIcall = async (type: "Check" | "Improve" | "Alternative") => {
    if (input === "") return;

    setCurrentState("Fetching");

    const res =
      type === "Check"
        ? await openAICheckGrammar(input)
        : type === "Improve"
        ? await openAIImproveGrammar(input)
        : await openAIAlternativeGrammar(input);

    if (res.error) {
      setCurrentState("Error");
      return;
    }

    setResultData(res);
    setCurrentState(`Result${type}`);
    setInput("");
  };

  return (
    <div className="options">
      <button className="option" onClick={() => openAIcall("Check")}>
        Check your grammar
      </button>

      <button className="option" onClick={() => openAIcall("Improve")}>
        Improve your grammar
      </button>

      <button className="option" onClick={() => openAIcall("Alternative")}>
        Alternative sentences
      </button>
    </div>
  );
}
