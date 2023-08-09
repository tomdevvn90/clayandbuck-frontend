import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function UpdateBillingInfo({ accountInfo, showAccInfo }) {
  const [errorMessages, setErrorMessages] = useState("");
  const [useEmailClass, setUseEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const billingInfo = accountInfo.billing_info;
  const billingAddress = billingInfo.address;
  const paymentMethod = billingInfo.paymentMethod;
  const billingName = `${billingInfo.firstName}  ${billingInfo.lastName}`;

  // $billing_address_text = billingAddress['street1'] . ', ' . billingAddress['city']  . ', ' . billingAddress['region']  . ', ' . billingAddress['postalCode']  . ', ' . billingAddress['country'];
  // $payment_method_text = paymentMethod['cardType'] . ' ending ' . paymentMethod['lastFour'];
  // $card_num = paymentMethod['firstSix'] . paymentMethod['lastFour'] . paymentMethod['lastTwo'];
  // $card_exp_date = paymentMethod['expMonth'] . '/' . substr(paymentMethod['expYear'], 2);
  // $addrr_country = billingAddress['country'];
  // $addrr_state = billingAddress['region'];

  const firstName = billingInfo.firstName;
  const lastName = billingInfo.lastName;

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return isLoading ? (
    <div className="loading-wrapper">
      <div className="cnb-spinner-loading"></div>
    </div>
  ) : (
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
      <div className="change-row">
        <h2>Update Billing Info</h2>

        <p>Need to change your billing info? Enter your new billing info below</p>

        {isSuccess && <p className="success-msg">Your account has been successfully updated</p>}

        {errorMessages && <p className="error-msg">{errorMessages}</p>}
      </div>
      <form className="update-billing-form">
        <div className="change-row location">
          <div className="form-group">
            <label htmlFor="cnb-country">Select your location</label>
            <select className="form-control country-select" name="cnb-country" defaultValue="US">
              {/* <option defaultValue="US" <?php if ( $addr_country == "US" ) echo "selected" ?>>United States</option>
                      <option defaultValue="CA" <?php if ( $addrr_country == "CA" ) echo "selected" ?>>Canada</option> */}
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
          </div>
        </div>
        <div className="payment-details">
          <button className="btn-editable">Edit</button>
          <h2>Payment Details</h2>
          <p>
            <strong>Name: </strong>
            {billingName}
          </p>
          <p>
            <strong>Address: </strong>billing_address_text
          </p>
          <p>
            <strong>Payment Method: </strong>payment_method_text
          </p>
        </div>
        <div className="cnb-update-credit-card">
          <div
            className="credit-card-area"
            data-card-num="<?php echo $card_num; ?>"
            data-card-exp-date="<?php echo $card_exp_date; ?>"
          >
            <input
              type="text"
              className="card-num"
              name="cnb-card-num"
              defaultValue="card_num"
              placeholder="Card number"
            />
            <input
              type="text"
              className="card-exp-date"
              name="cnb-card-my"
              defaultValue="card_exp_date"
              placeholder="MM/YY"
              maxLength={5}
            />
            <input
              type="text"
              className="card-cvv"
              maxLength={4}
              defaultValue=""
              name="cnb-card-cvv"
              placeholder="CVV"
            />
          </div>
        </div>
        <div className="name-fields">
          <div className="form-group first-name">
            <label htmlFor="cnb-first-name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="cnb-first-name"
              name="cnb-first-name"
              defaultValue={firstName}
              placeholder="Enter first name"
            />
          </div>
          <div className="form-group last-name">
            <label htmlFor="cnb-last-name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="cnb-last-name"
              name="cnb-last-name"
              defaultValue={lastName}
              placeholder="Enter last name"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cnb-addr-1">Billing Address </label>
          <input
            type="text"
            className="form-control addr-1"
            id="cnb-addr-1"
            name="cnb-addr-1"
            defaultValue="billing_address['street1']"
            placeholder="Address line 1"
          />
          <input
            type="text"
            className="form-control"
            name="cnb-addr-2"
            defaultValue="billing_address['street2']"
            placeholder="Address line 2"
          />
        </div>
        <div className="city-state-postcode">
          <div className="form-group city">
            <label htmlFor="cnb-city">City</label>
            <input
              type="text"
              className="form-control"
              id="cnb-city"
              name="cnb-city"
              defaultValue="billing_address['city']"
              placeholder="Enter your city"
            />
          </div>
          <div className="form-group state">
            <label htmlFor="cnb-state-providence">State/Province</label>
            <select className="form-control" id="cnb-state-providence" name="cnb-state-providence">
              {
                // if ( $addr_country == "US" )
                //    cnb_render_usa_state( $addr_state );
                // else
                //    cnb_render_canada_state( $addr_state );
              }
              <option defaultValue="US">United States</option>
            </select>
          </div>
          <div className="form-group post-code">
            <label htmlFor="cnb-zip-code">Zip</label>
            <input
              type="text"
              className="form-control"
              id="cnb-zip-code"
              name="cnb-zip-code"
              defaultValue="billing_address['postalCode']"
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
