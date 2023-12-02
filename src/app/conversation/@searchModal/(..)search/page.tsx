"use client";

import Search from "@/components/Search";
import { FaTimes } from "react-icons/fa";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchIntercept() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <>
      <div className={`modal ${visible ? "visible" : ""}`}>
        <button className="close" onClick={() => router.back()}>
          <FaTimes />
        </button>

        <Search connectButton />
      </div>
      {visible && <div className="backdrop"></div>}
    </>
  );
}
