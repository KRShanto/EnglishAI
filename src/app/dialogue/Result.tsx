import React from "react";
import { Dialogue } from "./page";

export default function Result({
  result,
}: {
  result: null | "Fetching" | Dialogue[];
}) {
  if (!result || (result !== "Fetching" && result.length === 0))
    return (
      <div className="description">
        <p>Generate a dialogue between users</p>
        <p>You can generate a dialogue about any topic with any user</p>
      </div>
    );

  if (result && result !== "Fetching" && result.length > 0)
    return (
      <div className="checking-result">
        <h2 className="result-heading">Result</h2>

        <div className="dialogue-text">
          {result.map((dialogue, index) => (
            <div className="dialogue" key={index}>
              <div className="heading">
                {/* TODO: Avatar */}
                {/* TODO: Generate random for each user name */}
                <p className="name">{dialogue.name}</p>
              </div>
              <div className="content">{dialogue.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
}
