import { useScript, useSsr } from "usehooks-ts";
import { useEffect } from "react";
import { SITE_URL } from "../../lib/constants";
import Script from "next/script";

export default function Optout() {
  //   const status = useScript(
  //     `https://privacyportal-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js`
  //   );

  useEffect(() => {
    // settings =
    //   "eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyJ9";
    setTimeout(function () {
      globalThis.OneTrust.NoticeApi.Initialized.then(function () {
        globalThis.OneTrust.NoticeApi.LoadNotices([
          "https://privacyportal-cdn.onetrust.com/3546d798-21cd-434d-b031-f8701f4d2f21/privacy-notices/e793553f-90ff-43e8-8f5f-1b974af65076.json",
        ]);
      });
    }, 5000);

    return () => {};
  }, [status]);

  return (
    <div>
      {/* <div className="heading_ss">
                <h1>Optout</h1>
                <ul className="breadcrumbs">
                    <li><a href="/">Home</a></li>
                    <li className="active">Optout</li>
                </ul>
            </div> */}

      <div
        id="otnotice-e793553f-90ff-43e8-8f5f-1b974af65076"
        className="otnotice"
      ></div>

      <Script
        src="https://privacyportal-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js"
        type="text/javascript"
        charSet="UTF-8"
        id="otprivacy-notice-script"
        dangerouslySetInnerHTML={{
          __html: `settings="eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyJ9" `,
        }}
      />
    </div>
  );
}
