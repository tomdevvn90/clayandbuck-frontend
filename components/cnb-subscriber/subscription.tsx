import SubscribeInfo from "./parts/subscribe-info";
import { useState } from "react";
import dynamic from "next/dynamic";
import { cnbGetPlanIntervalText } from "../../utils/global-functions";

const CancelPopup = dynamic(() => import("./parts/cancel-popup"), {
  ssr: false,
});

export default function Subscription({ gift, plansInfo }) {
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showPlanStep, setShowPlanStep] = useState("");
  const [showPaymentStep, setShowPaymentStep] = useState("hide");
  const [showBillingStep, setShowBillingStep] = useState("hide");
  const [showReviewStep, setShowReviewStep] = useState("hide");
  const [showSuccessStep, setShowSuccessStep] = useState("hide");

  const [crCountry, setCrCountry] = useState("");
  const [crPlan, setCrPlan] = useState("");

  const [activeNextBtn, setActiveNextBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [planErrorMessages, setPlanErrorMessages] = useState("");

  const handleNextPaymentStep = () => {
    if (!crCountry) {
      setPlanErrorMessages("Please choose your country.");
      return false;
    }
    if (!crPlan) {
      setPlanErrorMessages("Please choose your plan.");
      return false;
    }
    setShowPlanStep("hide");
    setShowPaymentStep("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setErrorMessages("");
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

          <div className="cnb-create-subs-form">
            <div className={`subs-step ${showPlanStep}`}>
              <h4>Pick Your Plan</h4>
              <p>
                You can change or cancel your plan anytime.{" "}
                <a href="<?php echo CNB_GIVE_THE_GIFT_URL; ?>" className="highlight">
                  Give as a gift
                </a>
              </p>
              <div className="step-form">
                {planErrorMessages && <p className="error-msg">{planErrorMessages}</p>}

                <div className="form-group">
                  <label htmlFor="cnb-country">Select your location:</label>
                  <select
                    className="form-control country-select"
                    name="cnb_country"
                    onChange={(e) => setCrCountry(e.target.value)}
                  >
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
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
                      const ckChecked = false; //planId == plan._id ? true : false;

                      return (
                        <div key={index} className="plan-radio">
                          <input
                            className="form-checkbox"
                            type="radio"
                            name="cnb_plan_id"
                            id={`cnb_plan_id_${index + 1}`}
                            value={plan._id}
                            onChange={(e) => setCrPlan(e.target.value)}
                            defaultChecked={ckChecked}
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
                    return "";
                  })}

                <div className="btn-set-inline">
                  <div className="s-btn btn-half" onClick={() => setShowCancelPopup(true)}>
                    Previous
                  </div>
                  <button className="s-btn btn-half btn-continue" onClick={handleNextPaymentStep}>
                    Continue
                  </button>
                </div>
                <div className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
                  Cancel
                </div>
              </div>
            </div>

            <div className={`subs-step ${showPaymentStep}`}>
              <h4>Enter Your Payment Details</h4>
              <p>You can change or cancel your plan anytime</p>
              <div className="step-form">
                <div className="credit-card-form">
                  <div className="row">
                    <div className="col-sm-12">
                      <form>
                        <input type="text" data-recurly="first_name" name="cnb_rc_f_name" className="rc-hide" />
                        <input type="text" data-recurly="last_name" name="cnb_rc_l_name" className="rc-hide" />
                        <input type="text" data-recurly="address1" name="cnb_rc_address_1" className="rc-hide" />
                        <input type="text" data-recurly="address2" name="cnb_rc_address_2" className="rc-hide" />
                        <input type="text" data-recurly="city" name="cnb_rc_city" className="rc-hide" />
                        <input type="text" data-recurly="state" name="cnb_rc_state" className="rc-hide" />
                        <input type="text" data-recurly="country" name="cnb_rc_country" className="rc-hide" />
                        <input type="text" data-recurly="postal_code" name="cnb_rc_postal_code" className="rc-hide" />
                        <input type="text" data-recurly="phone" name="cnb_rc_phone" className="rc-hide" />
                        <div data-recurly="card"></div>
                      </form>
                    </div>
                  </div>
                </div>
                <p className="error-msg"></p>
                <div className="btn-set-inline">
                  <button
                    className="s-btn btn-half"
                    onClick={() => {
                      setShowPlanStep("");
                      setShowPaymentStep("hide");
                    }}
                  >
                    Previous
                  </button>
                  <button className="s-btn btn-half btn-continue disabled">Continue</button>
                </div>
                <div className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
                  Cancel
                </div>
              </div>
            </div>

            <div className={`subs-step ${showBillingStep}`}>
              <h4>Enter Your Billing Info</h4>
              <p>You can change or cancel your plan anytime</p>
              <div className="step-form">
                <div className="row">
                  <div className="col-12 col-md-6 form-group pr-1">
                    <label htmlFor="cnb-first-name">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cnb-first-name"
                      name="cnb-first-name"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group pl-1">
                    <label htmlFor="cnb-last-name">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cnb-last-name"
                      name="cnb-last-name"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cnb-company">
                    Company<span>Optional</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cnb-company"
                    name="cnb-company"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cnb-phone">
                    Phone<span>Optional</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cnb-phone"
                    name="cnb-phone"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cnb-billing-address">Billing Address </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="cnb-billing-address-1"
                    name="cnb-billing-address-1"
                    placeholder="Address line 1"
                  />
                  <input
                    type="text"
                    className="form-control"
                    id="cnb-billing-address-2"
                    name="cnb-billing-address-2"
                    placeholder="Address line 2"
                  />
                </div>
                <div className="row">
                  <div className="col-12 col-lg-5 form-group pr-1">
                    <label htmlFor="cnb-city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cnb-city"
                      name="cnb-city"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="col-12 col-lg-4 form-group pr-1 pl-1">
                    <label htmlFor="cnb-state-providence">State/Province</label>
                    <select className="form-control" id="cnb-state-providence" name="cnb-state-providence"></select>
                  </div>
                  <div className="col-12 col-lg-3 form-group pl-1">
                    <label htmlFor="cnb-zip-code">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cnb-zip-code"
                      name="cnb-zip-code"
                      placeholder="Zip code"
                    />
                  </div>
                </div>

                <div className="btn-set-inline">
                  <button className="s-btn btn-half">Previous</button>
                  <button className="s-btn btn-half btn-continue disabled">Continue</button>
                </div>
                <div className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
                  Cancel
                </div>
              </div>
            </div>

            <div className={`subs-step ${showReviewStep}`}>
              <h4>Review and Submit</h4>
              <div className="mt-4">Order summary:</div>
              <div className="renewal-amount ">
                {/* <?php
                foreach (CNB_PLAN_INFO_LIST as $key => $plan) {
                    if ( $plan['active'] && strpos($plan['recurly_code'], 'gift') === false ) {
                        $s_text = ($plan['interval_count'] > 1) ? 's' : '';
                        $plan_interval = cnb_get_plan_interval_text($plan['interval']);
                        $interval_text = $plan['interval_count'] . ' ' . $plan_interval . $s_text;
                        $item_class = 'cnb-plan-item plan-id-'.$plan['_id'];
                        $interval_time_text .= '<span className="cnb-plan-item plan-id-'.$plan['_id'].'">'.$interval_text.'</span>';
                        $interval_price_text .= '<span className="cnb-plan-item plan-id-'.$plan['_id'].'">$'.$plan['amount'].'</span>';
                      ?>
                      <p className="<?php echo $item_class; ?>" style="text-transform: capitalize;">
                        <?php echo $interval_text; ?> Auto Renewal </p>
                      <p className="<?php echo $item_class; ?>">$<?php echo $plan['amount']; ?></p>
                <?php }
                } ?> */}
              </div>
              <div className="total-bill">
                <p>Total Billed </p>
                {/* <?php
                foreach (CNB_PLAN_INFO_LIST as $key => $plan) {
                    if ( $plan['active'] && strpos($plan['recurly_code'], 'gift') === false ) {
                        $item_class = 'cnb-plan-item plan-id-'.$plan['_id'];
                      ?>
                      <p className="<?php echo $item_class; ?>">$<?php echo $plan['amount']; ?></p>
                <?php }
                } ?> */}
              </div>
              <p className="text-right">
                <small>+ sales tax where applicable</small>
              </p>
              <div className="auto-renewal-description">
                <p className="automatic-title">Automatic Renewal:</p>
                <p>
                  Auto renewal means your subscription will be automatically renewed using the credit card you signed up
                  with, at the same rate, and term. You will receive an e-mail notification from C&B VIP prior to your
                  expiration date. For C&B VIP subscribers who have selected a one-year term, an auto renewal notice
                  will be sent at least 30 days prior to the expire date, at which point you will be automatically
                  charged US $interval_price_text each interval_time_text until you cancel. You will be notified prior
                  to your automatic renewal if subscription prices change. Of course, you may cancel your subscription
                  any time by sending an e-mail to: help@clayandbuck.com. Sorry, partial months cannot be refunded.
                  <br />
                  <br />
                  By subscribing you agree to Automatic Renewal as described above, our User Agreement, and Privacy
                  Policy & Cookie Statement.
                </p>
              </div>
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="cnb-accept-auto-renewal"
                  id="cnb-accept-auto-renewal"
                />
                <label className="custom-control-label" htmlFor="cnb-accept-auto-renewal">
                  I accept auto-renewal
                </label>
              </div>
              <div className="custom-checkbox mb-1">
                <input type="checkbox" className="custom-control-input" id="cnb-accept-terms" name="cnb-accept-terms" />
                <label className="custom-control-label" htmlFor="cnb-accept-terms">
                  I accept<b> Terms of Use & Privacy Policy</b>
                </label>
              </div>
              <a href="/optout" className="not-sell-personal-info">
                Do Not Sell or Share My Personal Information
              </a>
              <p className="error-msg"></p>
              <div className="btn-set-inline">
                <button className="s-btn btn-half">Previous</button>
                <button className="s-btn btn-half btn-submit disabled">Subscribe</button>
              </div>
              <div className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
                Cancel
              </div>
            </div>

            <div className={`subs-step ${showSuccessStep}`}>
              <h4>You have successfully subscribed to C&B VIP</h4>
              <p>
                You will receive an email with your order confirmation. To change your settings, update your account
                information, or cancel your subscription at a later date, please visit the My Account section.
              </p>

              <div className="btn-set-inline mt-4">
                <a href="/" className="btn btn-full btn-submit">
                  Return to Site
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCancelPopup && <CancelPopup closeCancelPopup={() => setShowCancelPopup(false)} />}
    </div>
  );
}
