"use client";

import PopButton from "../utils/PopButton";
import PopLink from "../utils/PopLink";
import { useSelectedLayoutSegment } from "next/navigation";
import { useGrammarInput } from "@/stores/grammar-input";
import { useRouter } from "next/navigation";
import { useGrammarChecker } from "@/stores/grammar-check";

export default function Options() {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const { input } = useGrammarInput();
  const { check } = useGrammarChecker();

  function checkGrammar() {
    // if the page is not "check", change it to "check"
    if (segment !== "check") {
      router.push("/grammar/check");
    }

    // fetch server
    check(input);
  }

  return (
    <>
      <div className="options">
        <PopButton className="option" onClick={checkGrammar}>
          Check your grammar
        </PopButton>
        <PopLink className="option" href="/grammar/improve">
          Improve your grammar
        </PopLink>
        <PopLink className="option" href="/grammar/alternative">
          Alternative sentences
        </PopLink>
      </div>
    </>
  );
}
