import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  //   const renderErrorMessage = (name: string) =>
  //     name === errorMessages.name && (
  //       <div className="error">{errorMessages.message}</div>
  //     );

  const handleSubmit = (event: { preventDefault: () => void }) => {
    // Prevent page reload
    event.preventDefault();
  };

  return (
    <div className="cnb-login-form">
      <h2>Log In</h2>
      <p>
        Not a C&B VIP Member? <Link href="/cnb-sign-up/">Sign up</Link>
      </p>
      {/* {renderErrorMessage("uname")} */}
      {/* <p className="login-success">You are successfully logged in</p> */}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="cnb-user-name">Email</label>
          <input
            type="text"
            className="form-control form-new-control"
            id="cnb-user-name"
            name="cnb-user-name"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cnb-login-password">
            Password{" "}
            <a href="#" className="cnb-get-hint-link get-hint-link">
              {" "}
              Get Hint
            </a>
          </label>
          <input
            type="password"
            className="form-control form-new-control"
            id="cnb-login-password"
            name="cnb-password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <a href="#" className="forgot-password-link">
        Forgot password?
      </a>
    </div>
  );
}
