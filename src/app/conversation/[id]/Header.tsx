import { UserType } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Header({ otherUser }: { otherUser: UserType }) {
  return (
    <div className="header">
      <div className="info">
        <Link href="/conversation" className="back">
          <FaArrowLeft />
        </Link>

        <div className="user">
          <Image
            src={otherUser.image!}
            alt="User"
            width={50}
            height={50}
            className="avatar"
          />

          <h2 className="name">{otherUser.name}</h2>
        </div>
      </div>
    </div>
  );
}
