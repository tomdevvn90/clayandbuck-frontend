import Meta from "../seo/meta";
import Header from "./header";
import Footer from "./footer";
import { useEffect } from "react";

export default function Layout({ headerMenu, footerMenu, children }) {
  return (
    <>
      <Meta />
      <Header headerMenu={headerMenu} />
      <div className="page-content">{children}</div>
      <Footer footerMenu={footerMenu} />
    </>
  );
}
