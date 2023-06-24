import Link from "next/link";
import React from "react";
import { Poppins, Roboto_Slab } from "next/font/google";

const logoFont = Poppins({ weight: "700", subsets: ["latin"] });
const linkFont = Roboto_Slab({ weight: "700", subsets: ["latin"] });

export default function SideNavbar() {
  const links = [
    [
      { href: "/grammar", text: "Grammar" },
      { href: "/writing", text: "Writing" },
      { href: "/write-together", text: "White Together" },
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

      <div className="links">
        {/* <div className="link-section top">
          <Link href="/grammar" style={linkFont.style}>
            Grammar
          </Link>
          <Link href="/writing" style={linkFont.style}>
            Writing
          </Link>
          <Link href="/white-together" style={linkFont.style}>
            White Together
          </Link>
        </div>

        <hr />

        <div className="link-section bottom">
          <Link href="/about" style={linkFont.style}>
            About
          </Link>
          <Link href="/settings" style={linkFont.style}>
            Settings
          </Link>
          <Link href="/profile" style={linkFont.style}>
            Profile
          </Link>
        </div> */}

        {links.map((section, i) => (
          <div key={i} className={`link-section ${i === 0 ? "top" : "bottom"}`}>
            {section.map((link, i) => (
              <Link key={i} href={link.href} style={linkFont.style}>
                {link.text}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
