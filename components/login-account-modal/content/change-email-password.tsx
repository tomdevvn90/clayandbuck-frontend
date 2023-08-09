import ChangeEmailForm from "../forms/change-email";
import ChangePasswordForm from "../forms/change-password";

export default function ChangeEmailPassword({ showAccInfo }) {
  return (
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

      <ChangeEmailForm />

      <ChangePasswordForm />
    </div>
  );
}
