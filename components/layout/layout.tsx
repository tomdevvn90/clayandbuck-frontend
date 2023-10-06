import Meta from "../seo/meta";
import Header from "./header";
import Footer from "./footer";
import { useEffect } from "react";

export default function Layout({ headerMenu, footerMenu, children }) {
  useEffect(() => {
    const isSinglePost = document.getElementById("cnb-single-post");
    if (!isSinglePost) {
      const shareEl = document.querySelectorAll(".st-sticky-share-buttons");
      shareEl.forEach((el) => {
        el.classList.add("hide");
      });
    } else {
      const shareEl = document.querySelectorAll(".st-sticky-share-buttons");
      shareEl.forEach((el) => {
        el.classList.remove("hide");
      });
    }
  }, []);

  return (
    <>
      <Meta />
      <Header headerMenu={headerMenu} />
      <div className="page-content">{children}</div>
      <Footer footerMenu={footerMenu} />
    </>
  );
}
