import { getCookie } from "cookies-next";
import LoginModal from "./login";
import AccountModal from "./account";

export default function LoginAccountModal(props) {
  const accessToken = getCookie("ACCESS_TOKEN");

  return (
    <div className="login-account-modal">
      <div className="modal-wrap">
        <div className="modal-content">
          {accessToken ? <AccountModal /> : <LoginModal />}

          <button
            title="Close (Esc)"
            type="button"
            className="close-modal"
            onClick={props.onClick}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
