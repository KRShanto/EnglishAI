import React from "react";
import { createResetToken } from "./createResetToken";
import SentEmail from "./SentEmail";
import ForgotForm from "./ForgotForm";

// Forgot password page
export default async function Page({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const { email } = searchParams;
  let error;

  // If email is provided, create a reset token and send an email
  if (email) {
    const res = await createResetToken(email);

    if (res.error) {
      error = res.error;
    } else {
      return <SentEmail email={email} resendTime={res.data!.resendTime} />;
    }
  }

  // Else show the forgot password form
  return <ForgotForm error={error} />;
}
