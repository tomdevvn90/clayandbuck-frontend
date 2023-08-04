import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import OneTrustContent from "../components/onetrust-privacy-notice/onetrust-content";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL } from "../lib/constants";

export default function PrivacyPolicyPage({ pageData }) {
  const page = pageData?.pageBy ?? {};
  const router = useRouter();
  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const { headerMenu, footerMenu } = pageData;
  const { templateName } = page?.template ?? "";
  const pageClass = templateName
    ? templateName.toLowerCase().replace(" ", "-")
    : "";

  const { seo } = page;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

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
        <Container>
          <OneTrustContent
            id="otnotice-817b67df-8a7f-42db-8847-d9d07698faf2"
            jsonLink="https://privacyportal-cdn.onetrust.com/3546d798-21cd-434d-b031-f8701f4d2f21/privacy-notices/817b67df-8a7f-42db-8847-d9d07698faf2.json"
          />
        </Container>
      </div>
    </Layout>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
  const pageData = await getPageData("/privacy-policy");

  return {
    props: { pageData },
  };
}
