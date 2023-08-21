import { getCookie } from "cookies-next";
import { useState } from "react";
import { changePassword } from "../../../lib/normal-api";

export default function ChangePasswordForm() {
  const currentEmail = getCookie("STYXKEY_USER_EMAIL").toString();

  const [errorMessages, setErrorMessages] = useState("");
  const [crPasswordClass, setCrPasswordClass] = useState("");
  const [newPasswordClass, setNewPasswordClass] = useState("");
  const [hintPasswordClass, setHintPasswordClass] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSuccess(false);
    setErrorMessages("");
    setCrPasswordClass("");
    setNewPasswordClass("");
    setHintPasswordClass("");

    const crPassword = event.target.cnb_current_password.value;
    const newPassword = event.target.cnb_new_password.value;
    const hintPassword = event.target.cnb_password_hint.value;

    // Validate input fields
    if (!crPassword && !newPassword && !hintPassword) {
      setErrorMessages(`Password and Hint are empty.`);
      setCrPasswordClass("error");
      setNewPasswordClass("error");
      setHintPasswordClass("error");
      return false;
    }
    if (!crPassword) {
      setErrorMessages(`Current Password is empty.`);
      setCrPasswordClass("error");
      return false;
    }
    if (!newPassword) {
      setErrorMessages(`New Password is empty.`);
      setNewPasswordClass("error");
      return false;
    }
    if (!hintPassword) {
      setErrorMessages(`Password Hint is empty.`);
      setHintPasswordClass("error");
      return false;
    }
    if (newPassword.length < 6 || newPassword.length > 32) {
      setErrorMessages(`Password must be between 6-32 characters.`);
      setNewPasswordClass("error");
      return false;
    }
    if (hintPassword.indexOf(newPassword) >= 0) {
      setErrorMessages(`Password hint cannot contain password.`);
      setHintPasswordClass("error");
      return false;
    }

    setIsLoading(true);

    const changePasswordData = await changePassword(currentEmail, btoa(crPassword), btoa(newPassword), hintPassword);
    // console.log(changePasswordData);

    if (changePasswordData.success) {
      setIsSuccess(true);
      setIsLoading(false);
    } else {
      if (changePasswordData.error_message) {
        setErrorMessages(changePasswordData.error_message);
      } else {
        setErrorMessages("Something went wrong. Please try again!");
      }
      setIsLoading(false);
    }
  };

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return (
    <div className="change-password-form">
      <div className="change-row">
        <h2>Change Password</h2>
        {isSuccess ? (
          <p className="success-msg">Your account password has been successfully updated.</p>
        ) : (
          <p>To change your password, enter your current password, then your new password.</p>
        )}

        {errorMessages && <p className="error-msg">{errorMessages}</p>}
      </div>

      {!isSuccess && (
        <form onSubmit={handleSubmit}>
          <p className="change-password-error"></p>
          <div className="form-group">
            <label htmlFor="cnb-current-password">Current Password</label>
            <input
              type="password"
              className={crPasswordClass}
              id="cnb-current-password"
              name="cnb_current_password"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cnb-new-password">New Password</label>
            <input type="password" className={newPasswordClass} id="cnb-new-password" name="cnb_new_password" />
          </div>
          <div className="form-group">
            <label htmlFor="cnb-password-hint">Password Hint</label>
            <input
              type="text"
              className={hintPasswordClass}
              id="cnb-password-hint"
              name="cnb_password_hint"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" className={btnClass}>
            {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Update</span>}
          </button>
        </form>
      )}
    </div>
  );
}
