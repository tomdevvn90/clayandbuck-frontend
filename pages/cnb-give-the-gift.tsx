import Head from "next/head";
import Layout from "../components/layout/layout";
import Link from "next/link";
import GiveTheGift from "../components/cnb-subscriber/give-the-gift";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { CNB_RECAPTCHA_KEY, CNB_RECURLY_API_KEY, SITE_URL } from "../lib/constants";
import { getPlansInfo } from "../lib/normal-api";
import { RecurlyProvider, Elements } from "@recurly/react-recurly";
import dynamic from "next/dynamic";
import { getCookie } from "cookies-next";
import { useContext } from "react";
import { GlobalsContext } from "../contexts/GlobalsContext";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Container = dynamic(() => import("../components/container"), {
  ssr: false,
});

export default function GiftSubscriptionPage({ pageData, plansInfoRes }) {
  const GlobalsCtx = useContext(GlobalsContext);

  const page = pageData?.pageBy ?? {};
  const router = useRouter();

  // if (!router.isFallback && !page?.slug) {
  // 	return <ErrorPage statusCode={404} />
  // }

  const { headerMenu, footerMenu } = pageData;

  // const { seo } = page
  // const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  const accessToken = getCookie("STYXKEY_ACCESS_TOKEN");
  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Head>
        {/* {fullHead} */}
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
  const pageData = await getPageData("/cnb-give-the-gift");

  const userEmailCk = getCookie("STYXKEY_USER_EMAIL", { req, res });
  const userEmail = userEmailCk ? userEmailCk.toString() : "";
  const plansInfoRes = await getPlansInfo(userEmail);

  return {
    props: { pageData, plansInfoRes },
  };
}
