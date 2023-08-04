export default function ForgotPasswordForm() {
  return (
    <div className="cnb-lost-password-form">
      <h1>Forgot password</h1>
      <p>Enter your e-mail to receive your account information via e-mail.</p>
      <form action="#" id="cnb-lost-password-form" className="login-form">
        <p className="forgot-pass-error"></p>
        <p className="forgot-pass-success">
          Successfully sent. Please check your inbox.
        </p>
        <div className="form-group cnb-email-field">
          <label htmlFor="cnb-forgot-email">Email</label>
          <input
            type="email"
            className="form-control form-new-control"
            id="cnb-forgot-email"
            name="cnb-email"
            placeholder="Enter your email"
            required={false}
          />
          <p className="error-msg">Please enter a valid email.</p>
        </div>
        <button className="btn btn-login disabled">Reset Password</button>
      </form>
      <a href="#" className="cnb-back-to-login back-to-login">
        Back to login
      </a>
      <p className="need-help">
        Need help?
        <a href="https://help.clayandbuck.com/" target="_blank">
          Contact customer service.
        </a>
      </p>
    </div>
  );
}
