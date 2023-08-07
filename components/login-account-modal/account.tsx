import { deleteCookieLoginInfo } from "../../utils/global-functions";

export default function AccountModal({ changeLogInStt, handleCloseModal }) {
  const logOutHandle = () => {
    deleteCookieLoginInfo();
    changeLogInStt();
    handleCloseModal();
  };
  return (
    <div className="account-box">
      <p>
        You’re logged in as <strong>luke@bigwigmonster.com</strong>
        <a href="#" className="cnb-logout-link" onClick={logOutHandle}>
          Log Out
        </a>
      </p>
    </div>
  );
}
