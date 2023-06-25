"use client";

import React from "react";
import PopButton from "../utils/PopButton";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export default function Scrollers() {
  function scrollUp() {
    // Get the <main> element
    const mainElement = document.getElementById("main") as HTMLDivElement;

    mainElement.scrollTop = 0;
    mainElement.scrollTop = 0;
  }

  function scrollDown() {
    // Get the <main> element
    const mainElement = document.getElementById("main") as HTMLDivElement;

    mainElement.scrollTop = mainElement.scrollHeight;
    mainElement.scrollTop = mainElement.scrollHeight;
  }

  return (
    <div className="scroller">
      <PopButton delay={200} onClick={scrollUp}>
        <FiArrowUp />
      </PopButton>

      <PopButton delay={200} onClick={scrollDown}>
        <FiArrowDown />
      </PopButton>
    </div>
  );
}
