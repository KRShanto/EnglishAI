import PopLink from "../utils/PopLink";

export default function Options() {
  return (
    <>
      <div className="options">
        <PopLink className="option" href="/grammar/check">
          Check your grammar
        </PopLink>
        <PopLink className="option" href="/grammar/improve">
          Improve your grammar
        </PopLink>
        <PopLink className="option" href="/grammar/alternative">
          Alternative sentences
        </PopLink>
      </div>
    </>
  );
}
