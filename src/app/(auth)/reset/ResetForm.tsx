"use client";

import { useFormErrorStore } from "@/stores/form-error";
import { signIn } from "next-auth/react";
import Input from "@/components/Input";
import Submit from "@/components/Submit";
import FormError from "@/components/FormError";
import { resetPassword } from "./resetPassword";

export default function ResetForm({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const { showError } = useFormErrorStore();

  const handler = async (data: FormData) => {
    const password = data.get("password") as string;
    const passwordConfirmation = data.get("passwordConfirmation") as string;

    if (password !== passwordConfirmation) {
      showError({ message: "Passwords do not match", field: "all" });
      return;
    }

    const res = await resetPassword({ newPassword: password, userId });

    if (res.error) {
      showError({ message: res.error, field: "all" });
      return;
    }

    // login the user
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <form className="form-style">
      <h1 className="title">Reset Password</h1>

      <FormError />

      <Input
        label="Password"
        name="password"
        type="password"
        required
        autoFocus
      />
      <Input
        label="Confirm Password"
        name="passwordConfirmation"
        type="password"
        required
      />

      <Submit formAction={handler}>Reset</Submit>
    </form>
  );
}
