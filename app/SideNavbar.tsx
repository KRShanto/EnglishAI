"use client";

import Link from "next/link";
import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { logoFont, linkFont } from "../lib/consts";

export default function SideNavbar() {
  const segment = useSelectedLayoutSegment();

  const links = [
    [
      { href: "/grammar", text: "Grammar" },
      { href: "/writing", text: "Writing" },
      { href: "/write-together", text: "Write Together" },
    ],
    [
      { href: "/about", text: "About" },
      { href: "/settings", text: "Settings" },
      { href: "/profile", text: "Profile" },
    ],
  ];

  return (
    <nav className="side-navbar">
      <Link href="/" className={`logo ${logoFont.className}`}>
        English AI
      </Link>

      <hr />

      <div className="links">
        {links.map((section, i) => (
          <div key={i}>
            <div className={`link-section ${i === 0 ? "top" : "bottom"}`}>
              {section.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  style={linkFont.style}
                  className={`${
                    segment && segment === link.href.split("/")[1]
                      ? "active"
                      : ""
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </div>

            {i === 0 && <hr />}
          </div>
        ))}
      </div>
    </nav>
  );
}
