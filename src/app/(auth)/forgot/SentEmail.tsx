"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import EmailSentAnimation from "@/../public/animations/email-sent.json";

export default function SentEmail({
  email,
  resendTime,
}: {
  email: string;
  resendTime: Date;
}) {
  const [resendIn, setResendIn] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setResendIn(moment(resendTime).diff(moment(), "seconds"));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTime]);

  return (
    <div className="sent">
      <Lottie
        className="animation"
        animationData={EmailSentAnimation}
        loop={true}
        autoplay={true}
      />

      <h1 className="title">Reset link sent</h1>
      <p className="message">
        We have sent a reset link to <span className="highlight">{email}</span>.
        Please check your inbox.
      </p>

      {resendIn > 0 ? (
        <p className="message">
          To resend the email, please wait for{" "}
          <span className="highlight">{resendIn} seconds</span>.
        </p>
      ) : (
        <Link href={`/forgot?email=${email}`} className="button">
          Resend Email
        </Link>
      )}
    </div>
  );
}
