"use client";

import DoneAnimation from "@/../public/animations/done.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi";

export default function CopyBtn({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  function onClickHandler() {
    navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <div className={className || ""} onClick={onClickHandler}>
      {copied ? (
        <Lottie
          animationData={DoneAnimation}
          className="done"
          autoplay
          style={{ width: 100, height: 100 }}
        />
      ) : (
        <FiCopy />
      )}
    </div>
  );
}
