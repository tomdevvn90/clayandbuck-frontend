import { getCookie } from "cookies-next";
import { useState } from "react";
import { changeEmail } from "../../../lib/normal-api";

export default function ChangeEmailForm() {
  const currentEmail = getCookie("STYXKEY_USER_EMAIL").toString();

  const [errorMessages, setErrorMessages] = useState("");
  const [useEmailClass, setUseEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSuccess(false);
    setErrorMessages("");
    setUseEmailClass("");
    setPasswordClass("");

    const userEmail = event.target.cnb_new_email.value;
    const password = event.target.cnb_password.value;

    // Validate input fields
    if (!userEmail && !password) {
      setErrorMessages(`Email and password are empty.`);
      setUseEmailClass("error");
      setPasswordClass("error");
      return false;
    }
    if (!userEmail) {
      setErrorMessages(`Email is empty.`);
      setUseEmailClass("error");
      return false;
    }
    if (!password) {
      setErrorMessages(`Password is empty.`);
      setPasswordClass("error");
      return false;
    }

    setIsLoading(true);

    const changeEmailData = await changeEmail(userEmail, btoa(password), currentEmail);
    // console.log(changeEmailData);

    if (changeEmailData.success) {
      setIsSuccess(true);
      setIsLoading(false);
    } else {
      if (changeEmailData.error_message) {
        setErrorMessages(changeEmailData.error_message);
      } else {
        setErrorMessages("Something went wrong. Please try again!");
      }
      setIsLoading(false);
    }
  };

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return (
    <div className="change-email-form">
      <div className="change-row">
        <h2>Change Email</h2>

        {isSuccess ? (
          <p className="success-msg">
            We've sent a confirmation to the email address you provided.Please check your email in order to complete the
            process.
          </p>
        ) : (
          <p>
            To change your email address from <strong>{currentEmail}</strong>, enter your new email and current password
            below.
          </p>
        )}

        {errorMessages && <p className="error-msg">{errorMessages}</p>}
      </div>

      {!isSuccess && (
        <form onSubmit={handleSubmit}>
          <p className="change-email-error"></p>
          <div className="form-group">
            <label htmlFor="cnb-new-email">Email address</label>
            <input
              type="email"
              className={useEmailClass}
              id="cnb-new-email"
              name="cnb_new_email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cnb-password">Password</label>
            <input type="password" className={passwordClass} id="cnb-password" name="cnb_password" />
          </div>
          <button type="submit" className={btnClass}>
            {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Update</span>}
          </button>
          <hr />
        </form>
      )}
    </div>
  );
}
