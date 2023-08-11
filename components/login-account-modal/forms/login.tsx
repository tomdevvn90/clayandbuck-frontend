import Link from "next/link";
import { useState } from "react";
import { getLoginData } from "../../../lib/normal-api";
import { setCookieLoginInfo } from "../../../utils/global-functions";

export default function LoginForm({ className, changeLogInStt, showForgotForm, showHintForm }) {
  const [errorMessages, setErrorMessages] = useState("");
  const [useNameClass, setUseNameClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages("");
    setUseNameClass("");
    setPasswordClass("");

    const userName = event.target.cnb_user_name.value;
    const password = event.target.cnb_password.value;

    // Validate input fields
    if (!userName && !password) {
      setErrorMessages(`Username and password are empty.`);
      setUseNameClass("error");
      setPasswordClass("error");
      return false;
    }
    if (!userName) {
      setErrorMessages(`Username is empty.`);
      setUseNameClass("error");
      return false;
    }
    if (!password) {
      setErrorMessages(`Password is empty.`);
      setPasswordClass("error");
      return false;
    }

    setIsLoading(true);

    const loginData = await getLoginData(userName, btoa(password));
    //console.log(loginData);

    if (loginData.success) {
      const loginInfo = loginData.login_info;

      setCookieLoginInfo(
        loginInfo.access_token,
        loginInfo.user_email,
        password,
        loginInfo.user_subscribed,
        loginInfo.cancel_at_period_end,
        loginInfo.user_privacy_optout
      );

      setIsLoggedIn(true);
      setIsLoading(false);
      changeLogInStt();
      // setTimeout(handleCloseModal, 1500);
    } else {
      if (loginData.error_message) {
        setErrorMessages(loginData.error_message);
      } else {
        setErrorMessages("Something went wrong. Please try again!");
      }
      setIsLoading(false);
    }
  };

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return (
    <div className={`cnb-login-form ${className}`}>
      <h2>Log In</h2>
      {!isLoggedIn && (
        <p>
          Not a C&B VIP Member? <Link href="/cnb-sign-up/">Sign up</Link>
        </p>
      )}

      {/* {isLoggedIn && <p className="success-msg">You are successfully logged in</p>} */}

      {errorMessages && <p className="error-msg">{errorMessages}</p>}

      {!isLoggedIn && (
        <div className="form-wrap">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="cnb-user-name">Email</label>
              <input
                type="text"
                className={useNameClass}
                id="cnb-user-name"
                name="cnb_user_name"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cnb-password">
                Password <a onClick={showHintForm}>Get Hint</a>
              </label>
              <input
                type="password"
                className={passwordClass}
                id="cnb-password"
                name="cnb_password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className={btnClass}>
              {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Log In</span>}
            </button>
          </form>
          <a className="forgot-password-link" onClick={showForgotForm}>
            Forgot password?
          </a>
        </div>
      )}
    </div>
  );
}
