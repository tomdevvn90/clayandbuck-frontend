import Link from "next/link";
import SubscribeInfo from "./parts/subscribe-info";
import { cnbGetPlanIntervalText } from "../../utils/global-functions";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { verifyEmailSubs } from "../../lib/normal-api";
import dynamic from "next/dynamic";

const CancelPopup = dynamic(() => import("./parts/cancel-popup"), {
  ssr: false,
});

export default function SignUp({ gift, plansInfo }) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [showPlanStep, setShowPlanStep] = useState("");
  const [showEmailStep, setShowEmailStep] = useState("hide");
  const [showSuccessStep, setShowSuccessStep] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [activeNextBtn, setActiveNextBtn] = useState(false);
  const [planSelected, setPlanSelected] = useState("");
  const [emailEntered, setEmailEntered] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  const handelShowPlanStep = () => {
    setShowEmailStep("hide");
    setShowPlanStep("");
  };

  const handleShowEmailStep = () => {
    setShowEmailStep("");
    setShowPlanStep("hide");
  };

  const handlePlanChange = (e) => {
    setActiveNextBtn(true);
    setPlanSelected(e.target.value);
  };

  const handleSubmit = async (event, gift) => {
    event.preventDefault();
    setErrorMessages("");
    setShowSuccessStep(false);

    const email = event.target.cnb_email.value;
    if (!email) {
      setErrorMessages("Please enter a valid email.");
      return false;
    }

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      setErrorMessages(`Something went wrong. Please try again!`);
      return false;
    }

    const grecaptchaToken = await executeRecaptcha("signup");
    if (grecaptchaToken) {
      setEmailEntered(email);
      setIsLoading(true);

      const signUpGift = gift ? "1" : "0";
      const verifyEmailRes = await verifyEmailSubs(email, grecaptchaToken, planSelected, signUpGift);
      //console.log(verifyEmailRes);

      if (verifyEmailRes.success) {
        setShowSuccessStep(true);
        setShowEmailStep("hide");
        setShowPlanStep("hide");
      } else {
        if (verifyEmailRes.error_message) {
          setErrorMessages(verifyEmailRes.error_message);
        } else {
          setErrorMessages("Something went wrong. Please try again!");
        }
      }
      setIsLoading(false);
    } else {
      console.log("Cannot get recaptcha token");
      setErrorMessages(`Something went wrong. Please try again!`);
      return false;
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

          <div className={`sign-up-step ${showPlanStep}`}>
            <h4>Pick Your Plan</h4>

            {gift ? (
              <p>
                <Link href="/cnb-sign-up/" className="highlight">
                  Add a subscription to your account
                </Link>
              </p>
            ) : (
              <p>
                You can change or cancel your plan anytime.{" "}
                <Link href="/cnb-sign-up-gift/" className="highlight">
                  Give as a gift
                </Link>
              </p>
            )}

            <div className="step-form">
              <label htmlFor="cnb-plan" className="form-group-label">
                Select your plan:
              </label>

              {plansInfo.length > 0 &&
                plansInfo.map((plan, index) => {
                  if (plan.active && !gift && plan.recurly_code.includes("gift") === false) {
                    const intervalCount = plan.interval_count;
                    const sText = intervalCount > 1 ? "s" : "";
                    const planInterval = cnbGetPlanIntervalText(plan.interval);
                    const intervalText = `${intervalCount} ${planInterval}${sText}`;

                    return (
                      <div key={index} className="plan-radio">
                        <input
                          className="form-checkbox"
                          type="radio"
                          name="cnb_plan_id"
                          id={`cnb_plan_id_${index + 1}`}
                          value={plan._id}
                          onChange={(e) => handlePlanChange(e)}
                        />
                        <label className="form-label" htmlFor={`cnb_plan_id_${index + 1}`}>
                          <strong>
                            {intervalText} for ${plan.amount}
                          </strong>
                          <span>Auto-renews after {intervalText}</span>
                        </label>
                      </div>
                    );
                  }

                  if (plan.active && gift && plan.recurly_code.includes("gift") !== false) {
                    const intervalCount = plan.interval_count;
                    const sText = intervalCount > 1 ? "s" : "";
                    const planInterval = cnbGetPlanIntervalText(plan.interval);
                    const intervalText = `${intervalCount} ${planInterval}${sText}`;

                    return (
                      <div key={index} className="plan-radio gift">
                        <input
                          className="form-checkbox"
                          type="radio"
                          name="cnb_plan_id"
                          id={`cnb_plan_id_${index + 1}`}
                          value={plan._id}
                          onChange={(e) => handlePlanChange(e)}
                        />
                        <label className="form-label" htmlFor={`cnb_plan_id_${index + 1}`}>
                          <strong>
                            {intervalText} for ${plan.amount}
                          </strong>
                        </label>
                      </div>
                    );
                  }

                  return "";
                })}

              <div className="btn-set-inline">
                <button className="s-btn btn-half btn-cancel-confirmation" onClick={() => setShowCancelPopup(true)}>
                  Previous
                </button>

                {activeNextBtn ? (
                  <button className="s-btn btn-half btn-continue" onClick={handleShowEmailStep}>
                    Continue
                  </button>
                ) : (
                  <button className="s-btn btn-half btn-continue disabled">Continue</button>
                )}
              </div>
              <button className="btn-cancel btn-cancel-confirmation" onClick={() => setShowCancelPopup(true)}>
                Cancel
              </button>
            </div>
          </div>

          <div className={`sign-up-step ${showEmailStep}`}>
            <h4>Create Your Account</h4>

            <form className="step-form" onSubmit={(event) => handleSubmit(event, gift)}>
              {errorMessages && <p className="error-msg">{errorMessages}</p>}

              <div className="form-group">
                <label htmlFor="cnb-email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="cnb-email"
                  name="cnb_email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="btn-set-inline">
                <div className="s-btn btn-half btn-previous" onClick={handelShowPlanStep}>
                  Previous
                </div>
                <button type="submit" className="s-btn btn-half btn-submit">
                  Submit
                </button>
              </div>
            </form>
            <button className="btn-cancel btn-cancel-confirmation" onClick={() => setShowCancelPopup(true)}>
              Cancel
            </button>
          </div>

          {showSuccessStep && (
            <div className="cnb-verify-success">
              <h4>Verify Your Email</h4>
              <p className="mail-verify-text">
                We sent an email to{" "}
                <a className="verified-email" href={`mailto:${emailEntered}`}>
                  {emailEntered}
                </a>
                . Please check your email and verify your account to continue the subscription process. If you don’t see
                our email, you may need to check your junk folder.
              </p>
            </div>
          )}
        </div>
      </div>

      {showCancelPopup && <CancelPopup closeCancelPopup={() => setShowCancelPopup(false)} />}
    </div>
  );
}
