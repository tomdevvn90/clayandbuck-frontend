import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import SignUp from "../components/cnb-subscriber/sign-up";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { CNB_RECAPTCHA_KEY, SITE_URL } from "../lib/constants";
import { getPlansInfo } from "../lib/normal-api";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function SignUpGiftPage({ pageData, plansInfo }) {
  const page = pageData?.pageBy ?? {};
  const router = useRouter();
  // if (!router.isFallback && !page?.slug) {
  // 	return <ErrorPage statusCode={404} />
  // }

  const { headerMenu, footerMenu } = pageData;
  const { templateName } = page?.template ?? "";
  const pageClass = templateName ? templateName.toLowerCase().replace(" ", "-") : "";

  // const { seo } = page
  // const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Head>
        {/* {fullHead} */}
        <link rel="canonical" href={canonicalUrl} />
        <title>Gift Sign Up</title>
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
        <meta property="og:title" content="Gift Sign Up" />
        <meta
          property="og:description"
          content="Give the gift of C&B VIP Give the gift of C&B VIP &#8211; the only way to listen to the show live or on-demand on your computer of mobile device commercial-free. C&B VIP Members Benefits: Commercial-Free Audio Stream, Live or On-DemandCommercial-Free PodcastsExclusive VIP Invitations to C&B EventsExclusive Clay & Buck VIP VideosExclusive email access directly  […]"
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="The Clay Travis & Buck Sexton Show" />
        <meta property="og:image" content={page.seoTwitterThumb} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gift Sign Up" />
        <meta name="twitter:image" content={page.seoTwitterThumb} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="640" />
      </Head>
      <div className={`main-wrap page ${pageClass}`}>
        <Container>
          <GoogleReCaptchaProvider
            reCaptchaKey={CNB_RECAPTCHA_KEY}
            scriptProps={{
              async: false,
              defer: true,
              appendTo: "body",
              nonce: undefined,
            }}
          >
            <SignUp gift={true} plansInfo={plansInfo} />
          </GoogleReCaptchaProvider>
        </Container>
      </div>
    </Layout>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
  const pageData = await getPageData("/cnb-sign-up-gift");

  const plansInfoRes = await getPlansInfo();
  const plansInfo = plansInfoRes.success ? plansInfoRes.plansInfo : [];

  return {
    props: { pageData, plansInfo },
  };
}
