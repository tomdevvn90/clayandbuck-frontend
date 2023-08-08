import { deleteCookieLoginInfo } from "../../utils/global-functions";
import Image from "next/image";
import headLogo from "../../public/images/cnb-subs-logo.png";
import AccountInfo from "./content/account-info";
import { useState } from "react";
import ChangeEmailPassword from "./content/change-email-password";

export default function AccountModal({ changeLogInStt, handleCloseModal }) {
  const [isAccInfo, setIsAccInfo] = useState(true);
  const [isChangeEmailPassword, setIsChangeEmailPassword] = useState(false);

  const logOutHandle = () => {
    deleteCookieLoginInfo();
    changeLogInStt();
    handleCloseModal();
  };

  const showAccInfo = () => {
    setIsAccInfo(true);
    setIsChangeEmailPassword(false);
  };

  const showChangeEmailPassword = () => {
    setIsAccInfo(false);
    setIsChangeEmailPassword(true);
  };

  return (
    <div className="account-box">
      <div className="header-part">
        <Image src={headLogo} alt="Clay and Buck" width={157} height={54} />
      </div>

      {isAccInfo && <AccountInfo logOutHandle={logOutHandle} showChangeEmailPassword={showChangeEmailPassword} />}

      {isChangeEmailPassword && <ChangeEmailPassword showAccInfo={showAccInfo} />}
    </div>
  );
}
