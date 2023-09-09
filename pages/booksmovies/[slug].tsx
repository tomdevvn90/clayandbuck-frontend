import dynamic from "next/dynamic";
import Head from "next/head";
import Container from "../../components/container";
import PostBody from "../../components/post/post-body";
import PostHeader from "../../components/post/post-header";
import Layout from "../../components/layout/layout";
import PostTitle from "../../components/post/post-title";
import BreadCrumb from "../../components/post/post-breadcrumb";
import { useRouter } from "next/router";
import { getBookMovieBySlug } from "../../lib/graphql-api";
import { ParseHtmlToReact } from "../../utils/parse-html-to-react";
import { SITE_URL, TWITTER_OG_IMAGE_URL } from "../../lib/constants";
import { useEffect } from "react";

const Sidebar = dynamic(() => import("../../components/sidebar"), {
  ssr: false,
});

export default function BookMovie({ post, headerMenu, footerMenu }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    useEffect(() => {
      router.push("/404");
    }, []);
    return;
  }
  const { seo } = post;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <div className="main-wrap post white-background">
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <Head>
                {fullHead}
                <link rel="canonical" href={canonicalUrl} />
                <meta
                  name="robots"
                  content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                ></meta>
                <meta name="twitter:image" content={TWITTER_OG_IMAGE_URL} />
                <meta name="twitter:image:width" content="1200" />
                <meta name="twitter:image:height" content="640" />
              </Head>

              <BreadCrumb endLink="/category/top_stories/" endText="Stories" />
              <div className="main-content">
                <div className="post-content-wrap">
                  <PostHeader title={post.title} coverImage={post.featuredImage} date={post.date} />
                  <PostBody content={post.content} />
                </div>

                <Sidebar />
              </div>
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const data = await getBookMovieBySlug(params?.slug);
  return {
    props: {
      post: data.bookmovie,
      headerMenu: data.headerMenu,
      footerMenu: data.footerMenu,
    },
  };
};
