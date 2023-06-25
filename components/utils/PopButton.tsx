"use client";

import { useState, useEffect, ButtonHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// A button that pops after click
export default function PopButton({
  children,
  className,
  onClick,
  delay = 100,
  ...props
}: Props) {
  // should the button pop?
  const [shouldPop, setShouldPop] = useState(false);

  // when the button pops, set shouldPop to false after 100ms
  useEffect(() => {
    if (shouldPop) {
      setTimeout(() => {
        setShouldPop(false);
      }, delay);
    }
  }, [shouldPop]);

  return (
    <button
      onClick={() => {
        setShouldPop(true);
        if (onClick) onClick();
      }}
      className={`pop-btn ${shouldPop ? "pop" : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
