import Link from "next/link";
import { useEffect, useState } from "react";
import { changePlanSubs, getPlansInfo } from "../../../lib/normal-api";
import { cnbGetPlanIntervalText } from "../../../utils/global-functions";
import { getCookie } from "cookies-next";

export default function ChangePlanForm({ accountInfo, hideCanReSubs, showUpdateBillingInfo }) {
  const [plansInfo, setPlansInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmStep, setShowConfirmStep] = useState(false);
  const [activeConfirmBtn, setActiveConfirmBtn] = useState(false);
  const [crIntervalTimeText, setCrIntervalTimeText] = useState("");
  const [crIntervalPriceText, setCrIntervalPriceText] = useState("");
  const [planSelected, setPlanSelected] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [isChangePlanLoading, setIsChangePlanLoading] = useState(false);
  const [isChangePlanSuccess, setIsChangePlanSuccess] = useState(false);

  let billingName = "";
  let billingAddress = "";
  let paymentMethod = "";

  const subscriptions = accountInfo.subscription_plans[0];
  const subsId = subscriptions._id;
  const planId = subscriptions.plan_id; //"624c73c4f97fc70001dc2c74"; //
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
  }
  const isYearActive = subsInterval == "year" || subsInterval.toLowerCase() == "annual" ? true : false;
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

  const handlePlanChange = (e, intervalTime, intervalPrice) => {
    if (e.target.value != planId) {
      setActiveConfirmBtn(true);
      setPlanSelected(e.target.value);
      setCrIntervalTimeText(intervalTime);
      setCrIntervalPriceText(`$${intervalPrice}`);
    } else {
      setActiveConfirmBtn(false);
    }
  };

  const handleShowConfirmStep = () => {
    hideCanReSubs();
    setShowConfirmStep(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsChangePlanSuccess(false);
    setErrorMessages("");

    const accessToken = getCookie("STYXKEY_ACCESS_TOKEN").toString();

    if (!subsId || !accessToken || !planSelected) {
      setErrorMessages("Something went wrong. Please reload the page and try again");
      return false;
    }

    setIsChangePlanLoading(true);

    const changePlanData = await changePlanSubs(accessToken, planSelected, subsId);
    // console.log(cancelSubsData);

    if (changePlanData.success) {
      setIsChangePlanSuccess(true);
    } else {
      if (changePlanData.error_message) {
        setErrorMessages(changePlanData.error_message);
      } else {
        setErrorMessages("Something went wrong. Please try again!");
      }
    }
    setIsChangePlanLoading(false);
  };

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

  const btnClass = isChangePlanLoading ? "btn-submit loading" : "btn-submit";
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
                if (plan.active && plan.recurly_code.includes("gift") === false) {
                  const intervalCount = plan.interval_count;
                  const sText = intervalCount > 1 ? "s" : "";
                  const planInterval = cnbGetPlanIntervalText(plan.interval);
                  const intervalText = `${intervalCount} ${planInterval}${sText}`;
                  const ckDisable = isCancelSubs || (isYearActive && planId != plan._id) ? true : false;
                  const ckChecked = planId == plan._id ? "checked" : "";
                  const wrapClass = ckDisable ? "plan-radio disabled" : "plan-radio";
                  const labelClass = isYearActive ? `form-label ${ckChecked}` : "form-label";

                  return (
                    <div key={index} className={wrapClass}>
                      {!isCancelSubs && !isYearActive && (
                        <input
                          className="form-checkbox"
                          type="radio"
                          name="cnb_plan_id"
                          id={`cnb_plan_id_${index + 1}`}
                          value={plan._id}
                          onChange={(e) => handlePlanChange(e, intervalText, plan.amount)}
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
                  return "";
                }
              })}

            {activeConfirmBtn ? (
              <div className="btn" onClick={handleShowConfirmStep}>
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
            <div className="change-row plan-confirm">
              <h2>Change to {crIntervalTimeText} Plan</h2>
            </div>

            {errorMessages && <p className="error-msg">{errorMessages}</p>}

            {isChangePlanSuccess ? (
              <p className="success-msg">
                Your subscription has been successfully changed. It may take a few minutes for your account to reflect
                the updates.
              </p>
            ) : (
              <>
                <div className="row-info">
                  <div className="btn-editable" onClick={showUpdateBillingInfo}>
                    Edit
                  </div>
                  <h3>Billing Information</h3>
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
                <div className="row-info">
                  <h3>What Happens Next:</h3>
                  <ul>
                    <li>Your new {crIntervalTimeText} plan starts today.</li>
                    <li>
                      You’ll be charged {crIntervalPriceText} (auto renews each {crIntervalTimeText}).
                    </li>
                    <li>We’ll apply the remainder of your current bill to your new plan.</li>
                  </ul>
                </div>
                <div className="declaimer">
                  <p>
                    Auto renewal means your subscription will be automatically renewed using the credit card you signed
                    up with, at the same rate, and term. You will receive an e-mail notification from C&B VIP prior to
                    your expiration date. For C&B VIP subscribers who have selected a one-year term, an auto-renewal
                    notice will be sent at least 30 days prior to the expiration date, at which point you will be
                    automatically charged US {crIntervalPriceText} every {crIntervalTimeText} until you cancel. You will
                    be notified prior to your automatic renewal if subscription prices change. Of course, you may cancel
                    your subscription any time by sending an e-mail to: help@clayandbuck.com. Sorry, partial months
                    cannot be refunded
                  </p>{" "}
                  <p>
                    By subscribing you agree to Automatic Renewal as described above, our{" "}
                    <Link href="/terms-conditions/">Terms of Use</Link> and{" "}
                    <Link href="/privacy-policy/">Privacy Policy.</Link>{" "}
                  </p>
                </div>

                <button type="submit" className={btnClass}>
                  {isChangePlanLoading ? <span className="cnb-spinner-loading"></span> : <span>Confirm Change</span>}
                </button>
              </>
            )}
          </div>
        )}
      </form>
    </>
  );
}
