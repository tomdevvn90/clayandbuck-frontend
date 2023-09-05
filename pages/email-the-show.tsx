import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import dynamic from "next/dynamic";
import Image from "next/image";
import EmailTheShowImg from "../public/images/email-the-show.jpg";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL } from "../lib/constants";
import { getCookie } from "cookies-next";

const RequireSubscriberOnly = dynamic(() => import("../components/require-subscriber-only"), {
  ssr: false,
});
const EmailTheShow = dynamic(() => import("../components/email-the-show"), {
  ssr: false,
});

export default function VipPodcastPage({ pageData }) {
  const page = pageData?.pageBy ?? {};
  const router = useRouter();
  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const { headerMenu, footerMenu } = pageData;
  const { templateName } = page?.template ?? "";
  const pageClass = templateName ? templateName.toLowerCase().replace(" ", "-") : "";

  const { seo } = page;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  const userEmailCk = getCookie("STYXKEY_USER_EMAIL");
  const userPassCk = getCookie("STYXKEY_USER_PASSWORD");
  const userSubsCk = getCookie("STYXKEY_USER_SUBSCRIBED");
  const userCanSubsCk = getCookie("STYXKEY_USER_CANCELLED_SUBS");
  const requireObj = {
    userEmailCk,
    userPassCk,
    userSubsCk,
    userCanSubsCk,
  };
  const noRequireSubs = !userEmailCk || !userPassCk || !userSubsCk || userCanSubsCk ? false : true;

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Head>
        {fullHead}
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        ></meta>
        <meta name="twitter:image" content={page.seoTwitterThumb} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="640" />
      </Head>
      <div className={`main-wrap page white-background ${pageClass}`}>
        <section className="hero-ss">
          <Container>
            <Image src={EmailTheShowImg} width={1200} height={327} alt="Exclusive Member Email" />
          </Container>
        </section>

        <Container>{noRequireSubs ? <EmailTheShow /> : <RequireSubscriberOnly requireObj={requireObj} />}</Container>
      </div>
    </Layout>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
  const pageData = await getPageData("/email-the-show");

  return {
    props: { pageData },
  };
}
