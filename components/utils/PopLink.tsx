"use client";

import Link from "next/link";
import { useState, useEffect, AnchorHTMLAttributes } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

// A <Link /> that pops after click
export default function PopLink({
  children,
  href,
  className,
  ...props
}: Props) {
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
    <Link
      href={href}
      onClick={() => {
        setShouldPop(true);
      }}
      className={`pop-btn ${shouldPop ? "pop" : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}
