import { ChatMessage } from "@/types/db";
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { FaRobot } from "react-icons/fa";

export default function Message({
  msg,
  otherUser,
}: {
  msg: ChatMessage;
  otherUser: boolean;
}) {
  const [visible, setVisible] = React.useState(false);
  const [goingInvisible, setGoingInvisible] = React.useState(false);

  // close or open the message
  // when closing, set goingInvisible to true and then set visible to false
  const handler = () => {
    if (visible) {
      setGoingInvisible(true);
      setTimeout(() => {
        setVisible(false);
        setGoingInvisible(false);
      }, 300);
    } else {
      setVisible(true);
    }
  };

  // class for the message (sent or received)
  const msgReceivedClass = otherUser ? "received-msg" : "sent-msg";
  // class for the correct message (visible or invisible)
  const visibleClass = visible ? "visible" : "invisible";

  return (
    <div className={`message ${msgReceivedClass}`}>
      {/* If the grammar of the message is wrong */}
      {msg.message.result.isCorrect === false ? (
        <>
          <div className={`text wrong ${msgReceivedClass}`}>
            {/* Buttton to toggle the correct message (before the message) */}
            <button className="arrow" onClick={handler}>
              {visible ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            <div>
              {/* Result message text */}
              {msg.message.result.wrongText.map((text, index) => {
                if (text.wrong)
                  return (
                    <span key={index} className="wrong-text">
                      {text.text}{" "}
                    </span>
                  );

                return <span key={index}>{text.text} </span>;
              })}
            </div>
          </div>

          {/* Correct message */}
          <div
            className={`text correct ${msgReceivedClass}  ${
              goingInvisible ? "going-invisible" : visibleClass
            }`}
          >
            {/* Robot Icon (before the message) */}
            {<FaRobot className="robot-icon" />}

            {/* Correct message text */}
            {msg.message.result.correctText}
          </div>
        </>
      ) : (
        <>
          {/* If the grammar of the message is correct */}
          <p className={`text normal ${msgReceivedClass}`}>
            {/* Fetching icon (before the message) */}
            {msg.openAIstatus === "fetching" && (
              <ClipLoader color="#fff" size={20} />
            )}

            {/* Message text */}
            {msg.message.text}
          </p>
        </>
      )}
    </div>
  );
}
