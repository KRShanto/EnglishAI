"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { MdOutlineTextFields } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { RiSpeakFill } from "react-icons/ri";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

export default function SideNavbar() {
  const path = usePathname();

  const links = [
    [
      { href: "/grammar", text: "Grammar", icon: <FaBookOpen /> },
      {
        href: "/grammar/paragraph",
        text: "Paragraph",
        icon: <MdOutlineTextFields />,
      },
      { href: "/grammar/letter", text: "Letter", icon: <MdEmail /> },
      { href: "/grammar/email", text: "Email", icon: <MdOutlineEmail /> },
      { href: "/grammar/dialogue", text: "Dialogue", icon: <RiSpeakFill /> },
      {
        href: "/conversation",
        text: "Conversation",
        icon: <IoChatboxEllipses />,
      },
    ],
    [
      { href: "/about", text: "About", icon: <FaCircleInfo /> },
      { href: "/settings", text: "Settings", icon: <IoSettings /> },
      { href: "/profile", text: "Profile", icon: <FaRegUser /> },
    ],
  ];

  const currentPath = path.split("/")[path.split("/").length - 1];

  return (
    <nav className="side-navbar">
      <Link href="/" className="logo">
        English AI
      </Link>

      <hr />

      <div className="links">
        {links.map((section, i) => (
          <div key={i}>
            <div className="link-section">
              {section.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className={`${
                    currentPath ===
                      link.href.split("/")[link.href.split("/").length - 1] &&
                    "active"
                  }`}
                >
                  {link.icon}
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
