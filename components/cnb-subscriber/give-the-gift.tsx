import SubscribeInfo from "./parts/subscribe-info";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  cnbCheckZipCodeMatchStateForCA,
  cnbGetPlanIntervalText,
  cnbGetStateByZipCodeForUS,
} from "../../utils/global-functions";
import { CardElement, useRecurly } from "@recurly/react-recurly";
import { cnbRenderCountryStates } from "../../utils/html-render-functions";
import { createGiftSubscription, createSubscription } from "../../lib/normal-api";
import { getCookie } from "cookies-next";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const CancelPopup = dynamic(() => import("./parts/cancel-popup"), {
  ssr: false,
});

export default function GiveTheGift({ gift, plansInfoRes }) {
  const formRef = useRef();
  const recurly = useRecurly();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const isSubscribe = getCookie("STYXKEY_USER_SUBSCRIBED");
  const plansInfo = plansInfoRes.success ? plansInfoRes.plansInfo : [];
  const userPlanId = plansInfoRes.success ? plansInfoRes.userPlanId : "";

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showPlanStep, setShowPlanStep] = useState("");
  const [showRecipientStep, setShowRecipientStep] = useState("hide");
  const [showPaymentStep, setShowPaymentStep] = useState("hide");
  const [showBillingStep, setShowBillingStep] = useState("hide");
  const [showReviewStep, setShowReviewStep] = useState("hide");
  const [showSuccessStep, setShowSuccessStep] = useState("hide");

  // const [crRecipientCountry, setCrRecipientCountry] = useState("");
  const [crCountry, setCrCountry] = useState("");
  const [crPlan, setCrPlan] = useState(userPlanId);
  const [crRecipientName, setCrRecipientName] = useState("");
  const [crRecipientEmail, setCrRecipientEmail] = useState("");
  const [crFirstName, setCrFirstName] = useState("");
  const [crLastName, setCrLastName] = useState("");
  const [crCompany, setCrCompany] = useState("");
  const [crPhone, setCrPhone] = useState("");
  const [crAddr1, setCrAddr1] = useState("");
  const [crAddr2, setCrAddr2] = useState("");
  const [crCity, setCrCity] = useState("");
  const [crState, setCrState] = useState("");
  const [crZipCode, setCrZipCode] = useState("");
  const [crAcceptTerm, setCrAcceptTerm] = useState(false);
  const [crIntervalText, setCrIntervalText] = useState("");
  const [crIntervalPrice, setCrIntervalPrice] = useState("");

  const [isCardValid, setIsCardValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [planErrorMessages, setPlanErrorMessages] = useState("");
  const [recipientErrorMessages, setRecipientErrorMessages] = useState("");
  const [cardErrorMessages, setCardErrorMessages] = useState("");
  const [billingErrorMessages, setBillingErrorMessages] = useState("");
  const [reviewErrorMessages, setReviewErrorMessages] = useState("");

  // const [rpCountryClass, setRpCountryClass] = useState("");
  const [rpNameClass, setRpNameClass] = useState("");
  const [rpEmailClass, setRpEmailClass] = useState("");
  const [firstNameClass, setFirstNameClass] = useState("");
  const [lastNameClass, setLastNameClass] = useState("");
  const [addr1Class, setAddr1Class] = useState("");
  const [cityClass, setCityClass] = useState("");
  const [stateClass, setStateClass] = useState("");
  const [zipCodeClass, setZipCodeClass] = useState("");

  useEffect(() => {
    for (var i = 0; i < plansInfo.length; i++) {
      let plan = plansInfo[i];
      if (plan.active && plan.recurly_code.includes("gift") !== false) {
        const intervalCount = plan.interval_count;
        const sText = intervalCount > 1 ? "s" : "";
        const planInterval = cnbGetPlanIntervalText(plan.interval);
        const intervalText = `${intervalCount} ${planInterval}${sText}`;

        if (userPlanId == plan._id) {
          setCrIntervalText(intervalText);
          setCrIntervalPrice(plan.amount);
          break;
        }
      }
    }
  }, []);

  const handleNextRecipientStep = () => {
    setPlanErrorMessages("");
    if (!crCountry) {
      setPlanErrorMessages("Please choose your country.");
      return false;
    }
    if (!crPlan) {
      setPlanErrorMessages("Please choose your plan.");
      return false;
    }
    setShowPlanStep("hide");
    setShowRecipientStep("");
  };

  const handleNextPaymentStep = () => {
    setRecipientErrorMessages("");
    setRpNameClass("");
    setRpEmailClass("");
    // setRpCountryClass("");

    // if (!crRecipientCountry) {
    //   setRecipientErrorMessages("Please choose Recipient's Country.");
    //   setRpCountryClass("error");
    //   return false;
    // }
    if (!crRecipientName) {
      setRecipientErrorMessages("Please choose Recipient's Name.");
      setRpNameClass("error");
      return false;
    }
    if (!crRecipientEmail) {
      setRecipientErrorMessages("Please choose Recipient's Email.");
      setRpEmailClass("error");
      return false;
    }

    setShowRecipientStep("hide");
    setShowPaymentStep("");
  };

  const handleNextBillingStep = () => {
    setPlanErrorMessages("");
    if (!isCardValid) {
      setCardErrorMessages("Please enter valid card info.");
    } else {
      setShowBillingStep("");
      setShowPaymentStep("hide");
    }
  };

  const handleNextReviewStep = () => {
    setFirstNameClass("");
    setLastNameClass("");
    setAddr1Class("");
    setCityClass("");
    setStateClass("");
    setZipCodeClass("");
    setBillingErrorMessages("");

    if (!crFirstName) {
      setBillingErrorMessages("Please enter your First name.");
      setFirstNameClass("error");
      return false;
    }
    if (!crLastName) {
      setBillingErrorMessages("Please enter your Last name.");
      setLastNameClass("error");
      return false;
    }
    if (!crAddr1) {
      setBillingErrorMessages("Please enter your Address 1.");
      setAddr1Class("error");
      return false;
    }
    if (!crCity) {
      setBillingErrorMessages("Please enter your City.");
      setCityClass("error");
      return false;
    }
    if (!crState) {
      setBillingErrorMessages("Please enter your State/Province.");
      setStateClass("error");
      return false;
    }
    if (!crZipCode) {
      setBillingErrorMessages("Please enter your Zip Code.");
      setZipCodeClass("error");
      return false;
    }
    if (crCountry == "US" && cnbGetStateByZipCodeForUS(crZipCode) != crState) {
      setBillingErrorMessages("Zip Code is not correct with State.");
      setZipCodeClass("error");
      return false;
    }
    if (crCountry == "CA" && !cnbCheckZipCodeMatchStateForCA(crState, crZipCode)) {
      setBillingErrorMessages("Zip Code is not correct with State.");
      setZipCodeClass("error");
      return false;
    }

    setShowBillingStep("hide");
    setShowReviewStep("");
  };

  const handleSubscription = async () => {
    setReviewErrorMessages("");

    if (!crAcceptTerm) {
      setReviewErrorMessages("Please accept accept terms.");
      return false;
    }

    const accessToken = getCookie("STYXKEY_ACCESS_TOKEN");
    if (!accessToken) {
      setReviewErrorMessages("Something went wrong. Please reload the page and try again.");
      return false;
    }

    setIsLoading(true);
    recurly.token(formRef.current, async (err, token) => {
      if (err) {
        setReviewErrorMessages("Please recheck and enter valid card info.");
        setIsLoading(false);
        return false;
      } else {
        const recurlyToken = token ? token.id : "";

        // Check recurly token
        if (!recurlyToken) {
          setReviewErrorMessages("Please recheck and enter valid card info.");
          setIsLoading(false);
          return false;
        }

        // Check Google Recaptcha
        if (!executeRecaptcha) {
          console.log("Execute recaptcha not yet available");
          setReviewErrorMessages(`Something went wrong. Please try again!`);
          setIsLoading(false);
          return false;
        }

        const grecaptchaToken = await executeRecaptcha("giftee_account");
        if (grecaptchaToken) {
          const createGiftSubsRes = await createGiftSubscription(
            accessToken.toString(),
            recurlyToken,
            grecaptchaToken,
            crPlan,
            crRecipientEmail,
            crRecipientName
          );
          // console.log(createGiftSubsRes);

          if (createGiftSubsRes.success) {
            setShowSuccessStep("");
            setShowReviewStep("hide");
          } else {
            if (createGiftSubsRes.error_message) {
              setReviewErrorMessages(createGiftSubsRes.error_message);
            } else {
              setReviewErrorMessages("Something went wrong. Please try again!");
            }
          }
        } else {
          console.log("Cannot get recaptcha token");
          setReviewErrorMessages(`Something went wrong. Please try again!`);
        }
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="sign-up-wrap gift-subs">
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

          <div className={`subs-step ${showPlanStep}`}>
            {plansInfo.length > 0 ? (
              <>
                <h4>Pick Your Gift Plan</h4>
                {!isSubscribe && (
                  <p>
                    <Link href="/cnb-subscription/" className="highlight">
                      Add a subscription to your account
                    </Link>
                  </p>
                )}

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
                  {plansInfo.map((plan, index) => {
                    if (plan.active && plan.recurly_code.includes("gift") !== false) {
                      const intervalCount = plan.interval_count;
                      const sText = intervalCount > 1 ? "s" : "";
                      const planInterval = cnbGetPlanIntervalText(plan.interval);
                      const intervalText = `${intervalCount} ${planInterval}${sText}`;
                      const ckChecked = userPlanId == plan._id ? true : false;

                      return (
                        <div key={index} className="plan-radio">
                          <input
                            className="form-checkbox"
                            type="radio"
                            name="cnb_plan_id"
                            id={`cnb_plan_id_${index + 1}`}
                            value={plan._id}
                            onChange={(e) => {
                              setCrPlan(e.target.value);
                              setCrIntervalText(intervalText);
                              setCrIntervalPrice(plan.amount);
                            }}
                            defaultChecked={ckChecked}
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
                    <button className="s-btn btn-half" onClick={() => setShowCancelPopup(true)}>
                      Previous
                    </button>
                    <button className="s-btn btn-half btn-continue" onClick={handleNextRecipientStep}>
                      Continue
                    </button>
                  </div>
                  <button className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p className="error-msg">Something went wrong. Please reload the page and try again.</p>
            )}
          </div>

          <div className={`subs-step ${showRecipientStep}`}>
            <h4>Enter Your Gift Recipient's Info</h4>
            <div className="step-form">
              {recipientErrorMessages && <p className="error-msg">{recipientErrorMessages}</p>}

              {/* <div className="form-group">
                <label htmlFor="cnb-country">Recipient Location:</label>
                <select
                  className={rpCountryClass}
                  name="cnb_country"
                  onChange={(e) => setCrRecipientCountry(e.target.value)}
                >
                  <option value="">Select your country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                </select>
              </div> */}
              <div className="form-group">
                <label htmlFor="cnb-recipient-name">Recipient Name</label>
                <input
                  type="text"
                  className={rpNameClass}
                  id="cnb-recipient-name"
                  placeholder="Enter recipient name"
                  onChange={(e) => setCrRecipientName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cnb-recipient-email">Recipient Email</label>
                <input
                  type="email"
                  className={rpEmailClass}
                  id="cnb-recipient-email"
                  aria-describedby="emailHelp"
                  placeholder="Enter recipient email"
                  onChange={(e) => setCrRecipientEmail(e.target.value)}
                  required
                />
              </div>
              <div className="btn-set-inline">
                <button
                  className="s-btn btn-half"
                  onClick={() => {
                    setShowPlanStep("");
                    setShowRecipientStep("hide");
                  }}
                >
                  Previous
                </button>
                <button className="s-btn btn-half btn-continue" onClick={handleNextPaymentStep}>
                  Continue
                </button>
              </div>
              <button className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
                Cancel
              </button>
            </div>
          </div>

          <div className={`subs-step ${showPaymentStep}`}>
            <h4>Enter Your Payment Details</h4>
            <p>You can change or cancel your plan anytime</p>
            <div className="step-form">
              {cardErrorMessages && <p className="error-msg">{cardErrorMessages}</p>}

              <div className="credit-card-form">
                <form ref={formRef}>
                  <div className="rc-hide">
                    <input type="text" data-recurly="first_name" value={crFirstName} readOnly />
                    <input type="text" data-recurly="last_name" value={crLastName} readOnly />
                    <input type="text" data-recurly="address1" value={crAddr1} readOnly />
                    <input type="text" data-recurly="address2" value={crAddr2} readOnly />
                    <input type="text" data-recurly="city" value={crCity} readOnly />
                    <input type="text" data-recurly="state" value={crState} readOnly />
                    <input type="text" data-recurly="country" value={crCountry} readOnly />
                    <input type="text" data-recurly="postal_code" value={crZipCode} readOnly />
                    <input type="text" data-recurly="phone" name="cnb_phone" value={crPhone} readOnly />
                  </div>

                  <CardElement
                    onChange={(change) => {
                      setIsCardValid(change.valid);
                      setCardErrorMessages("");
                    }}
                  />
                </form>
              </div>
              <div className="btn-set-inline">
                <button
                  className="s-btn btn-half"
                  onClick={() => {
                    setShowRecipientStep("");
                    setShowPaymentStep("hide");
                  }}
                >
                  Previous
                </button>
                <button className="s-btn btn-half btn-continue" onClick={handleNextBillingStep}>
                  Continue
                </button>
              </div>
              <button className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
                Cancel
              </button>
            </div>
          </div>

          <div className={`subs-step ${showBillingStep}`}>
            <h4>Enter Your Billing Info</h4>
            <p>You can change or cancel your plan anytime</p>
            <div className="step-form">
              <div className="name-fields">
                <div className="form-group first-name">
                  <label htmlFor="cnb-first-name">First Name</label>
                  <input
                    type="text"
                    className={firstNameClass}
                    id="cnb-first-name"
                    name="cnb_first_name"
                    placeholder="Enter first name"
                    onChange={(e) => setCrFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group last-name">
                  <label htmlFor="cnb-last-name">Last Name</label>
                  <input
                    type="text"
                    className={lastNameClass}
                    id="cnb-last-name"
                    name="cnb_last_name"
                    placeholder="Enter last name"
                    onChange={(e) => setCrLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cnb-company">
                  Company<span>Optional</span>
                </label>
                <input
                  type="text"
                  id="cnb-company"
                  name="cnb-company"
                  placeholder="Enter company name"
                  onChange={(e) => setCrCompany(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cnb-phone">
                  Phone<span>Optional</span>
                </label>
                <input
                  type="text"
                  id="cnb-phone"
                  name="cnb-phone"
                  placeholder="Enter phone number"
                  onChange={(e) => setCrPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cnb-address">Billing Address </label>
                <input
                  type="text"
                  className={`addr-1 ${addr1Class}`}
                  id="cnb-address-1"
                  name="cnb_address_1"
                  placeholder="Address line 1"
                  onChange={(e) => setCrAddr1(e.target.value)}
                />
                <input
                  type="text"
                  id="cnb-address-2"
                  name="cnb_address_2"
                  placeholder="Address line 2"
                  onChange={(e) => setCrAddr2(e.target.value)}
                />
              </div>
              <div className="city-state-postcode">
                <div className="form-group city">
                  <label htmlFor="cnb-city">City</label>
                  <input
                    type="text"
                    className={cityClass}
                    id="cnb-city"
                    name="cnb-city"
                    placeholder="Enter your city"
                    onChange={(e) => setCrCity(e.target.value)}
                  />
                </div>
                <div className="form-group state">
                  <label htmlFor="cnb-state-providence">State/Province</label>
                  <select className={stateClass} name="cnb_state" onChange={(e) => setCrState(e.target.value)}>
                    {cnbRenderCountryStates(crCountry)}
                  </select>
                </div>
                <div className="form-group post-code">
                  <label htmlFor="cnb-zip-code">Zip</label>
                  <input
                    type="text"
                    className={zipCodeClass}
                    id="cnb-zip-code"
                    name="cnb-zip-code"
                    placeholder="Zip code"
                    onChange={(e) => setCrZipCode(e.target.value)}
                  />
                </div>
              </div>

              {billingErrorMessages && <p className="error-msg">{billingErrorMessages}</p>}

              <div className="btn-set-inline">
                <button
                  className="s-btn btn-half"
                  onClick={() => {
                    setShowPaymentStep("");
                    setShowBillingStep("hide");
                  }}
                >
                  Previous
                </button>
                <button className="s-btn btn-half btn-continue" onClick={handleNextReviewStep}>
                  Continue
                </button>
              </div>
              <div className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
                Cancel
              </div>
            </div>
          </div>

          <div className={`subs-step ${showReviewStep}`}>
            <h4>Review and Submit</h4>
            <div className="summary-title">Order summary:</div>
            <div className="renewal-amount ">
              <p>Gift {crIntervalText}</p>
              <p>${crIntervalPrice}</p>
            </div>
            <div className="total-bill">
              <p>Total Billed </p>
              <p>${crIntervalPrice}</p>
            </div>
            <p className="text-right subs-note">
              <small>+ sales tax where applicable</small>
            </p>
            <div className="auto-renewal-description">
              <p className="automatic-title">Automatic Renewal:</p>
              <p>
                Auto renewal means your subscription will be automatically renewed using the credit card you signed up
                with, at the same rate, and term. You will receive an e-mail notification from C&B VIP prior to your
                expiration date. For C&B VIP subscribers who have selected a one-year term, an auto renewal notice will
                be sent at least 30 days prior to the expire date, at which point you will be automatically charged US $
                {crIntervalPrice} each {crIntervalText} until you cancel. You will be notified prior to your automatic
                renewal if subscription prices change. Of course, you may cancel your subscription any time by sending
                an e-mail to: help@clayandbuck.com. Sorry, partial months cannot be refunded.
                <br />
                <br />
                By subscribing you agree to Automatic Renewal as described above, our User Agreement, and Privacy Policy
                & Cookie Statement.
              </p>
            </div>
            <div className="custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="cnb-accept-terms"
                onChange={(e) => setCrAcceptTerm(e.target.checked)}
              />
              <label className="custom-control-label" htmlFor="cnb-accept-terms">
                I accept<b> Terms of Use & Privacy Policy</b>
              </label>
            </div>
            <Link href="/optout" className="not-sell-personal-info">
              Do Not Sell or Share My Personal Information
            </Link>

            {reviewErrorMessages && <p className="error-msg">{reviewErrorMessages}</p>}

            <div className="btn-set-inline">
              <button
                className="s-btn btn-half"
                onClick={() => {
                  setShowBillingStep("");
                  setShowReviewStep("hide");
                }}
              >
                Previous
              </button>
              <button className="s-btn btn-half btn-submit" onClick={handleSubscription}>
                Subscribe
              </button>
            </div>
            <div className="btn-cancel" onClick={() => setShowCancelPopup(true)}>
              Cancel
            </div>
          </div>

          <div className={`subs-step ${showSuccessStep}`}>
            <h4>You have successfully gifted C&B VIP</h4>
            <p>
              You will receive an email with your order confirmation and the recipient will receive an email that will
              allow them to set up their account.
            </p>

            <div className="btn-set-inline">
              <Link href="/" className="s-btn btn-full btn-submit">
                Return to Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showCancelPopup && <CancelPopup closeCancelPopup={() => setShowCancelPopup(false)} />}
    </div>
  );
}
