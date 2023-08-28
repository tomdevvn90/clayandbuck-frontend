import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { SITE_URL } from "../lib/constants";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import VerifyEmail from "../components/cnb-subscriber/verify-email";

export default function VerifyEmailPage({ pageData }) {
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

  const emailToken = router.query.emailToken;
  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Head>
        {/* {fullHead} */}
        <link rel="canonical" href={canonicalUrl} />
        <title>Verify Email</title>
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
        <meta property="og:title" content="Verify Email" />
        <meta
          property="og:description"
          content="Subscribe to C&B VIP Sign up to become a C&B VIP subscriber and listen to the show live or on-demand on your computer or mobile device commercial-free. C&B VIP Members Benefits: Commercial-Free Audio Stream, Live or On-DemandCommercial-Free PodcastsExclusive VIP Invitations to C&B EventsExclusive Clay & Buck VIP VideosExclusive email access directly to Clay & Buck […]"
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="The Clay Travis & Buck Sexton Show" />
        <meta property="og:image" content={page.seoTwitterThumb} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Verify Email" />
        <meta name="twitter:image" content={page.seoTwitterThumb} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="640" />
      </Head>
      <div className="main-wrap page sign-up-flow">
        <Container>
          <VerifyEmail gift={false} emailToken={emailToken} />
        </Container>
      </div>
    </Layout>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
  const pageData = await getPageData("/verify-email");

  return {
    props: { pageData },
  };
}
