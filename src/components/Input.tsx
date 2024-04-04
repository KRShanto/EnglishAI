"use client";

import { useFormErrorStore } from "@/stores/form-error";
import { useState, useRef } from "react";

export default function Input({
  name,
  label,
  type = "text",
  required,
  defaultValue,
  autoFocus,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  autoFocus?: boolean;
}) {
  const labelTop = useRef<null | HTMLLabelElement>(null);
  const labelBottom = useRef<null | HTMLLabelElement>(null);
  const input = useRef<null | HTMLInputElement>(null);
  const wrapper = useRef<null | HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [sholdTopLabelBeVisible, setShouldTopLabelBeVisible] = useState<
    boolean | null
  >(null);

  const { error, showError } = useFormErrorStore();

  const handleFocus = () => {
    input.current?.classList.add("focused");

    if (inputValue === "") {
      labelBottom.current?.classList.remove("to-left");
      labelBottom.current?.classList.add("to-right");
      wrapper.current?.classList.add("focused");

      setTimeout(() => {
        setShouldTopLabelBeVisible(true);
      }, 300);
    }
  };

  const handleBlur = () => {
    if (inputValue === "") {
      input.current?.classList.remove("focused");
      labelTop.current?.classList.remove("from-left");
      labelTop.current?.classList.add("from-right");

      showError(null);

      setTimeout(() => {
        setShouldTopLabelBeVisible(false);
        wrapper.current?.classList.remove("focused");
      }, 500);
    }
  };

  return (
    <div className="wrap-upper" ref={wrapper}>
      <div className="wrap">
        {sholdTopLabelBeVisible && (
          <label htmlFor={name} className="from-left" ref={labelTop}>
            {label}
          </label>
        )}

        {!sholdTopLabelBeVisible && (
          <label
            htmlFor={name}
            className={
              sholdTopLabelBeVisible === null ? "bottom" : "bottom to-left"
            }
            ref={labelBottom}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          name={name}
          id={name}
          required={required}
          ref={input}
          autoFocus={autoFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {error && error.field === name && (
        <p className="error">{error.message}</p>
      )}
    </div>
  );
}
