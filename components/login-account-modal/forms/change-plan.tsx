import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlansInfo } from "../../../lib/normal-api";
import { cnbGetPlanIntervalText } from "../../../utils/global-functions";

export default function ChangePlanForm({ accountInfo }) {
  const [plansInfo, setPlansInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmStep, setShowConfirmStep] = useState(false);
  const [activeConfirmBtn, setActiveConfirmBtn] = useState(false);

  let country = "";
  let billingName = "";
  let billingAddress = "";
  let paymentMethod = "";

  const subscriptions = accountInfo.subscription_plans[0];
  const subsId = subscriptions._id;
  const planId = "624c73c4f97fc70001dc2c74"; //subscriptions.plan_id;
  const subsInterval = subscriptions.interval;

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
  const isYearActive = false; //subsInterval == "year" || subsInterval.toLowerCase() == "annual" ? true : false;
  const isCancelSubs = subscriptions.cancel_at_period_end ? true : false;

  useEffect(() => {
    const getPlans = async () => {
      const plansInfoRes = await getPlansInfo();
      if (plansInfoRes.success) {
        setPlansInfo(plansInfoRes.plansInfo);
      }
      setIsLoading(false);
    };
    getPlans();
    return () => {};
  }, []);

  let sText = "",
    planInterval = "",
    intervalText = "",
    ckChecked = "",
    wrapClass = "",
    labelClass = "";
  let ckDisable = false;

  const handlePlanChange = (e) => {
    if (e.target.value != planId) {
      setActiveConfirmBtn(true);
    } else {
      setActiveConfirmBtn(false);
    }
  };

  const handleSubmit = () => {};

  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <div className="cnb-spinner-loading"></div>
      </div>
    );
  }

  if (plansInfo.length == 0) {
    return <p className="error-msg big-error-msg">Something went wrong. Please reload page and try again!</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {!showConfirmStep && (
          <div className="cnb-update-plan-form-step">
            <h2>Change Plan</h2>
            <div className="help-text">
              <p>
                If you wish to downgrade your account, please contact our support team at{" "}
                <a href="mailto:help@clayandbuck.com">help@clayandbuck.com</a>
              </p>
            </div>
            <label>Select your plan: </label>

            {plansInfo.length > 0 &&
              plansInfo.map((plan, index) => {
                let intervalCount = plan.interval_count;

                if (plan.active && plan.recurly_code.includes("gift") === false) {
                  sText = intervalCount > 1 ? "s" : "";
                  planInterval = cnbGetPlanIntervalText(plan.interval);
                  intervalText = `${intervalCount}  ${planInterval}${sText}`;
                  ckDisable = isCancelSubs || (isYearActive && planId != plan._id) ? true : false;
                  ckChecked = planId == plan._id ? "checked" : "";
                  wrapClass = ckDisable ? "plan-radio disabled" : "plan-radio";
                  labelClass = isYearActive ? `form-label ${ckChecked}` : "form-label";

                  return (
                    <div key={index} className={wrapClass}>
                      {!isCancelSubs && !isYearActive && (
                        <input
                          className="form-checkbox"
                          type="radio"
                          name="cnb_plan_id"
                          id={`cnb_plan_id_${index + 1}`}
                          value={plan._id}
                          onChange={(e) => handlePlanChange(e)}
                          defaultChecked={Boolean(ckChecked)}
                        />
                      )}
                      <label className={labelClass} htmlFor={`cnb_plan_id_${index + 1}`}>
                        <strong>
                          {intervalText} for ${plan.amount}
                        </strong>
                        <span>Auto-renews after {intervalText}</span>
                      </label>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}

            {/* <input type="hidden" name="cnb-subs-id" value={subsId} /> */}

            {activeConfirmBtn ? (
              <div className="btn" onClick={() => setShowConfirmStep(true)}>
                Upgrade
              </div>
            ) : (
              <div className="btn disabled">Upgrade</div>
            )}

            <hr />
          </div>
        )}

        {showConfirmStep && (
          <div className="cnb-confirm-plan-step">
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
                <strong>Name: </strong>
                {billingName}
              </p>
              <p>
                <strong>Address: </strong>
                {billingAddress}
              </p>
              <p>
                <strong>Payment Method: </strong>
                {paymentMethod}
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
            <div className="declaimer">
              <p>
                Auto renewal means your subscription will be automatically renewed using the credit card you signed up
                with, at the same rate, and term. You will receive an e-mail notification from C&B VIP prior to your
                expiration date. For C&B VIP subscribers who have selected a one-year term, an auto-renewal notice will
                be sent at least 30 days prior to the expiration date, at which point you will be automatically charged
                US interval_price_text every interval_time_text until you cancel. You will be notified prior to your
                automatic renewal if subscription prices change. Of course, you may cancel your subscription any time by
                sending an e-mail to: help@clayandbuck.com. Sorry, partial months cannot be refunded
              </p>{" "}
              <p>
                By subscribing you agree to Automatic Renewal as described above, our{" "}
                <Link href="/terms-conditions/">Terms of Use</Link> and{" "}
                <Link href="/privacy-policy/">Privacy Policy.</Link>{" "}
              </p>
            </div>
            <div className="btn-set-inline">
              <button className="btn-submit">Confirm Change</button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
