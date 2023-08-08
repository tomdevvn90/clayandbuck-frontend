import Link from "next/link";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getAccountInfo } from "../../../lib/normal-api";

export default function AccountInfo({ logOutHandle, showChangeEmailPassword }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [passHint, setPassHint] = useState("");
  const [planText, setPlanText] = useState("");
  const [nextBill, setNextBill] = useState("");
  const [billingName, setBillingName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const getAccInfo = async () => {
      const accessToken = getCookie("STYXKEY_ACCESS_TOKEN").toString();
      const accInfoRes = await getAccountInfo(accessToken);

      if (accInfoRes) {
        setUserName(accInfoRes.name);
        setPassHint(accInfoRes.password_hint);
        setUserEmail(accInfoRes.email);

        const subscriptions = accInfoRes.subscription_plans[0];
        if (subscriptions) {
          if (subscriptions.plan_name) {
            setPlanText(subscriptions.plan_name);
            if (subscriptions.amount > 0)
              setPlanText(`${subscriptions.plan_name} for $${subscriptions.amount} (Auto-Renewal)`);
          }
          let crDate = new Date();
          crDate.setDate(crDate.getDate() + subscriptions.days_remaining);
          const month: string = new Intl.DateTimeFormat("en-US", { month: "long" }).format(crDate);
          setNextBill(`${month} ${crDate.getDate()}, ${crDate.getFullYear()}`);
        }
        const billingInfo = accInfoRes.billing_info;
        if (billingInfo) {
          const billingAddr = billingInfo.address;
          const paymentMethod = billingInfo.paymentMethod;
          if (billingInfo.firstName) {
            setBillingName(`${billingInfo.firstName} ${billingInfo.lastName}`);
          }
          if (billingAddr.street1) {
            setBillingAddress(
              `${billingAddr.street1}, ${billingAddr.city}, ${billingAddr.region}, ${billingAddr.postalCode}, ${billingAddr.country}`
            );
          }
          if (paymentMethod.cardType) {
            setPaymentMethod(`${paymentMethod.cardType} ending ${paymentMethod.lastFour}`);
          }
        }
        setIsLoading(false);
      }
    };
    getAccInfo();
    return () => {};
  }, []);

  return isLoading ? (
    <div className="loading-wrapper">
      <div className="cnb-spinner-loading"></div>
    </div>
  ) : (
    <div className="account-info-box">
      <div className="acc-head">
        <h2>My Account</h2>
        <p>
          You’re logged in as <strong>{userName ? userName : userEmail}</strong>{" "}
          <a className="cnb-logout-link" onClick={logOutHandle}>
            Log Out
          </a>
        </p>
      </div>
      <div className="acc-content">
        <div className="row-info">
          <button className="btn-editable" onClick={showChangeEmailPassword}>
            Edit
          </button>
          <h3>Login</h3>
          <p>
            <strong>Email:</strong> {userEmail}
          </p>
          <p>
            <strong>Password:</strong> ********
          </p>
          <p>
            <strong>Password Hint:</strong> {passHint}
          </p>
        </div>
        <div className="row-info">
          <button className={paymentMethod ? `btn-editable` : `btn-editable disabled`}>Edit</button>
          <h3>Billing Information</h3>
          {billingName || billingAddress || paymentMethod ? (
            <>
              <p>
                <strong>Name:</strong> {billingName}
              </p>
              <p>
                <strong>Address:</strong> {billingAddress}
              </p>
              <p>
                <strong>Payment Method:</strong> {paymentMethod}
              </p>
            </>
          ) : (
            <p className="billing-not-found-msg">We don’t have your billing information on file.</p>
          )}
        </div>
        <div className="row-info">
          {planText || nextBill ? (
            <button className="btn-editable">Edit</button>
          ) : (
            <a href="CNB_SUBSCRIPTION_URL" className="btn-editable">
              Subscribe
            </a>
          )}

          <h3>Subscriptions</h3>
          {planText || nextBill ? (
            <>
              <p>
                <strong>Plan:</strong> {planText}
              </p>
              <p>
                <strong>Next Bill:</strong> {nextBill}
              </p>
            </>
          ) : (
            <p>
              It seems like you don't have an active subscription. <br />
              Please subscribe in order to access premium features.
            </p>
          )}
        </div>
        <div className="row-info gift-cnb">
          <Link href="/cnb-give-the-gift/" className="btn-editable">
            Give the Gift
          </Link>
          <h3>Gift C&B VIP</h3>
          <p style={{ maxWidth: "420px" }}>
            Give the gift of C&B VIP - the only way to listen to The Clay Travis & Buck Sexton Show commercial free.
          </p>
        </div>
      </div>
    </div>
  );
}
