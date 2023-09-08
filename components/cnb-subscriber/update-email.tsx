import { useEffect, useState } from "react";
import { updateEmail } from "../../lib/normal-api";
import CnbLogoImg from "../../public/images/cb-vip-247.png";
import Image from "next/image";
import Link from "next/link";

export default function UpdateEmail({ emailToken }) {
  const [errorMessages, setErrorMessages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const updateEmailF = async (emailToken) => {
      if (!emailToken) {
        setErrorMessages("Email Token is invalid. Please check your link again!");
        return false;
      }

      setIsLoading(true);
      const updateEmailRes = await updateEmail(emailToken);
      // console.log(updateEmailRes);

      if (updateEmailRes.success) {
        setIsSuccess(true);
      } else {
        if (updateEmailRes.error_message) {
          setErrorMessages(updateEmailRes.error_message);
        } else {
          setErrorMessages("Something went wrong. Please try again!");
        }
      }
      setIsLoading(false);
    };
    updateEmailF(emailToken);
  }, []);

  return (
    <div className="update-email-wrap">
      <div className="update-box">
        <Link className="close-btn" href="/">
          ×
        </Link>
        <div>
          <Image src={CnbLogoImg} width={90} height={90} alt="Clay and Buck" />
        </div>
        <h2>Update Email</h2>

        {isLoading ? (
          <div className="loading-wrapper">
            <div className="cnb-spinner-loading"></div>
          </div>
        ) : (
          <div className="result-wrap">
            {isSuccess && <p className="success-msg">Your account email has been successfully updated</p>}
            {errorMessages && <p className="error-msg">{errorMessages}</p>}
          </div>
        )}

        <div className="box-footer">
          <Link href="/optout/">Do Not Sell or Share My Personal Information</Link>
          <Link href="/cnb-sign-up/">Become a C&B VIP Subscriber</Link>
        </div>
      </div>
    </div>
  );
}
