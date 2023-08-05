import { useState } from "react";
import CnbLogoImg from "../../public/images/cb-vip-247.png";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./forms/login";
import ForgotPasswordForm from "./forms/forgot-password";
import GetPasswordHintForm from "./forms/password-hint";

export default function LoginModal({ handleCloseModal }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [isHint, setIsHint] = useState(false);
  return (
    <div className="login-box">
      <Image src={CnbLogoImg} width={90} height={90} alt="Clay and Buck" />

      <div className="login-box-content">
        {isLogin && <LoginForm handleCloseModal={handleCloseModal} />}

        {isForgot && <ForgotPasswordForm />}

        {isHint && <GetPasswordHintForm />}
      </div>

      <div className="login-box-footer">
        <Link href="/optout/">Do Not Sell or Share My Personal Information</Link>
        <Link href="/cnb-sign-up/">Become a C&B VIP Subscriber</Link>
      </div>
    </div>
  );
}
