import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import AffiliatesMap from "../components/stations/affiliates-map";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL } from "../lib/constants";
import { useEffect } from "react";
import { GetStaticProps } from "next";

export default function StationPage({ pageData }) {
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
      <div className="main-wrap page default station">
        <Container>
          <AffiliatesMap />
        </Container>
      </div>
    </Layout>
  );
}

/** Static Site Generation (SSG) */
export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPageData("/stations");

  return {
    props: { pageData },
    revalidate: 10,
  };
};

// /** Server-side Rendering (SSR) */
// export async function getServerSideProps() {
//   const pageData = await getPageData("/stations");

//   return {
//     props: { pageData },
//   };
// }
