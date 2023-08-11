import { getCookie } from "cookies-next";
import { useState } from "react";
import { setACookieF } from "../../../utils/global-functions";
import { cancelSubscriptionPlan } from "../../../lib/normal-api";

export default function CancelSubscription({ refAccInfo, subsId }) {
  const [errorMessages, setErrorMessages] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const accessToken = getCookie("STYXKEY_ACCESS_TOKEN").toString();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSuccess(false);
    setErrorMessages("");

    if (!subsId || !accessToken) {
      setErrorMessages("Something went wrong. Please reload the page and try again");
      return false;
    }

    setIsLoading(true);

    const cancelSubsData = await cancelSubscriptionPlan(accessToken, subsId);
    // console.log(cancelSubsData);

    if (cancelSubsData.success) {
      setACookieF("STYXKEY_USER_CANCELLED_SUBS", "cancelled");

      setIsSuccess(true);
      setIsLoading(false);
      refAccInfo();
    } else {
      if (cancelSubsData.error_message) {
        setErrorMessages(cancelSubsData.error_message);
      } else {
        setErrorMessages("Something went wrong. Please try again!");
      }
      setIsLoading(false);
    }
  };

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return (
    <div className="cnb-cancel-plan">
      <div className="change-row">
        <h2>Cancel Subscription</h2>
      </div>

      {errorMessages && <p className="error-msg">{errorMessages}</p>}

      {isSuccess ? (
        <p className="success-msg">Your account has been successfully cancelled.</p>
      ) : (
        <>
          <div className="change-row">
            <p>
              Click the button below to cancel your subscription to C&B VIP. There are no partial refunds offered at
              this time.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <button type="submit" className={btnClass}>
              {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Cancel Subscription</span>}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
