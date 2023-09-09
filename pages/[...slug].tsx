import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import TwoColumnTemp from "../components/two-column-template/two-column";
import SpecialOffer from "../components/special-offer-template/special-offer";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL } from "../lib/constants";
import { getBackgroundClass } from "../utils/global-functions";
import { useEffect } from "react";

export default function Page({ pageData, cnbMediaData }) {
  const page = pageData?.pageBy ?? {};
  const router = useRouter();
  if (!router.isFallback && !page?.slug) {
    useEffect(() => {
      router.push("/404");
    }, []);
    return;
  }

  const { headerMenu, footerMenu } = pageData;
  const { templateName } = page?.template ?? "";
  const pageClass = templateName ? templateName.toLowerCase().replaceAll(" ", "-") : "";

  const { seo } = page;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);
  const backgroundClass = getBackgroundClass(pageClass);

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
      <div className={`main-wrap page ${pageClass} ${backgroundClass}`}>
        {(() => {
          switch (pageClass) {
            case "two-column-template-page":
              return <TwoColumnTemp data={page} />;
            case "special-offer-template":
              return <SpecialOffer data={page} />;
            default:
              return <Container>{ParseHtmlToReact(page?.content ?? {})}</Container>;
          }
        })()}
      </div>
    </Layout>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps({ params }) {
  const slug = params?.slug.join("/");
  const pageData = await getPageData(slug);

  return {
    props: { pageData },
  };
}
