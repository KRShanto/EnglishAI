"use client";

import { useFormErrorStore } from "@/stores/form-error";
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";

export default function FormError() {
  const { error, clearError } = useFormErrorStore();
  const buttonRef = useRef<HTMLDivElement>(null);

  // close with animation
  const handleClose = () => {
    buttonRef.current?.classList.add("hide");

    setTimeout(() => {
      clearError();
    }, 400);
  };

  if (error && error.field === "all") {
    return (
      <div className="global-error-upper">
        <div className="global-error display" ref={buttonRef}>
          <p className="message">{error.message}</p>

          <div>
            <button type="button" className="close" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
