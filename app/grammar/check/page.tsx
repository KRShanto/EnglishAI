"use client";

import { useGrammarChecker } from "@/stores/grammar-check";
import Lottie from "lottie-react";
import LoadingAnimation from "@/public/loading.json";
import CopyBtn from "@/components/CopyBtn";
import { Roboto } from "next/font/google";

const inter = Roboto({
  subsets: ["latin-ext"],
  weight: "400",
});

export default function Checker() {
  const { isChecking, currentResult } = useGrammarChecker();

  if (isChecking)
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
        Enter a sentence in the input box above and click the button again to
        check it.
      </p>
    );

  return (
    <div className="checking-result">
      <h2 className="heading">Result</h2>

      {currentResult.result.isCorrect === true ? (
        <h2 className="success">The sentence is correct.</h2>
      ) : (
        <>
          <div className="sentence wrong">
            <p className="title">Wrong</p>
            <div className="text_icon">
              <p className="text">
                {currentResult.result.wrongText.map((text, index) => {
                  if (text.wrong)
                    return (
                      <span key={index} className="wrong-text">
                        {text.text}{" "}
                      </span>
                    );

                  return <span key={index}>{text.text} </span>;
                })}
              </p>

              <CopyBtn
                text={currentResult.result.wrongText
                  .map((text) => text.text)
                  .join(" ")}
                className="icon"
              />
            </div>
          </div>

          <div className="sentence correct">
            <p className="title">Correct</p>
            <div className="text_icon">
              <p className="text">{currentResult.result.correctText}</p>

              <CopyBtn
                text={currentResult.result.correctText}
                className="icon"
              />
            </div>
          </div>

          <ol className="description">
            {currentResult.result.description.map((text, index) => (
              <li className="text" key={index} style={inter.style}>
                {text}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
