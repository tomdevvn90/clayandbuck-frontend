export default function ChangeEmailPassword({ showAccInfo }) {
  return (
    <div className="account-edit-box">
      <div>
        <a className="back-to-acc-setting" onClick={showAccInfo}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.5825 9.00021H3.4125L8.2925 13.8802C8.6825 14.2702 8.6825 14.9102 8.2925 15.3002C7.9025 15.6902 7.2725 15.6902 6.8825 15.3002L0.2925 8.71021C-0.0975 8.32021 -0.0975 7.69022 0.2925 7.30022L6.8725 0.700215C7.2625 0.310215 7.8925 0.310215 8.2825 0.700215C8.6725 1.09021 8.6725 1.72022 8.2825 2.11022L3.4125 7.00022H14.5825C15.1325 7.00022 15.5825 7.45021 15.5825 8.00022C15.5825 8.55021 15.1325 9.00021 14.5825 9.00021Z"
              fill="#B2922C"
            ></path>
          </svg>
          Back to Account Settings
        </a>
      </div>
      <div className="change-email-row">
        <h3>Change Email</h3>
        <div className="change-email-success change-text mt-20">
          <p>
            We've sent a confirmation to the email address you provided.Please check your email in order to complete the
            process.
          </p>
        </div>

        <p>
          To change your email address from <strong>luke@bigwigmonster.com</strong>, enter your new email and current
          password below.
        </p>
      </div>

      <form className="change-form">
        <p className="change-email-error"></p>
        <div className="form-group">
          <label htmlFor="cnb-new-email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="cnb-new-email"
            name="cnb-new-email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cnb-cr-password">Password</label>
          <input type="password" className="form-control" id="cnb-cr-password" name="cnb-cr-password" />
          <p className="error-msg">Please enter a valid current password.</p>
        </div>
        <div className="btn-set-inline">
          <button type="submit" className="btn btn-submit">
            Update
          </button>
        </div>
        <hr />
      </form>
      <div className="change-email-row">
        <h2>Change Password</h2>
        <div className="change-password-success change-text mt-20">
          <p>Your account password has been successfully updated.</p>
        </div>
        <p>To change your password, enter your current password, then your new password.</p>
      </div>
      <form action="#" id="cnb-change-password-form" className="change-form" data-email="luke@bigwigmonster.com">
        <p className="change-password-error"></p>
        <div className="form-group">
          <label htmlFor="cnb-cp-current-password">Current Password</label>
          <input
            type="password"
            className="form-control"
            id="cnb-cp-current-password"
            name="cnb-cp-current-password"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cnb-cp-new-password">New Password</label>
          <input type="password" className="form-control" id="cnb-cp-new-password" name="cnb-cp-new-password" />
        </div>
        <div className="form-group">
          <label htmlFor="cnb-cp-password-hint">Password Hint</label>
          <input
            type="text"
            className="form-control"
            id="cnb-cp-password-hint"
            name="cnb-cp-password-hint"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="btn-set-inline">
          <button className="btn btn-full btn-submit disabled">Update</button>
        </div>
      </form>
    </div>
  );
}
