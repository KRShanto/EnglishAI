import { FaCopy, FaRobot } from "react-icons/fa";

export default function GenerateEmail() {
  return (
    <div className="generate-email">
      <div className="generate-email-bottom">
        <form className="main-form">
          {/* Subject */}
          <div className="wrapper">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" />
          </div>

          {/* Body - Text */}
          <div className="wrapper">
            <label htmlFor="text-body">Body - Text</label>
            <textarea id="text-body" name="text-body" />
          </div>

          {/* Body - HTML */}
          <div className="wrapper">
            <label htmlFor="html-body">Body - HTML</label>
            <textarea id="html-body" name="html-body" />
          </div>
        </form>

        {/* Settings */}
        <div className="settings">
          {/* Options */}
          <div className="settings-options">
            <button>
              <FaCopy /> Copy
            </button>
            <button>
              <FaRobot /> Re-Generate
            </button>
          </div>

          <form className="settings-form">
            {/* generate html */}
            <div className="wrapper">
              <input type="checkbox" id="html" name="html" />
              <label htmlFor="html">Generate HTML</label>
            </div>

            {/* Preview tggle*/}
            <div className="wrapper">
              <input type="checkbox" id="preview" name="preview" />
              <label htmlFor="preview">Preview</label>
            </div>

            <div className="wrapper context">
              <label htmlFor="context">Context</label>
              <textarea id="context" name="context" />
            </div>
          </form>
        </div>
      </div>

      {/* Preview */}
      {/* TODO */}
    </div>
  );
}
