import { useState } from "react";
import { getPasswordHintData } from "../../../lib/normal-api";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function GetPasswordHintForm({ showLoginForm }) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [errorMessages, setErrorMessages] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passHint, setPassHint] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages("");
    setEmailClass("");
    setIsLoading(true);

    const cnbEmail = event.target.cnb_email.value;

    // Validate input field
    if (!cnbEmail) {
      setErrorMessages(`Please enter a valid email.`);
      setEmailClass("error");
      setIsLoading(false);
      return false;
    }

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      setErrorMessages(`Something went wrong. Please try again!`);
      setIsLoading(false);
      return false;
    }

    const grecaptchaToken = await executeRecaptcha("password_hint");
    if (grecaptchaToken) {
      const hintData = await getPasswordHintData(grecaptchaToken, cnbEmail);

      if (hintData.success) {
        setPassHint(hintData.hint);
        setIsLoading(false);
      } else {
        if (hintData.error_message) {
          setErrorMessages(hintData.error_message);
        } else {
          setErrorMessages("Something went wrong. Please try again!");
        }
        setIsLoading(false);
      }
    }
  };

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return (
    <div className="cnb-password-hint-form">
      <h2>Get Password Hint</h2>
      <p className="pw-hint-note">Enter your email to receive your password hint.</p>

      {errorMessages && <p className="error-msg">{errorMessages}</p>}
      {passHint && <p className="success-msg password-hint">{passHint}</p>}

      {!passHint && (
        <form onSubmit={handleSubmit} className="get-hint-form">
          <div className="form-group">
            <label htmlFor="cnb-email">Email</label>
            <input type="email" className={emailClass} id="cnb-email" name="cnb_email" placeholder="Enter your email" />
          </div>
          <button type="submit" className={btnClass}>
            {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Get Password Hint</span>}
          </button>
        </form>
      )}

      <a className="back-link" onClick={showLoginForm}>
        Back to login
      </a>
      <p className="need-help">
        Need help?{" "}
        <a href="https://help.clayandbuck.com/" target="_blank">
          Contact customer service.
        </a>
      </p>
    </div>
  );
}
