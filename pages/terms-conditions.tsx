import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import OneTrustContent from "../components/onetrust-privacy-notice/onetrust-content";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL } from "../lib/constants";
import { useEffect } from "react";
import { GetStaticProps } from "next";

export default function TermsConditionsPage({ pageData }) {
  const page = pageData?.pageBy ?? {};
  const router = useRouter();
  if (!router.isFallback && !page?.slug) {
    useEffect(() => {
      router.push("/404");
    }, []);
    return;
  }

  const { headerMenu, footerMenu } = pageData;
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
      <div className="main-wrap page white-background terms-conditions-single-post">
        <Container>
          <OneTrustContent
            id="otnotice-e4bc39c0-f218-4288-bd46-fdaff1783a58"
            jsonLink="https://privacyportal-cdn.onetrust.com/3546d798-21cd-434d-b031-f8701f4d2f21/privacy-notices/e4bc39c0-f218-4288-bd46-fdaff1783a58.json"
          />
        </Container>
      </div>
    </Layout>
  );
}

/** Static Site Generation (SSG) */
export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPageData("/terms-conditions");

  return {
    props: { pageData },
    revalidate: 10,
  };
};

// /** Server-side Rendering (SSR) */
// export async function getServerSideProps() {
//   const pageData = await getPageData("/terms-conditions");

//   return {
//     props: { pageData },
//   };
// }
