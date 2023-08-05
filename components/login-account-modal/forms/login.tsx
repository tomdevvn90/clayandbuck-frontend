import Link from "next/link";
import { useState } from "react";
import { getLoginData } from "../../../lib/normal-api";

export default function LoginForm({ handleCloseModal }) {
  const [errorMessages, setErrorMessages] = useState("");
  const [useNameClass, setUseNameClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      setErrorMessages(`Password are empty.`);
      setPasswordClass("error");
      return false;
    }

    const loginData = await getLoginData(userName, password);
    console.log(loginData);

    if (loginData.success) {
      setIsLoggedIn(true);
      setTimeout(handleCloseModal, 1500);
    } else {
      setErrorMessages(loginData.error_message);
    }
  };

  return (
    <div className="cnb-login-form">
      <h2>Log In</h2>
      {!isLoggedIn && (
        <p>
          Not a C&B VIP Member? <Link href="/cnb-sign-up/">Sign up</Link>
        </p>
      )}

      {errorMessages && <p className="error-msg">{errorMessages}</p>}

      {isLoggedIn && <p className="success-msg">You are successfully logged in</p>}

      {!isLoggedIn && (
        <div className="form-wrap">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="cnb-user-name">Email</label>
              <input
                type="text"
                className={`form-control ${useNameClass}`}
                id="cnb-user-name"
                name="cnb_user_name"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cnb-password">
                Password <a href="#"> Get Hint</a>
              </label>
              <input
                type="password"
                className={`form-control ${passwordClass}`}
                id="cnb-password"
                name="cnb_password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit">Log In</button>
          </form>
          <a href="#" className="forgot-password-link">
            Forgot password?
          </a>
        </div>
      )}
    </div>
  );
}
