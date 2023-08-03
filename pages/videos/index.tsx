import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Layout from "../../components/layout/layout";
import { getPageData } from "../../lib/graphql-api";
import { useRouter } from "next/router";
import { ParseHtmlToReact } from "../../utils/parse-html-to-react";
import { SITE_URL } from "../../lib/constants";

// import CnbMediaApp from "../../components/cnb-media";
const CnbMediaApp = dynamic(() => import("../../components/cnb-media"), {
  ssr: false,
});

export default function VideosPage({ pageData }) {
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
      <div className={`main-wrap page ${pageClass}`}>
        <Container>
          {/* { ParseHtmlToReact(page?.content ?? {}) } */}
          <div className="hero-ss">
            <h1>Audio/Video</h1>
            <ul className="breadcrumbs">
              <li>
                <a href="/">Home</a>
              </li>
              <li className="active">Media</li>
            </ul>
          </div>
          <CnbMediaApp />
        </Container>
      </div>
    </Layout>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
  const pageData = await getPageData("/videos");

  return {
    props: { pageData },
  };
}
