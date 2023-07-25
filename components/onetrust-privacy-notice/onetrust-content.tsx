import { useEffect, useState } from "react";
import Script from "next/script";

export default function OneTrustContent( { id, jsonLink }) {
  const [intervalCount, setIntervalCount] = useState(0);
  
  useEffect(() => {
    if (!!globalThis.OneTrust?.NoticeApi) {
      globalThis.OneTrust.NoticeApi.Initialized.then(function () {
        globalThis.OneTrust.NoticeApi.LoadNotices([
          jsonLink,
        ]);
      });
    } else {
      setTimeout(() => {
        setIntervalCount((p) => ++p);
      }, 100);
    }
    return () => {};
  }, [intervalCount]);

  return (
    <div className="one-trust-content-wrap">
      <div id={id} className="otnotice"></div>
      <Script
        src="https://privacyportal-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js"
        type="text/javascript" charSet="UTF-8" id="otprivacy-notice-script"
      />
    </div>
  );
}
