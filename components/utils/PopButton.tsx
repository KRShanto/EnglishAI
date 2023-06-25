"use client";

import { useState, useEffect } from "react";

// A button that pops after click
export default function PopButton({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  // should the button pop?
  const [shouldPop, setShouldPop] = useState(false);

  // when the button pops, set shouldPop to false after 100ms
  useEffect(() => {
    if (shouldPop) {
      setTimeout(() => {
        setShouldPop(false);
      }, 100);
    }
  }, [shouldPop]);

  return (
    <button
      {...props}
      onClick={() => {
        setShouldPop(true);
        if (onClick) onClick();
      }}
      className={`pop-btn ${shouldPop ? "pop" : ""}`}
    >
      {children}
    </button>
  );
}
