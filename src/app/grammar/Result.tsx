import {
  GrammarAlternativeResult,
  GrammarCheckerResult,
  GrammarImproverResult,
  ResultDataType,
} from "@/types/grammar";
import CopyBtn from "@/components/CopyBtn";

export default function Result({
  currentState,
  resultData,
}: {
  currentState: string;
  resultData: ResultDataType | undefined;
}) {
  if (currentState === "ResultCheck") {
    const data = resultData as GrammarCheckerResult;

    return (
      <div className="checking-result">
        <h2 className="result-heading">Result</h2>

        {data.result.isCorrect === true ? (
          <>
            <h2 className="success">The sentence is correct.</h2>

            <div className="sentence correct">
              <p className="title">Correct</p>
              <div className="text_icon">
                <p className="text">{data.text}</p>
                <CopyBtn text={data.text} className="icon" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="sentence wrong">
              <p className="title">Wrong</p>
              <div className="text_icon">
                <p className="text">
                  {data.result.wrongText.map((text, index) => {
                    if (text.wrong)
                      return (
                        <span key={index} className="wrong-text">
                          {text.text}{" "}
                        </span>
                      );

                    return <span key={index}>{text.text} </span>;
                  })}
                </p>

                <CopyBtn
                  text={data.result.wrongText
                    .map((text) => text.text)
                    .join(" ")}
                  className="icon"
                />
              </div>
            </div>

            <div className="sentence correct">
              <p className="title">Correct</p>
              <div className="text_icon">
                <p className="text">{data.result.correctText}</p>

                <CopyBtn text={data.result.correctText} className="icon" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  if (currentState === "ResultImprove") {
    const data = resultData as GrammarImproverResult;

    return (
      <div className="checking-result">
        <h2 className="result-heading">Result</h2>

        <div className="sentence correct">
          <p className="title">Improved Text</p>

          <div className="text_icon">
            <p className="text">{data.improvedText}</p>

            <CopyBtn text={data.improvedText} className="icon" />
          </div>
        </div>
      </div>
    );
  }

  if (currentState === "ResultAlternative") {
    const data = resultData as GrammarAlternativeResult;

    return (
      <div className="checking-result">
        <h2 className="result-heading">Result</h2>

        <div className="sentence correct">
          <p className="title">Alternative Text</p>

          <div className="text_icon">
            <p className="text">{data.alternative}</p>

            <CopyBtn text={data.alternative} className="icon" />
          </div>
        </div>
      </div>
    );
  }

  // else render a description
  if (currentState === "Null")
    return (
      <div className="description">
        <p>Check your grammar with our AI-powered grammar checker.</p>
        <p>
          You can check your grammar, improve your writing, and get feedback on
          your writing.
        </p>
      </div>
    );

  // TODO: handle errors

  return <></>;
}
