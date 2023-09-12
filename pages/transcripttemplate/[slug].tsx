import Head from "next/head";
import Container from "../../components/container";
import PostBody from "../../components/post/post-body";
import Layout from "../../components/layout/layout";
import PostTitle from "../../components/post/post-title";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getTranscriptBySlug } from "../../lib/graphql-api";
import { ParseHtmlToReact } from "../../utils/parse-html-to-react";
import { SITE_URL, TWITTER_OG_IMAGE_URL } from "../../lib/constants";
import { useEffect } from "react";

const ShareThis = dynamic(() => import("../../components/share-this"), { ssr: false });

export default function TranscriptTemplate({ post, headerMenu, footerMenu }) {
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
      <div className="main-wrap post white-background transcript">
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

              {/* <BreadCrumb endLink="/category/top_stories/" endText="Stories" /> */}
              <div className="main-content">
                <div className="post-content-wrap">
                  {/* <PostHeader title={post.title} coverImage={post.featuredImage} date={post.date} /> */}
                  <PostBody content={post.content} />
                </div>

                {/* <Sidebar /> */}
              </div>
            </>
          )}
        </Container>

        <ShareThis />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const data = await getTranscriptBySlug(params?.slug);
  return {
    props: {
      post: data.transcripttemplate,
      headerMenu: data.headerMenu,
      footerMenu: data.footerMenu,
    },
  };
};
