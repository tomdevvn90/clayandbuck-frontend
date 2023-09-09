import SubscribeInfo from "./parts/subscribe-info";
import dynamic from "next/dynamic";
import { useState } from "react";
import { createUser } from "../../lib/normal-api";
import { setCookieLoginInfo } from "../../utils/global-functions";
import { useRouter } from "next/router";

const CancelPopup = dynamic(() => import("./parts/cancel-popup"), {
  ssr: false,
});

export default function VerifyEmail({ gift, emailToken }) {
  const router = useRouter();

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [passwordClass, setPasswordClass] = useState("");
  const [passwordCfClass, setPasswordCfClass] = useState("");
  const [passwordHintClass, setPasswordHintClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages("");
    setPasswordClass("");
    setPasswordCfClass("");
    setPasswordHintClass("");

    // Validate email token
    if (!emailToken) {
      setErrorMessages("Email Token is invalid.");
      return false;
    }

    const password = event.target.cnb_password.value;
    const passwordConfirm = event.target.cnb_password_confirm.value;
    const passwordHint = event.target.cnb_password_hint.value;

    // Validate password value
    if (!password) {
      setErrorMessages("Please enter a valid password.");
      setPasswordClass("error");
      return false;
    }
    if (password.length < 6 || password.length > 32) {
      setErrorMessages("Password must be between 6-32 characters.");
      setPasswordClass("error");
      return false;
    }
    if (password != passwordConfirm) {
      setErrorMessages("Passwords don't match.");
      setPasswordCfClass("error");
      return false;
    }
    if (!passwordHint) {
      setErrorMessages("Please enter password hint.");
      setPasswordHintClass("error");
      return false;
    }
    if (passwordHint.indexOf(password) >= 0) {
      setErrorMessages("Password hint cannot contain password.");
      setPasswordHintClass("error");
      return false;
    }

    setIsLoading(true);
    const createAccRes = await createUser(emailToken, password, passwordHint);
    // console.log(createAccRes);

    if (createAccRes.success) {
      const userInfo = createAccRes.userInfoForCookie;
      const isSignUpGift = createAccRes.signUpGift;

      setCookieLoginInfo(
        userInfo.accessToken,
        userInfo.userEmail,
        password,
        userInfo.userSubscribed,
        userInfo.userCancelledSubs,
        userInfo.userPrivacyOptout
      );

      if (isSignUpGift == "1") {
        router.push("/cnb-give-the-gift");
      } else {
        router.push("/cnb-subscription");
      }
    } else {
      if (createAccRes.error_message) {
        setErrorMessages(createAccRes.error_message);
      } else {
        setErrorMessages("Something went wrong. Please try again!");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up-wrap">
      <div className="subscribe-left">
        <SubscribeInfo gift={gift} />
      </div>
      <div className="subscribe-right">
        <div className="create-account">
          {isLoading && (
            <div className="cnb-loading-sp">
              <div className="cnb-spinner-loading"></div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h4>Create Your Password</h4>

            <div className="step-form">
              {errorMessages && <p className="error-msg">{errorMessages}</p>}

              <div className="form-group">
                <label htmlFor="cnb-password">Password</label>
                <input
                  type="password"
                  className={passwordClass}
                  id="cnb-password"
                  name="cnb_password"
                  aria-describedby="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cnb-password-confirm">Confirm Password</label>
                <input
                  type="password"
                  className={passwordCfClass}
                  id="cnb-password-confirm"
                  name="cnb_password_confirm"
                  aria-describedby="password-confirm"
                  placeholder="Enter your confirm password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cnb-password-hint">Password Hint</label>
                <input
                  type="text"
                  className={passwordHintClass}
                  id="cnb-password-hint"
                  name="cnb_password_hint"
                  aria-describedby="password-hint"
                  placeholder="Enter your password hint"
                />
              </div>
              <div className="btn-set-inline">
                <div className="s-btn btn-half" onClick={() => setShowCancelPopup(true)}>
                  Previous
                </div>
                <button className="s-btn btn-half btn-submit">Continue</button>
              </div>
            </div>
          </form>
          <button className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
            Cancel
          </button>
        </div>
      </div>

      {showCancelPopup && <CancelPopup closeCancelPopup={() => setShowCancelPopup(false)} />}
    </div>
  );
}
