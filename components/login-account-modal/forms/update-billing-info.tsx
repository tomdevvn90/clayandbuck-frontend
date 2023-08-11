import { useState } from "react";
import { cnbRenderCountryStates } from "../../../utils/html-render-functions";
import { getCookie } from "cookies-next";
import { cnbCheckZipCodeMatchStateForCA, cnbGetStateByZipCodeForUS } from "../../../utils/global-functions";
import { updateBillingInfo } from "../../../lib/normal-api";

export default function UpdateBillingInfo({ refreshAccInfo, accountInfo, showAccInfo }) {
  const billingInfo = accountInfo.billing_info;
  const billingAddr = billingInfo.address;
  const paymentMethod = billingInfo.paymentMethod;
  const billingAddressTxt = `${billingAddr.street1}, ${billingAddr.city}, ${billingAddr.region}, ${billingAddr.postalCode}, ${billingAddr.country}`;
  const paymentMethodTxt = `${paymentMethod.cardType} ending ${paymentMethod.lastFour}`;
  const lastTwoCardNum = paymentMethod.lastTwo ? paymentMethod.lastTwo : "";
  const cardNum = `${paymentMethod.firstSix}${paymentMethod.lastFour}${lastTwoCardNum}`;
  const expYear = paymentMethod.expYear.toString().substr(2, 2);
  const cardExpDate = `${paymentMethod.expMonth}/${expYear}`;

  const [errorMessages, setErrorMessages] = useState("");
  const [showEditCardFields, setShowEditCardFields] = useState("");
  const [crCountry, setCrCountry] = useState(billingAddr.country);
  const [updateCard, setUpdateCard] = useState("");
  const [countryClass, setCountryClass] = useState("");
  const [cardInfoClass, setCardInfoClass] = useState("");
  const [firstNameClass, setFirstNameClass] = useState("");
  const [lastNameClass, setLastNameClass] = useState("");
  const [addr1Class, setAddr1Class] = useState("");
  const [cityClass, setCityClass] = useState("");
  const [stateClass, setStateClass] = useState("");
  const [zipCodeClass, setZipCodeClass] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSuccess(false);
    setErrorMessages("");
    setUpdateCard("");
    setCountryClass("");
    setCardInfoClass("");
    setFirstNameClass("");
    setLastNameClass("");
    setAddr1Class("");
    setCityClass("");
    setStateClass("");
    setZipCodeClass("");

    const accessToken = getCookie("STYXKEY_ACCESS_TOKEN").toString();
    const eventTarget = event.target;
    const country = eventTarget.cnb_country.value;
    const cardNum = eventTarget.cnb_card_num.value;
    const cardExp = eventTarget.cnb_card_exp.value;
    const cardCvv = eventTarget.cnb_card_cvv.value;
    const firstName = eventTarget.cnb_first_name.value;
    const lastName = eventTarget.cnb_last_name.value;
    const addr1 = eventTarget.cnb_addr_1.value;
    const addr2 = eventTarget.cnb_addr_2.value;
    const city = eventTarget.cnb_city.value;
    const state = eventTarget.cnb_state.value;
    const zipCode = eventTarget.cnb_zip_code.value;

    // Validate password value
    if (!accessToken) {
      setErrorMessages("Access token is invalid or missing.");
      return false;
    }
    if (!country) {
      setErrorMessages("Please enter your Country.");
      setCountryClass("error");
      return false;
    }
    if (cardNum != cardNum || cardExpDate != cardExp) {
      if (!cardNum) {
        setErrorMessages("Please enter your Card number.");
        setCardInfoClass("error");
        return false;
      }
      if (!cardExp) {
        setErrorMessages("Please enter your Card expired date.");
        setCardInfoClass("error");
        return false;
      }
      if (!cardCvv) {
        setErrorMessages("Please enter your Card CVV.");
        setCardInfoClass("error");
        return false;
      }
      if (cardCvv.length > 4) {
        setErrorMessages("Card CVV is invalid.");
        setCardInfoClass("error");
        return false;
      }
      setUpdateCard("true");
    }
    if (!firstName) {
      setErrorMessages("Please enter your First name.");
      setFirstNameClass("error");
      return false;
    }
    if (!lastName) {
      setErrorMessages("Please enter your Last name.");
      setLastNameClass("error");
      return false;
    }
    if (!addr1) {
      setErrorMessages("Please enter your Address 1.");
      setAddr1Class("error");
      return false;
    }
    if (!city) {
      setErrorMessages("Please enter your City.");
      setCityClass("error");
      return false;
    }
    if (!state) {
      setErrorMessages("Please enter your State/Province.");
      setStateClass("error");
      return false;
    }
    if (!zipCode) {
      setErrorMessages("Please enter your Zip Code.");
      setZipCodeClass("error");
      return false;
    }
    if (country == "US" && cnbGetStateByZipCodeForUS(zipCode) != state) {
      setErrorMessages("Zip Code is not correct with State.");
      setZipCodeClass("error");
      return false;
    }
    if (country == "CA" && !cnbCheckZipCodeMatchStateForCA(state, zipCode)) {
      setErrorMessages("Zip Code is not correct with State.");
      setZipCodeClass("error");
      return false;
    }

    const billFields = {
      accessToken,
      country,
      updateCard,
      cardNum,
      cardExp,
      cardCvv,
      firstName,
      lastName,
      addr1,
      addr2,
      city,
      state,
      zipCode,
    };
    setIsLoading(true);

    console.log(billFields);
    const updateBillRes = await updateBillingInfo(billFields);
    console.log(updateBillRes);

    if (updateBillRes.success) {
      //console.log(updateBillRes);
      setIsSuccess(true);
      setIsLoading(false);
      refreshAccInfo();
    } else {
      if (updateBillRes.error_message) {
        setErrorMessages(updateBillRes.error_message);
      } else {
        setErrorMessages("Something went wrong. Please try again!");
      }
      setIsLoading(false);
    }
  };

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return (
    <div className="account-edit-box update-billing">
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
      <div className="change-row">
        <h2>Update Billing Info</h2>

        {isSuccess ? (
          <p className="success-msg">Your account has been successfully updated</p>
        ) : (
          <p>Need to change your billing info? Enter your new billing info below</p>
        )}

        {errorMessages && <p className="error-msg">{errorMessages}</p>}
      </div>
      <form onSubmit={handleSubmit} className="update-billing-form">
        <div className="change-row location">
          <div className="form-group">
            <label htmlFor="cnb-country">Select your location</label>
            <select
              className={countryClass}
              name="cnb_country"
              defaultValue={billingAddr.country}
              onChange={(e) => setCrCountry(e.target.value)}
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
          </div>
        </div>

        <div className={`cnb-update-credit-card ${showEditCardFields}`}>
          <div className={`credit-card-area ${cardInfoClass}`}>
            <input
              type="text"
              className="card-num"
              name="cnb_card_num"
              defaultValue={cardNum}
              placeholder="Card number"
            />
            <input
              type="text"
              className="card-exp-date"
              name="cnb_card_exp"
              defaultValue={cardExpDate}
              placeholder="MM/YY"
              maxLength={5}
            />
            <input
              type="text"
              className="card-cvv"
              maxLength={4}
              defaultValue=""
              name="cnb_card_cvv"
              placeholder="CVV"
            />
          </div>
        </div>

        <div className={`payment-details ${showEditCardFields}`}>
          <a className="btn-editable" onClick={() => setShowEditCardFields("show-edit-card")}>
            Edit
          </a>
          <h2>Payment Details</h2>
          <p>
            <strong>Name: </strong>
            {`${billingInfo.firstName} ${billingInfo.lastName}`}
          </p>
          <p>
            <strong>Address: </strong>
            {billingAddressTxt}
          </p>
          <p>
            <strong>Payment Method: </strong>
            {paymentMethodTxt}
          </p>
        </div>

        <div className="name-fields">
          <div className="form-group first-name">
            <label htmlFor="cnb-first-name">First Name</label>
            <input
              type="text"
              className={firstNameClass}
              id="cnb-first-name"
              name="cnb_first_name"
              defaultValue={billingInfo.firstName}
              placeholder="Enter first name"
            />
          </div>
          <div className="form-group last-name">
            <label htmlFor="cnb-last-name">Last Name</label>
            <input
              type="text"
              className={lastNameClass}
              id="cnb-last-name"
              name="cnb_last_name"
              defaultValue={billingInfo.lastName}
              placeholder="Enter last name"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cnb-addr-1">Billing Address </label>
          <input
            type="text"
            className={`addr-1 ${addr1Class}`}
            id="cnb-addr-1"
            name="cnb_addr_1"
            defaultValue={billingAddr.street1}
            placeholder="Address line 1"
          />
          <input type="text" name="cnb_addr_2" defaultValue={billingAddr.street2} placeholder="Address line 2" />
        </div>
        <div className="city-state-postcode">
          <div className="form-group city">
            <label htmlFor="cnb-city">City</label>
            <input
              type="text"
              className={cityClass}
              id="cnb-city"
              name="cnb_city"
              defaultValue={billingAddr.city}
              placeholder="Enter your city"
            />
          </div>
          <div className="form-group state">
            <label htmlFor="cnb-state">State/Province</label>
            <select className={stateClass} id="cnb-state" name="cnb_state" defaultValue={billingAddr.region}>
              {cnbRenderCountryStates(crCountry)}
            </select>
          </div>
          <div className="form-group post-code">
            <label htmlFor="cnb-zip-code">Zip</label>
            <input
              type="text"
              className={zipCodeClass}
              id="cnb-zip-code"
              name="cnb_zip_code"
              defaultValue={billingAddr.postalCode}
              placeholder="Zip code"
            />
          </div>
        </div>

        <button type="submit" className={btnClass}>
          {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Update</span>}
        </button>
      </form>
    </div>
  );
}
