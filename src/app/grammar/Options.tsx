"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useGrammarInput } from "@/stores/grammar-input";
import { useRouter } from "next/navigation";
import { useGrammarChecker } from "@/stores/grammar-check";
import Link from "next/link";
import { useGrammarImprover } from "@/stores/grammar-improve";
import { useGrammarAlternative } from "@/stores/grammar-alternative";

export default function Options() {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const { input } = useGrammarInput();
  const { check } = useGrammarChecker();
  const { improve } = useGrammarImprover();
  const { alternate } = useGrammarAlternative();

  function checkGrammar() {
    // if the page is not "check", change it to "check"
    if (segment !== "check") {
      router.push("/grammar/check");
    }

    // fetch server
    check(input);
  }

  function improveGrammar() {
    // if the page is not "improve", change it to "improve"
    if (segment !== "improve") {
      router.push("/grammar/improve");
    }

    // fetch server
    improve(input);
  }

  function alternativeGrammar() {
    // if the page is not "alternative", change it to "alternative"
    if (segment !== "alternative") {
      router.push("/grammar/alternative");
    }

    // fetch server
    alternate(input);
  }

  return (
    <>
      <div className="options">
        <button className="option" onClick={checkGrammar}>
          Check your grammar
        </button>
        <button className="option" onClick={improveGrammar}>
          Improve your grammar
        </button>
        <button className="option" onClick={alternativeGrammar}>
          Alternative sentences
        </button>
      </div>
    </>
  );
}
