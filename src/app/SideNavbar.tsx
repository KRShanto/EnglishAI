"use client";

import Link from "next/link";
import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
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
  const segment = useSelectedLayoutSegment();

  const links = [
    [
      { href: "/grammar", text: "Grammar", icon: <FaBookOpen /> },
      { href: "/paragraph", text: "Paragraph", icon: <MdOutlineTextFields /> },
      { href: "/letter", text: "Letter", icon: <MdEmail /> },
      { href: "/email", text: "Email", icon: <MdOutlineEmail /> },
      { href: "/dialogue", text: "Dialogue", icon: <RiSpeakFill /> },
      {
        href: "conversation",
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

  return (
    <nav className="side-navbar">
      <Link href="/" className="logo">
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
                  className={`${
                    segment && segment === link.href.split("/")[1]
                      ? "active"
                      : ""
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
