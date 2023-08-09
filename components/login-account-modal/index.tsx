import { useRef } from "react";
import LoginModal from "./login";
import AccountModal from "./account";
import useEscapeKey from "../../hooks/useEscapeKey";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function LoginAccountModal({ isLoggedIn, changeLogInStt, handleCloseModal }) {
  const outSideRef = useRef(null);

  useEscapeKey(handleCloseModal);
  useOutsideClick(handleCloseModal, outSideRef);
  return (
    <>
      <div className="modal-overlay-bg"></div>
      <div className="login-account-modal">
        <div className="modal-wrap">
          <div className="modal-content" ref={outSideRef}>
            {isLoggedIn ? (
              <AccountModal changeLogInStt={changeLogInStt} handleCloseModal={handleCloseModal} />
            ) : (
              <LoginModal changeLogInStt={changeLogInStt} />
            )}

            <button title="Close (Esc)" type="button" className="close-modal" onClick={handleCloseModal}>
              ×
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
