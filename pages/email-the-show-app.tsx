import Head from "next/head";
import Container from "../components/container";
import dynamic from "next/dynamic";
import Image from "next/image";
import EmailTheShowImg from "../public/images/email-the-show-app.jpg";
import LayoutNoHeadFoot from "../components/layout/layout-no-headfoot";
import { getPageData } from "../lib/graphql-api";
import { useRouter } from "next/router";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL } from "../lib/constants";
import { useEffect } from "react";

const EmailTheShow = dynamic(() => import("../components/email-the-show"), {
  ssr: false,
});

export default function EmailTheShowAppPage({ pageData }) {
  const page = pageData?.pageBy ?? {};
  const router = useRouter();
  if (!router.isFallback && !page?.slug) {
    useEffect(() => {
      router.push("/404");
    }, []);
    return;
  }

  const { seo } = page;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  return (
    <LayoutNoHeadFoot>
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
      <div className="main-wrap page white-background email-the-show">
        <section className="hero-ss">
          <Image src={EmailTheShowImg} width={1450} height={396} priority={true} alt="Exclusive Member Email" />
        </section>

        <Container>
          <EmailTheShow />
        </Container>
      </div>
    </LayoutNoHeadFoot>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
  const pageData = await getPageData("/email-the-show-app");

  return {
    props: { pageData },
  };
}
