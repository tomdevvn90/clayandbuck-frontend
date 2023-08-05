import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import logo_img from "../../public/images/clay-and-buck-logo.png";
import white_mini_logo from "../../public/images/white-mini-logo.png";
import MenuItem from "../menu-item";
import NoticeAndSocials from "./notice-and-socials";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "cookies-next";

// import DownloadApp from "./download-app";
const DownloadApp = dynamic(() => import("./download-app"), {
  ssr: false,
});
// import LeaderBoardTopAds from '../ads/leaderboard-top-ads'
const LeaderBoardTopAds = dynamic(() => import("../ads/leaderboard-top-ads"), {
  ssr: false,
});
// import LoginAccountModal from "../login-account-modal";
const LoginAccountModal = dynamic(() => import("../login-account-modal"), {
  ssr: false,
});

export default function Header({ headerMenu }) {
  const [menuStatus, setMenuStatus] = useState(false);
  const [loginAccountTxt, setLoginAccountTxt] = useState("Login");
  const [openLogAccModal, setOpenLogAccModal] = useState(false);

  const menuList = headerMenu?.edges;
  if (menuList) menuList.sort((a, b) => a.node.order - b.node.order);

  const hideMenu = menuStatus ? "expanded" : "";
  const toggleMenuHeader = () => {
    setMenuStatus(!menuStatus);
  };

  useEffect(() => {
    const accessToken = getCookie("ACCESS_TOKEN");
    if (accessToken) setLoginAccountTxt("Account");
  }, []);

  return (
    <>
      <DownloadApp />
      <LeaderBoardTopAds />
      <header className="site-header">
        <div className="container">
          <div className="site-branding">
            <Link
              href="/"
              className="custom-logo-link"
              rel="home"
              aria-current="page"
            >
              <Image
                src={logo_img}
                width={150}
                height={80}
                alt="Clay and Buck"
              ></Image>
            </Link>
          </div>

          <div className="main-menu">
            <NoticeAndSocials />
            <div className={`menu-list ${hideMenu}`}>
              <ul>
                {menuList &&
                  menuList.map(({ node }, index) => (
                    <MenuItem key={index} item={node}></MenuItem>
                  ))}
                <li>
                  <span className="search-btn">
                    <FontAwesomeIcon icon={faSearch} style={{}} />
                  </span>
                </li>
                <li className="nt-and-sls-mobile">
                  <NoticeAndSocials />
                </li>
              </ul>
            </div>
          </div>

          <div className="secs-menu">
            <button
              className="login-btn"
              onClick={() => setOpenLogAccModal(true)}
            >
              <Image
                src={white_mini_logo}
                width={28}
                height={28}
                alt=""
              ></Image>
              <span>{loginAccountTxt}</span>
            </button>
            <span className="toggle-menu" onClick={toggleMenuHeader}>
              <FontAwesomeIcon icon={faBars} style={{}} />
            </span>
          </div>
        </div>
      </header>

      {openLogAccModal && (
        <LoginAccountModal
          handleCloseModal={() => setOpenLogAccModal(!openLogAccModal)}
        />
      )}
    </>
  );
}
