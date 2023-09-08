import { useContext, useState } from "react";
import { resetPassword } from "../../lib/normal-api";
import { GlobalsContext } from "../../contexts/GlobalsContext";
import CnbLogoImg from "../../public/images/cb-vip-247.png";
import Image from "next/image";
import Link from "next/link";

export default function ResetPassword({ passwordToken }) {
  const GlobalsCtx = useContext(GlobalsContext);

  const [errorMessages, setErrorMessages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordClass, setPasswordClass] = useState("");
  const [cfPasswordClass, setCfPasswordClass] = useState("");
  const [hintPasswordClass, setHintPasswordClass] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSuccess(false);
    setErrorMessages("");
    setPasswordClass("");
    setCfPasswordClass("");
    setHintPasswordClass("");

    const password = event.target.cnb_password.value;
    const cfPassword = event.target.cnb_confirm_password.value;
    const hintPassword = event.target.cnb_password_hint.value;

    if (!passwordToken) {
      setErrorMessages(`Password Token is invalid. Please check your link again!`);
      return false;
    }

    // Validate input fields
    if (!password && !cfPassword && !hintPassword) {
      setErrorMessages(`Password and Hint are empty.`);
      setPasswordClass("error");
      setCfPasswordClass("error");
      setHintPasswordClass("error");
      return false;
    }
    if (!password) {
      setErrorMessages(`Password is empty.`);
      setPasswordClass("error");
      return false;
    }
    if (!cfPassword) {
      setErrorMessages(`Confirm Password is empty.`);
      setCfPasswordClass("error");
      return false;
    }
    if (!hintPassword) {
      setErrorMessages(`Password Hint is empty.`);
      setHintPasswordClass("error");
      return false;
    }
    if (password.length < 6 || password.length > 32) {
      setErrorMessages(`Password must be between 6-32 characters.`);
      setPasswordClass("error");
      return false;
    }
    if (password != cfPassword) {
      setErrorMessages("Passwords don't match.");
      setCfPasswordClass("error");
      return false;
    }
    if (hintPassword.indexOf(password) >= 0) {
      setErrorMessages(`Password hint cannot contain password.`);
      setHintPasswordClass("error");
      return false;
    }

    setIsLoading(true);

    const resetPasswordData = await resetPassword(passwordToken, btoa(password), hintPassword);
    // console.log(resetPasswordData);

    if (resetPasswordData.success) {
      setIsSuccess(true);
      setIsLoading(false);
    } else {
      if (resetPasswordData.error_message) {
        setErrorMessages(resetPasswordData.error_message);
      } else {
        setErrorMessages("Something went wrong. Please try again!");
      }
      setIsLoading(false);
    }
  };

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return (
    <div className="reset-pass-wrap">
      <div className="update-box">
        <Link className="close-btn" href="/">
          ×
        </Link>
        <div>
          <Image src={CnbLogoImg} width={90} height={90} alt="Clay and Buck" />
        </div>
        <h2>Reset Password</h2>

        {isSuccess && (
          <p className="success-msg">
            Your account password has been successfully updated.<br></br>
            <button className="btn" onClick={() => GlobalsCtx.setOpenLoginModal(true)}>
              Login
            </button>
          </p>
        )}

        {errorMessages && <p className="error-msg">{errorMessages}</p>}

        {!isSuccess && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cnb-password">Password</label>
              <input
                type="password"
                className={passwordClass}
                id="cnb-password"
                name="cnb_password"
                aria-describedby="emailHelp"
                placeholder="Enter your password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cnb-confirm-password">Confirm Password</label>
              <input
                type="password"
                className={cfPasswordClass}
                id="cnb-confirm-password"
                name="cnb_confirm_password"
                placeholder="Enter your confirm password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cnb-password-hint">Password Hint</label>
              <input
                type="text"
                className={hintPasswordClass}
                id="cnb-password-hint"
                name="cnb_password_hint"
                aria-describedby="emailHelp"
                placeholder="Enter your password hint"
              />
            </div>
            <button type="submit" className={btnClass}>
              {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Submit</span>}
            </button>
          </form>
        )}

        <div className="box-footer">
          <Link href="/optout/">Do Not Sell or Share My Personal Information</Link>
          <Link href="/cnb-sign-up/">Become a C&B VIP Subscriber</Link>
        </div>
      </div>
    </div>
  );
}
