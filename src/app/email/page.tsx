import { getAuthSession } from "@/lib/auth";
import React from "react";
import GenerateEmail from "./GenerateEmail";
import Title from "@/components/Title";

export default async function Page() {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <Title>Email Generator</Title>
      <GenerateEmail />
    </div>
  );
}
