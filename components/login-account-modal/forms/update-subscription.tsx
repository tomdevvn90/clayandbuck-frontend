import Link from "next/link";
import { useState } from "react";
import CancelSubscription from "./cancel-subscription";
import { getCookie } from "cookies-next";
import { reactiveSubscriptionPlan } from "../../../lib/normal-api";
import { deleteACookieF } from "../../../utils/global-functions";

export default function UpdateSubscription({ refreshAccInfo, accountInfo, showAccInfo }) {
  const [showCancelSubs, setShowCancelSubs] = useState(false);
  const [isReactiveLoading, setIsReactiveLoading] = useState(false);
  const [isReactiveSuccess, SetIsReactiveSuccess] = useState(false);
  const [reactiveErrorMessages, setReactiveErrorMessages] = useState("");

  let country = "";
  let billingName = "";
  let billingAddress = "";
  let paymentMethod = "";

  console.log(accountInfo);

  const subscriptions = accountInfo.subscription_plans[0];
  const subsId = subscriptions._id;

  const billingInfo = accountInfo.billing_info;
  if (billingInfo) {
    const billingAddr = billingInfo.address;
    const paymentMeth = billingInfo.paymentMethod;
    if (billingInfo.firstName) {
      billingName = `${billingInfo.firstName} ${billingInfo.lastName}`;
    }
    if (billingAddr.street1) {
      billingAddress = `${billingAddr.street1}, ${billingAddr.city}, ${billingAddr.region}, ${billingAddr.postalCode}, ${billingAddr.country}`;
    }
    if (paymentMeth.cardType) {
      paymentMethod = `${paymentMeth.cardType} ending ${paymentMeth.lastFour}`;
    }
    country = billingAddr.country;
  }

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
          <form className="plan-change-form" data-country={country} data-plan-id={subscriptions.plan_id}>
            <div className="cnb-update-plan-form-step">
              <div className="change-email-row">
                <h2>Change Plan</h2>
              </div>
              <div className="help-text">
                <p>
                  If you wish to downgrade your account, please contact our support team at{" "}
                  <a href="mailto:help@clayandbuck.com">help@clayandbuck.com</a>
                </p>
              </div>
              <label>Select your plan: </label>
              {/* <?php
                $is_year_actived = ($subscriptions['interval'] == 'year' || strtolower($subscriptions['interval']) == 'annual') ? true : false;
                $is_cancel_subs = ($subscriptions['cancel_at_period_end']) ? true : false;
                foreach (CNB_PLAN_INFO_LIST as $key => $plan) {
                    if ( $plan['active'] && strpos($plan['recurly_code'], 'gift') === false ) {
                        $s_text = ($plan['interval_count'] > 1) ? 's' : '';
                        $plan_interval = cnb_get_plan_interval_text($plan['interval']);
                        $interval_text = $plan['interval_count'] . ' ' . $plan_interval . $s_text;
                        $disable = ( $is_cancel_subs || ($is_year_actived && $plan_id != $plan['_id']) ) ? true : false;
                        $checked = ($plan_id == $plan['_id']) ? "checked" : "";
                      ?>
                      <div className="plan-radio <?php if ( $disable ) echo 'disabled'; ?>">
                        <?php if ( ! $is_cancel_subs && ! $is_year_actived ) : ?>
                        <input className="form-check-input" type="radio" name="cnb_plan_id" id="cnb_plan_id_<?php echo $key+1; ?>"
                            value="<?php echo $plan['_id']; ?>" <?php echo $checked; ?>>
                        <?php endif; ?>
                        <label className="form-check-label label <?php if ($is_year_actived) echo $checked; ?>" for="cnb_plan_id_<?php echo $key+1; ?>">
                          <strong><?php echo $interval_text; ?> for $<?php echo $plan['amount']; ?></strong>
                          <span>Auto-renews after <?php echo $interval_text; ?></span>
                        </label>
                      </div>
                <?php }
                } ?> */}
              <div className="plan-radio <?php if ( $disable ) echo 'disabled'; ?>">
                {true && (
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cnb_plan_id"
                    id="cnb_plan_id_key_1"
                    value="$plan['_id']"
                    checked
                  />
                )}

                <label
                  className="form-check-label label <?php if ($is_year_actived) echo $checked; ?>"
                  htmlFor="cnb_plan_id_key_1"
                >
                  <strong>interval_text for $plan['amount']</strong>
                  <span>Auto-renews after interval_text</span>
                </label>
              </div>
              <div className="btn-set-inline">
                <input type="hidden" name="cnb-subs-id" value="<?php echo $subscriptions['_id']; ?>" />
                <button className="btn btn-full btn-submit btn-upgrade disabled">Upgrade</button>
              </div>
              <hr />
            </div>
            <div className="cnb-confirm-plan-step" style={{ display: "none" }}>
              {/* // <?php
              // $interval_time_text = $interval_price_text = "";
              // foreach (CNB_PLAN_INFO_LIST as $key => $plan) {
              //     if ( $plan['active'] && strpos($plan['recurly_code'], 'gift') === false ) {
              //         $s_text = ($plan['interval_count'] > 1) ? 's' : '';
              //         $plan_interval = cnb_get_plan_interval_text($plan['interval']);
              //         $interval_text = $plan['interval_count'] . ' ' . $plan_interval . $s_text;
              //         $interval_time_text .= '<span className="cnb-plan-item plan-id-'.$plan['_id'].'">'.$interval_text.'</span>';
              //         $interval_price_text .= '<span className="cnb-plan-item plan-id-'.$plan['_id'].'">$'.$plan['amount'].'</span>';
              //     }
              // } ?> */}
              <div className="change-row plan-confirm">
                <h2>Change to interval_time_text Plan</h2>
              </div>
              <div className="change-plan-error change-text account-error-text">
                <p></p>
              </div>
              <div className="login-billing cancel-subs">
                <button id="cnb-edit-billing" className="btn btn-editable">
                  Edit
                </button>
                <h2>Billing Information</h2>
                <p>
                  <strong>Name: </strong>billing_name
                </p>
                <p>
                  <strong>Address: </strong>billing_address_text
                </p>
                <p>
                  <strong>Payment Method: </strong>payment_method_text
                </p>
              </div>
              <div className="login-billing cancel-subs">
                <h2>What Happens Next:</h2>
                <ul>
                  <li>Your new interval_time_text plan starts today.</li>
                  <li>You’ll be charged interval_price_text (auto renews each interval_time_text).</li>
                  <li>We’ll apply the remainder of your current bill to your new plan.</li>
                </ul>
              </div>
              <div className="changeplan-desclaimer">
                <p>
                  Auto renewal means your subscription will be automatically renewed using the credit card you signed up
                  with, at the same rate, and term. You will receive an e-mail notification from C&B VIP prior to your
                  expiration date. For C&B VIP subscribers who have selected a one-year term, an auto-renewal notice
                  will be sent at least 30 days prior to the expiration date, at which point you will be automatically
                  charged US interval_price_text every interval_time_text until you cancel. You will be notified prior
                  to your automatic renewal if subscription prices change. Of course, you may cancel your subscription
                  any time by sending an e-mail to: help@clayandbuck.com. Sorry, partial months cannot be refunded
                </p>{" "}
                <p>
                  By subscribing you agree to Automatic Renewal as described above, our{" "}
                  <Link href="/terms-conditions/">Terms of Use</Link> and{" "}
                  <Link href="/privacy-policy/">Privacy Policy.</Link>{" "}
                </p>
              </div>
              <div className="btn-set-inline">
                <button className="btn btn-full btn-submit btn-change">Confirm Change</button>
              </div>
            </div>
          </form>

          <div className="active-cancel-subs">
            {subscriptions.cancel_at_period_end ? (
              <>
                <button id="cnb-reactive-subs" className="btn-editable">
                  {isReactiveLoading ? <span className="cnb-spinner-loading"></span> : <span>Reactivate</span>}
                </button>
                <h3>Reactivate Subscription</h3>
                <p>
                  Re-subscribing allows you to access C&B VIP after the current billing cycle. Your subscription will be
                  set to auto-renew.
                </p>
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
