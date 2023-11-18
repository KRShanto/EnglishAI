"use client";

import { useFormErrorStore } from "@/stores/formError";
import { register } from "./register";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function SubmitButton() {
  const { showError } = useFormErrorStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handler = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const country = formData.get("country") as string;
    const password = formData.get("password") as string;

    setLoading(true);

    const res = await register({ name, email, country, password });

    res && setLoading(false);

    if (res.error) {
      showError(res.error);
      return;
    }

    const res2 = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res2?.error) {
      showError({ field: "all", message: res2.error });
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <button type="submit" formAction={handler}>
      {/* Submit */}
      {loading ? (
        <RotatingLines strokeColor="#fff" strokeWidth="5" width="40" />
      ) : (
        "Submit"
      )}
    </button>
  );
}
