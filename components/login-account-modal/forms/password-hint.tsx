export default function GetPasswordHintForm() {
  return (
    <div className="cnb-password-hint-form">
      <h2>Get Password Hint</h2>
      <p className="pw-hint-note">
        Enter your email to receive your password hint.
      </p>
      <form action="#" id="cnb-password-hint-form" className="login-form">
        <p className="hint-error"></p>
        <p className="hint-accepted"></p>
        <div className="form-group cnb-email-field">
          <label htmlFor="cnb-hint-email">Email</label>
          <input
            type="email"
            className="form-control form-new-control"
            id="cnb-hint-email"
            name="cnb-email"
            placeholder="Enter your email"
            required={false}
          />
          <p className="error-msg">Please enter a valid email.</p>
        </div>
        <button className="btn btn-login disabled">Get Password Hint</button>
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
