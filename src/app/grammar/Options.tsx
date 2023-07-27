"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useGrammarInput } from "@/stores/grammar-input";
import { useRouter } from "next/navigation";
import { useGrammarChecker } from "@/stores/grammar-check";
import Link from "next/link";

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
        <button className="option" onClick={checkGrammar}>
          Check your grammar
        </button>
        <Link className="option" href="/grammar/improve">
          Improve your grammar
        </Link>
        <Link className="option" href="/grammar/alternative">
          Alternative sentences
        </Link>
      </div>
    </>
  );
}
