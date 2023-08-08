import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { getForgotPasswordData } from "../../../lib/normal-api";

export default function ForgotPasswordForm({ showLoginForm }) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [errorMessages, setErrorMessages] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

    const grecaptchaToken = await executeRecaptcha("forgot_password");
    if (grecaptchaToken) {
      const hintData = await getForgotPasswordData(grecaptchaToken, cnbEmail);
      if (hintData.success) {
        setIsSuccess(true);
        setIsLoading(false);
      } else {
        setErrorMessages(hintData.error_message);
        setIsLoading(false);
      }
    }
  };

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return (
    <div className="cnb-lost-password-form">
      <h2>Forgot password</h2>
      <p>Enter your e-mail to receive your account information via e-mail.</p>

      {errorMessages && <p className="error-msg">{errorMessages}</p>}
      {isSuccess && <p className="success-msg">Successfully sent. Please check your inbox</p>}

      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="cnb-forgot-email">Email</label>
          <input
            type="email"
            className={`form-control ${emailClass}`}
            id="cnb-forgot-email"
            name="cnb_email"
            placeholder="Enter your email"
            required={false}
          />
        </div>
        <button type="submit" className={btnClass}>
          {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Reset Password</span>}
        </button>
      </form>
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
