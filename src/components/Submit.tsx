"use client";

import { useFormErrorStore } from "@/stores/form-error";
import { useEffect, useState } from "react";
import { experimental_useFormStatus } from "react-dom";
import { RotatingLines } from "react-loader-spinner";

export default function Submit({
  children,
  formAction,
}: {
  children: React.ReactNode;
  formAction?: (formData: FormData) => Promise<void>;
}) {
  const { pending } = experimental_useFormStatus();
  const { clearError } = useFormErrorStore();

  // reset the error state when the component is mounted
  useEffect(() => {
    clearError();
  }, []);

  const handler = async (data: FormData) => {
    // reset the error state when the button is clicked
    clearError();

    if (formAction) await formAction(data);
  };

  return (
    <button type="submit" formAction={handler}>
      {pending ? (
        <RotatingLines strokeColor="#fff" strokeWidth="5" width="40" />
      ) : (
        children
      )}
    </button>
  );
}
