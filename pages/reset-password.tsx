import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import ResetPassword from "../components/cnb-subscriber/reset-password";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { SITE_URL, TWITTER_OG_IMAGE_URL } from "../lib/constants";

export default function ResetPasswordPage({ pageData }) {
  const router = useRouter();

  const { headerMenu, footerMenu } = pageData;
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);
  const passwordToken = router.query.passwordToken;
  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <title>Reset Password</title>
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
        <meta property="og:title" content="Reset Password" />
        <meta
          property="og:description"
          content="Subscribe to C&B VIP Sign up to become a C&B VIP subscriber and listen to the show live or on-demand on your computer or mobile device commercial-free. C&B VIP Members Benefits: Commercial-Free Audio Stream, Live or On-DemandCommercial-Free PodcastsExclusive VIP Invitations to C&B EventsExclusive Clay & Buck VIP VideosExclusive email access directly to Clay & Buck […]"
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="The Clay Travis & Buck Sexton Show" />
        <meta property="og:image" content={TWITTER_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reset Password" />
        <meta name="twitter:image" content={TWITTER_OG_IMAGE_URL} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="640" />
      </Head>
      <div className="main-wrap page sign-up-flow">
        <Container>
          <ResetPassword passwordToken={passwordToken} />
        </Container>
      </div>
    </Layout>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
  const pageData = await getPageData("/reset-password");

  return {
    props: { pageData },
  };
}
