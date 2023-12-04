"use client";

import { useEffect, useState } from "react";
import { createResetToken } from "./createResetToken";
import SentEmail from "./SentEmail";
import { useFormErrorStore } from "@/stores/form-error";
import Input from "@/components/Input";
import Submit from "@/components/Submit";
import { FormErrorType } from "@/types/form-errror";
import FormError from "@/components/FormError";

export default function ForgotForm({
  error,
}: {
  error: FormErrorType | undefined;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [resendTime, setResendTime] = useState<Date | undefined>(undefined);

  const { showError } = useFormErrorStore();

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  const handler = async (data: FormData) => {
    const email = data.get("email") as string;
    const res = await createResetToken(email);

    if (res.error) {
      showError(res.error);
      return;
    }

    setEmail(email);
    setSent(true);
    setResendTime(res.data!.resendTime);
  };

  if (sent) {
    return <SentEmail email={email} resendTime={resendTime!} />;
  }

  return (
    <form className="form-style">
      <h1 className="title">Forgot Password</h1>

      <FormError />

      <Input
        label="Email address"
        type="email"
        name="email"
        required
        autoFocus
      />

      <Submit formAction={handler}>Reset</Submit>
    </form>
  );
}
