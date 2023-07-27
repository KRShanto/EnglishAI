"use client";

import React from "react";
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
      <button onClick={scrollUp}>
        <FiArrowUp />
      </button>

      <button onClick={scrollDown}>
        <FiArrowDown />
      </button>
    </div>
  );
}
