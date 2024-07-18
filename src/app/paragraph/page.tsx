"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import LoadingAnimation from "@/../public/animations/loading.json";
import Result from "./Result";
import Title from "@/components/Title";

export default function Page() {
  // TODO: temporary
  const [input, setInput] = useState("A cow");
  const [para, setPara] = useState(3);

  const [result, setResult] = useState<"Fetching" | null | string[]>(null);

  return (
    <div className="paragraph">
      <Title>Paragraph Generator</Title>

      <div className="input-options">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
          placeholder="Enter the topic here"
        />

        <div className="options">
          <div className="option-para">
            <button onClick={() => setPara(para + 1)}>+</button>
            <p>
              <strong>{para}</strong> {para > 1 ? "Paras" : "para"}
            </p>
            <button onClick={() => para !== 1 && setPara(para - 1)}>-</button>
          </div>

          <button className="option">Generate</button>
        </div>
      </div>

      <div className="result">
        <Result result={result} />
        <Lottie
          animationData={LoadingAnimation}
          className={`loading ${result === "Fetching" && "show"}`}
          autoplay
          loop
        />
      </div>
    </div>
  );
}
