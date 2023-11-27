"use client";

import LoadingAnimation from "@/../public/loading.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import CopyBtn from "@/components/CopyBtn";
import { useGrammarImprover } from "@/stores/grammar-improve";

export default function Page() {
  const { isFetching, currentResult } = useGrammarImprover();

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
        <p className="title">Improved Text</p>

        <div className="text_icon">
          <p className="text">{currentResult.improvedText}</p>

          <CopyBtn text={currentResult.improvedText} className="icon" />
        </div>
      </div>
    </div>
  );
}
