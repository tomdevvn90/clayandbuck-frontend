import { useState } from "react";
import CnbLogoImg from "../../public/images/cb-vip-247.png";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./forms/login";
import ForgotPasswordForm from "./forms/forgot-password";
import GetPasswordHintForm from "./forms/password-hint";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { CNB_RECAPTCHA_KEY } from "../../lib/constants";

export default function LoginModal({ changeLogInStt }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [isHint, setIsHint] = useState(false);

  const showLoginForm = () => {
    setIsLogin(true);
    setIsForgot(false);
    setIsHint(false);
  };
  const showForgotForm = () => {
    setIsLogin(false);
    setIsForgot(true);
    setIsHint(false);
  };
  const showHintForm = () => {
    setIsLogin(false);
    setIsForgot(false);
    setIsHint(true);
  };
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={CNB_RECAPTCHA_KEY}
      scriptProps={{
        async: false,
        defer: true,
        appendTo: "body",
        nonce: undefined,
      }}
    >
      <div className="login-box">
        <div>
          <Image src={CnbLogoImg} width={90} height={90} alt="Clay and Buck" />
        </div>

        <div className="login-box-content">
          <LoginForm
            className={!isLogin ? "hide" : ""}
            changeLogInStt={changeLogInStt}
            showForgotForm={showForgotForm}
            showHintForm={showHintForm}
          />

          {isForgot && <ForgotPasswordForm showLoginForm={showLoginForm} />}

          {isHint && <GetPasswordHintForm showLoginForm={showLoginForm} />}
        </div>

        <div className="login-box-footer">
          <Link href="/optout/">Do Not Sell or Share My Personal Information</Link>
          <Link href="/cnb-sign-up/">Become a C&B VIP Subscriber</Link>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
}
