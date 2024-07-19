import React from "react";

export default function Result({
  result,
}: {
  result: null | "Fetching" | string[];
}) {
  if (!result)
    return (
      <div className="description">
        <p>Generate any paragraph/essay you want.</p>
        <p>
          You can generate a paragraph about A Cow, about a country, or even
          generate stories.
        </p>
      </div>
    );

  if (result && result !== "Fetching" && result.length > 0)
    return (
      <div className="checking-result">
        <h2 className="result-heading">Result</h2>

        <div className="paragraph-text">
          {(result as string[]).map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    );
}
