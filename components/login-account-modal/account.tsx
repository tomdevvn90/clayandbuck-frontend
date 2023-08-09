import { deleteCookieLoginInfo } from "../../utils/global-functions";
import Image from "next/image";
import headLogo from "../../public/images/cnb-subs-logo.png";
import AccountInfo from "./content/account-info";
import { useEffect, useState } from "react";
import ChangeEmailPassword from "./content/change-email-password";
import UpdateBillingInfo from "./forms/update-billing-info";
import { getCookie } from "cookies-next";
import { getAccountInfo } from "../../lib/normal-api";

export default function AccountModal({ changeLogInStt, handleCloseModal }) {
  const [isAccInfo, setIsAccInfo] = useState(true);
  const [isChangeEmailPassword, setIsChangeEmailPassword] = useState(false);
  const [isUpdateBillingInfo, setIsUpdateBillingInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState({});

  const logOutHandle = () => {
    deleteCookieLoginInfo();
    changeLogInStt();
    handleCloseModal();
  };

  const showAccInfo = () => {
    setIsAccInfo(true);
    setIsChangeEmailPassword(false);
    setIsUpdateBillingInfo(false);
  };

  const showChangeEmailPassword = () => {
    setIsAccInfo(false);
    setIsChangeEmailPassword(true);
    setIsUpdateBillingInfo(false);
  };

  const showUpdateBillingInfo = () => {
    setIsAccInfo(false);
    setIsChangeEmailPassword(false);
    setIsUpdateBillingInfo(true);
  };

  useEffect(() => {
    const getAccInfo = async () => {
      const accessToken = getCookie("STYXKEY_ACCESS_TOKEN").toString();
      const accInfoRes = await getAccountInfo(accessToken);
      console.log(accInfoRes);
      if (accInfoRes) {
        setAccountInfo(accInfoRes);
        setIsLoading(false);
      }
    };
    getAccInfo();
    return () => {};
  }, []);

  return (
    <div className="account-box">
      <div className="header-part">
        <Image src={headLogo} alt="Clay and Buck" width={157} height={54} />
      </div>

      {isLoading && (
        <div className="loading-wrapper">
          <div className="cnb-spinner-loading"></div>
        </div>
      )}

      {isAccInfo && !isLoading && (
        <AccountInfo
          accountInfo={accountInfo}
          logOutHandle={logOutHandle}
          showChangeEmailPassword={showChangeEmailPassword}
          showUpdateBillingInfo={showUpdateBillingInfo}
        />
      )}

      {isChangeEmailPassword && !isLoading && <ChangeEmailPassword showAccInfo={showAccInfo} />}

      {isUpdateBillingInfo && !isLoading && <UpdateBillingInfo accountInfo={accountInfo} showAccInfo={showAccInfo} />}
    </div>
  );
}
