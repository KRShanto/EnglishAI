"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import EmailSendingAnimation from "@/../public/animations/email-sending.json";

export default function Loader() {
  return (
    <div className="forgot-loading">
      <Lottie
        className="animation"
        animationData={EmailSendingAnimation}
        loop={true}
        autoplay={true}
      />

      <h1 className="title">Sending reset link...</h1>
    </div>
  );
}
