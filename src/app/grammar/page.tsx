"use client";

import { CurrentStateType, ResultDataType } from "@/types/grammar";
import Options from "./Options";
import Result from "./Result";
import Scrollers from "../../components/Scrollers";
import { useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import LoadingAnimation from "@/../public/animations/loading.json";
import Title from "@/components/Title";

export default function Page() {
  const [input, setInput] = useState("Shanto want to had a Lamborghini.");
  const [currentState, setCurrentState] = useState<CurrentStateType>("Null");
  const [resultData, setResultData] = useState<ResultDataType>();

  console.log("state: ", currentState);

  return (
    <div className="grammar">
      <Title>Grammar Checker</Title>

      <div className="input-options">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
          placeholder="Enter your sentences here"
        />

        <Options
          input={input}
          setInput={setInput}
          setCurrentState={setCurrentState}
          setResultData={setResultData}
        />
      </div>

      <div>
        <Result currentState={currentState} resultData={resultData} />
        <Lottie
          animationData={LoadingAnimation}
          className={`loading ${currentState === "Fetching" && "show"}`}
          autoplay
          loop
        />
      </div>

      <Scrollers />
    </div>
  );
}
