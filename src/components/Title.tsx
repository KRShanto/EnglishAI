import React from "react";

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="heading-title">
      <h2 className="title">{children}</h2>
    </div>
  );
}
