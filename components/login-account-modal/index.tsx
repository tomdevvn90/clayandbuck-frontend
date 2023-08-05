import { getCookie } from "cookies-next";
import { useRef } from "react";
import LoginModal from "./login";
import AccountModal from "./account";
import useEscapeKey from "../../hooks/useEscapeKey";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function LoginAccountModal({ handleCloseModal }) {
  const accessToken = getCookie("ACCESS_TOKEN");
  const outSideRef = useRef(null);

  useEscapeKey(handleCloseModal);
  useOutsideClick(handleCloseModal, outSideRef);
  return (
    <div className="login-account-modal">
      <div className="modal-wrap">
        <div className="modal-content" ref={outSideRef}>
          {accessToken ? <AccountModal /> : <LoginModal handleCloseModal={handleCloseModal} />}

          <button title="Close (Esc)" type="button" className="close-modal" onClick={handleCloseModal}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
