import Head from "next/head";
import Layout from "../components/layout/layout";
import GiveTheGift from "../components/cnb-subscriber/give-the-gift";
import dynamic from "next/dynamic";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { CNB_RECAPTCHA_KEY, CNB_RECURLY_API_KEY, SITE_URL } from "../lib/constants";
import { getPlansInfo } from "../lib/normal-api";
import { RecurlyProvider, Elements } from "@recurly/react-recurly";
import { getCookie } from "cookies-next";
import { useContext } from "react";
import { GlobalsContext } from "../contexts/GlobalsContext";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useScript } from "usehooks-ts";

const Container = dynamic(() => import("../components/container"), {
  ssr: false,
});

export default function GiftSubscriptionPage({ pageData, plansInfoRes }) {
  const GlobalsCtx = useContext(GlobalsContext);

  const status = useScript("https://js.recurly.com/v4/recurly.js");

  const page = pageData?.pageBy ?? {};
  const { headerMenu, footerMenu } = pageData;
  const router = useRouter();
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  const accessToken = getCookie("STYXKEY_ACCESS_TOKEN");

  if (status !== "ready") return null;

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <title>Give the gift of C&B VIP</title>
        <meta
          name="description"
          content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        ></meta>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Give the gift of C&B VIP" />
        <meta
          property="og:description"
          content="Subscribe to C&B VIP Sign up to become a C&B VIP subscriber and listen to the show live or on-demand on your computer or mobile device commercial-free. C&B VIP Members Benefits: Commercial-Free Audio Stream, Live or On-DemandCommercial-Free PodcastsExclusive VIP Invitations to C&B EventsExclusive Clay & Buck VIP VideosExclusive email access directly to Clay & Buck […]"
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="The Clay Travis & Buck Sexton Show" />
        <meta property="og:image" content={page.seoTwitterThumb} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Give the gift of C&B VIP" />
        <meta name="twitter:image" content={page.seoTwitterThumb} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="640" />
      </Head>
      <div className="main-wrap page sign-up-flow">
        {!accessToken ? (
          <Container>
            <div className="require-subs-only-wrap">
              <h2>Please login to continue subscription.</h2>
              <p></p>
              <p></p>
              <button className="btn" onClick={() => GlobalsCtx.setOpenLoginModal(true)}>
                Login
              </button>
            </div>
          </Container>
        ) : (
          <>
            <Container>
              <RecurlyProvider publicKey={CNB_RECURLY_API_KEY}>
                <Elements>
                  <GoogleReCaptchaProvider
                    reCaptchaKey={CNB_RECAPTCHA_KEY}
                    scriptProps={{
                      async: false,
                      defer: true,
                      appendTo: "body",
                      nonce: undefined,
                    }}
                  >
                    <GiveTheGift gift={true} plansInfoRes={plansInfoRes} />
                  </GoogleReCaptchaProvider>
                </Elements>
              </RecurlyProvider>
            </Container>
          </>
        )}
      </div>
    </Layout>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps({ req, res }) {
  const userEmailCk = getCookie("STYXKEY_USER_EMAIL", { req, res });
  const userEmail = userEmailCk ? userEmailCk.toString() : "";
  const plansInfoRes = await getPlansInfo(userEmail);

  const pageData = await getPageData("/cnb-give-the-gift");

  return {
    props: { pageData, plansInfoRes },
  };
}
