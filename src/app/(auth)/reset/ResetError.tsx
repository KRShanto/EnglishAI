"use client";

import Lottie from "lottie-react";
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
