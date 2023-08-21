import ChangePlanForm from "./change-plan";
import CancelSubscription from "./cancel-subscription";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { reactiveSubscriptionPlan } from "../../../lib/normal-api";
import { deleteACookieF } from "../../../utils/global-functions";

export default function UpdateSubscription({ refreshAccInfo, accountInfo, showAccInfo }) {
  const [showCancelSubs, setShowCancelSubs] = useState(false);
  const [isReactiveLoading, setIsReactiveLoading] = useState(false);
  const [isReactiveSuccess, SetIsReactiveSuccess] = useState(false);
  const [reactiveErrorMessages, setReactiveErrorMessages] = useState("");

  // console.log(accountInfo);

  const subscriptions = accountInfo.subscription_plans[0];
  const subsId = subscriptions._id;

  const handleReactiveSubs = async () => {
    SetIsReactiveSuccess(false);

    const accessToken = getCookie("STYXKEY_ACCESS_TOKEN").toString();
    if (!subsId || !accessToken) {
      setReactiveErrorMessages("Something went wrong. Please reload the page and try again");
      return false;
    }

    setIsReactiveLoading(true);

    const reactiveSubsData = await reactiveSubscriptionPlan(accessToken, subsId);
    // console.log(cancelSubsData);

    if (reactiveSubsData.success) {
      deleteACookieF("STYXKEY_USER_CANCELLED_SUBS");
      SetIsReactiveSuccess(true);
      setIsReactiveLoading(false);
      refreshAccInfo();
    } else {
      if (reactiveSubsData.error_message) {
        setReactiveErrorMessages(reactiveSubsData.error_message);
      } else {
        setReactiveErrorMessages("Something went wrong. Please try again!");
      }
      setIsReactiveLoading(false);
    }
  };

  const reactiveBtnClass = isReactiveLoading ? "btn-editable loading" : "btn-editable";
  return (
    <div className="account-edit-box">
      <div>
        <a className="back-to-acc-info" onClick={showAccInfo}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.5825 9.00021H3.4125L8.2925 13.8802C8.6825 14.2702 8.6825 14.9102 8.2925 15.3002C7.9025 15.6902 7.2725 15.6902 6.8825 15.3002L0.2925 8.71021C-0.0975 8.32021 -0.0975 7.69022 0.2925 7.30022L6.8725 0.700215C7.2625 0.310215 7.8925 0.310215 8.2825 0.700215C8.6725 1.09021 8.6725 1.72022 8.2825 2.11022L3.4125 7.00022H14.5825C15.1325 7.00022 15.5825 7.45021 15.5825 8.00022C15.5825 8.55021 15.1325 9.00021 14.5825 9.00021Z"
              fill="#B2922C"
            ></path>
          </svg>
          Back to Account Settings
        </a>
      </div>
      {!showCancelSubs && (
        <>
          <div className="change-plan-form">
            <ChangePlanForm accountInfo={accountInfo} />
          </div>

          <div className="active-cancel-subs">
            {subscriptions.cancel_at_period_end || isReactiveSuccess ? (
              <>
                {!isReactiveSuccess && (
                  <button className={reactiveBtnClass} onClick={handleReactiveSubs}>
                    {isReactiveLoading ? <span className="cnb-spinner-loading"></span> : <span>Reactivate</span>}
                  </button>
                )}
                <h3>Reactivate Subscription</h3>

                {reactiveErrorMessages && <p className="error-msg">{reactiveErrorMessages}</p>}

                {isReactiveSuccess ? (
                  <p className="success-msg">Your account has been successfully reactivated.</p>
                ) : (
                  <p>
                    Re-subscribing allows you to access C&B VIP after the current billing cycle. Your subscription will
                    be set to auto-renew.
                  </p>
                )}
              </>
            ) : (
              <>
                <button className="btn-editable" onClick={() => setShowCancelSubs(true)}>
                  Cancel
                </button>
                <h3>Cancel Subscription</h3>
                <p>
                  Canceling your subscription allows you to access C&B VIP features through the end of your current
                  billing cycle. After that, you won't be charged again, but you also won't be able to access C&B VIP
                  features.
                </p>
              </>
            )}
          </div>
        </>
      )}

      {showCancelSubs && <CancelSubscription refAccInfo={refreshAccInfo} subsId={subscriptions._id} />}
    </div>
  );
}
