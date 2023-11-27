"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import MoodOff from "@/../public/animations/mood-off.json";

export default function ResetError({ message }: { message: string }) {
  return (
    <div className="reset-error">
      <Lottie
        className="animation"
        animationData={MoodOff}
        loop={true}
        autoplay={true}
      />

      <h1 className="title">{message}</h1>
    </div>
  );
}
