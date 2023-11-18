"use client";

import { useFormErrorStore } from "@/stores/formError";
import { FaTimes } from "react-icons/fa";

export default function FormError() {
  const { error } = useFormErrorStore();

  if (error && error.field === "all") {
    return (
      <div className="global-error-upper">
        <div className="global-error">
          <p className="message">{error.message}</p>

          <div>
            <button className="close">
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
