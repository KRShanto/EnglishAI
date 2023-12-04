"use client";

import { FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="messages-loading">
      <FadeLoader color="cyan" height={38} margin={24} radius={5} width={13} />
    </div>
  );
}
