"use client";

import LoadingAnimation from "@/../public/loading.json";
import Lottie from "lottie-react";
import CopyBtn from "@/components/CopyBtn";
import { useGrammarImprover } from "@/stores/grammar-improve";
import { useGrammarAlternative } from "@/stores/grammar-alternative";

export default function Page() {
  const { isFetching, currentResult } = useGrammarAlternative();

  if (isFetching)
    return (
      <Lottie
        animationData={LoadingAnimation}
        className="loading"
        loop
        autoplay
      />
    );

  if (!currentResult)
    return (
      <p className="description">
        Enter a sentence in the input box above and click any of the buttons.
      </p>
    );

  return (
    <div className="checking-result">
      <h2 className="heading">Result</h2>

      <div className="sentence correct">
        <p className="title">Alternative Text</p>

        <div className="text_icon">
          <p className="text">{currentResult.alternative}</p>

          <CopyBtn text={currentResult.alternative} className="icon" />
        </div>
      </div>
    </div>
  );
}
