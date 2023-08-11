import Link from "next/link";

export default function AccountInfo(props) {
  const { accountInfo, logOutHandle, showChangeEmailPassword, showUpdateBillingInfo, showUpdateSubscription } = props;
  let planText = "";
  let nextBill = "";
  let billingName = "";
  let billingAddress = "";
  let paymentMethod = "";

  if (accountInfo) {
    const subscriptions = accountInfo.subscription_plans[0];
    if (subscriptions) {
      if (subscriptions.plan_name) {
        planText = subscriptions.plan_name;
        if (subscriptions.amount > 0)
          planText = `${subscriptions.plan_name} for $${subscriptions.amount} (Auto-Renewal)`;
      }
      let crDate = new Date();
      crDate.setDate(crDate.getDate() + subscriptions.days_remaining);
      const month: string = new Intl.DateTimeFormat("en-US", { month: "long" }).format(crDate);
      nextBill = `${month} ${crDate.getDate()}, ${crDate.getFullYear()}`;
    }
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
  }

  return (
    <div className="account-info-box">
      <div className="acc-head">
        <h2>My Account</h2>
        <p>
          You’re logged in as <strong>{accountInfo.name ? accountInfo.name : accountInfo.email}</strong>{" "}
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
            <strong>Email:</strong> {accountInfo.email}
          </p>
          <p>
            <strong>Password:</strong> ********
          </p>
          <p>
            <strong>Password Hint:</strong> {accountInfo.password_hint}
          </p>
        </div>
        <div className="row-info">
          {paymentMethod ? (
            <button className="btn-editable" onClick={showUpdateBillingInfo}>
              Edit
            </button>
          ) : (
            <button className="btn-editable disabled">Edit</button>
          )}

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
            <button className="btn-editable" onClick={showUpdateSubscription}>
              Edit
            </button>
          ) : (
            <Link href="/cnb-subscription/" className="btn-editable">
              Subscribe
            </Link>
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
