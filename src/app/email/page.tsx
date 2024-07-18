import { getAuthSession } from "@/lib/auth";
import React from "react";
import GenerateEmail from "./GenerateEmail";

export default async function Page() {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <GenerateEmail />
    </div>
  );
}
