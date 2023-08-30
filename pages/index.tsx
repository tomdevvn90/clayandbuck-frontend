import Head from "next/head";
import Container from "../components/container";
import TopStories from "../components/home/top-stories";
import Layout from "../components/layout/layout";
import PlayButtonList from "../components/home/play-button-list";
import FeaturedPosts from "../components/home/featured-posts";
import dynamic from "next/dynamic";
import { getHomePageData } from "../lib/normal-api";
import { getPageData } from "../lib/graphql-api";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL } from "../lib/constants";

// import Sidebar from '../components/sidebar'
const Sidebar = dynamic(() => import("../components/sidebar"), {
  ssr: false,
});

export default function Index({ homePageData, pageData }) {
  const { featuredPosts, topStories, excludeTopStories, quoteSliders } = homePageData;
  const { headerMenu, footerMenu } = pageData;

  const page = pageData?.pageBy ?? {};
  const { seo } = page;
  const fullHead = ParseHtmlToReact(seo.fullHead);

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Head>
        {fullHead}
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        ></meta>
        <meta name="twitter:image" content={page.seoTwitterThumb} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="640" />
      </Head>
      <div className="main-wrap index-page">
        <Container>
          <PlayButtonList />
          {featuredPosts && <FeaturedPosts ftPosts={featuredPosts} />}
          <div className="main-content">
            <TopStories tpStories={topStories} exTopStories={excludeTopStories} qtSliders={quoteSliders} />
            <Sidebar />
          </div>
        </Container>
      </div>
    </Layout>
  );
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
  const pageData = await getPageData("/");
  const homePageData = await getHomePageData();
  return {
    props: { homePageData, pageData },
  };
}
/** Static Site Generation (SSG) */
// export const getStaticProps: GetStaticProps = async () => {
//      const homePageData = await getHomePageData();
//      return {
//         props: homePageData,
//         revalidate: 10,
//      }
// }
