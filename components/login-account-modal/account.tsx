import { deleteCookieLoginInfo } from "../../utils/global-functions";
import Image from "next/image";
import headLogo from "../../public/images/cnb-subs-logo.png";
import AccountInfo from "./content/account-info";
import { useEffect, useState } from "react";
import ChangeEmailPassword from "./content/change-email-password";
import UpdateBillingInfo from "./forms/update-billing-info";
import { getCookie } from "cookies-next";
import { getAccountInfo, getLogoutData } from "../../lib/normal-api";
import UpdateSubscription from "./forms/update-subscription";

export default function AccountModal({ changeLogInStt, handleCloseModal }) {
  const [isAccInfo, setIsAccInfo] = useState(true);
  const [isChangeEmailPassword, setIsChangeEmailPassword] = useState(false);
  const [isUpdateBillingInfo, setIsUpdateBillingInfo] = useState(false);
  const [isUpdateSubscription, setIsUpdateSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState({});
  const [refreshAccInfo, setRefreshAccInfo] = useState(false);

  const logOutHandle = async () => {
    const accessToken = getCookie("STYXKEY_ACCESS_TOKEN").toString();

    deleteCookieLoginInfo();
    changeLogInStt();
    handleCloseModal();

    if (accessToken) {
      const logoutData = await getLogoutData(accessToken);
      //console.log(logoutData);
    }
  };

  const showAccInfo = () => {
    setIsAccInfo(true);
    setIsChangeEmailPassword(false);
    setIsUpdateBillingInfo(false);
    setIsUpdateSubscription(false);
  };

  const showChangeEmailPassword = () => {
    setIsAccInfo(false);
    setIsChangeEmailPassword(true);
    setIsUpdateBillingInfo(false);
    setIsUpdateSubscription(false);
  };

  const showUpdateBillingInfo = () => {
    setIsAccInfo(false);
    setIsChangeEmailPassword(false);
    setIsUpdateBillingInfo(true);
    setIsUpdateSubscription(false);
  };

  const showUpdateSubscription = () => {
    setIsAccInfo(false);
    setIsChangeEmailPassword(false);
    setIsUpdateBillingInfo(false);
    setIsUpdateSubscription(true);
  };

  const handleRefreshAccInfo = () => {
    setRefreshAccInfo(!refreshAccInfo);
  };

  useEffect(() => {
    const getAccInfo = async () => {
      const accessToken = getCookie("STYXKEY_ACCESS_TOKEN").toString();
      if (accessToken) {
        const accInfoRes = await getAccountInfo(accessToken);
        if (Object.keys(accInfoRes).length > 0) {
          setAccountInfo(accInfoRes);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    getAccInfo();
    return () => {};
  }, [refreshAccInfo]);

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

      {Object.keys(accountInfo).length == 0 && !isLoading && (
        <p className="error-msg big-error-msg">Something went wrong. Please reload page and try again!</p>
      )}

      {isAccInfo && Object.keys(accountInfo).length > 0 && !isLoading && (
        <AccountInfo
          accountInfo={accountInfo}
          logOutHandle={logOutHandle}
          showChangeEmailPassword={showChangeEmailPassword}
          showUpdateBillingInfo={showUpdateBillingInfo}
          showUpdateSubscription={showUpdateSubscription}
        />
      )}

      {isChangeEmailPassword && !isLoading && <ChangeEmailPassword showAccInfo={showAccInfo} />}

      {isUpdateBillingInfo && !isLoading && (
        <UpdateBillingInfo refreshAccInfo={handleRefreshAccInfo} accountInfo={accountInfo} showAccInfo={showAccInfo} />
      )}

      {isUpdateSubscription && !isLoading && (
        <UpdateSubscription refreshAccInfo={handleRefreshAccInfo} accountInfo={accountInfo} showAccInfo={showAccInfo} />
      )}
    </div>
  );
}
