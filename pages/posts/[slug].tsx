// import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../../components/container";
import PostBody from "../../components/post/post-body";
import MoreStories from "../../components/post/more-stories";
import PostHeader from "../../components/post/post-header";
import Layout from "../../components/layout/layout";
import PostTitle from "../../components/post/post-title";
import BreadCrumb from "../../components/post/post-breadcrumb";
import { useRouter } from "next/router";
import { getPostAndMorePosts } from "../../lib/graphql-api";
import { ParseHtmlToReact } from "../../utils/parse-html-to-react";
import { SITE_URL } from "../../lib/constants";
import { getCookie } from "cookies-next";
import RequireSubscriberOnly from "../../components/require-subscriber-only";

// import Sidebar from "../../components/sidebar";
const Sidebar = dynamic(() => import("../../components/sidebar"), {
  ssr: false,
});

export default function Post({ post, headerMenu, footerMenu, posts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const { seo, subscriberOnly } = post;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  const morePosts = posts?.edges;

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
                <meta name="twitter:image" content={post.seoTwitterThumb} />
                <meta name="twitter:image:width" content="1200" />
                <meta name="twitter:image:height" content="640" />
              </Head>

              {subscriberOnly && !noRequireSubs ? (
                <RequireSubscriberOnly requireObj={requireObj} />
              ) : (
                <>
                  <BreadCrumb endLink="/category/top_stories/" endText="Stories" />
                  <div className="main-content">
                    <div className="post-content-wrap">
                      <PostHeader
                        title={post.title}
                        coverImage={post.featuredImage}
                        featureImageUrl={post.featureImageUrl}
                        featureImageTab={post.featureImageTab}
                        featuredVideosPost={post.featuredVideosPost}
                        date={post.date}
                        author={post.author}
                        categories={post.categories}
                      />
                      <PostBody content={post.content} />
                      {/* <footer>
                    {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                  </footer> */}
                    </div>

                    <Sidebar />
                  </div>

                  {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                </>
              )}
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const data = await getPostAndMorePosts(params?.slug);
  return {
    props: {
      post: data.post,
      headerMenu: data.headerMenu,
      footerMenu: data.footerMenu,
      posts: data.posts,
    },
  };
};

// export const getStaticProps: GetStaticProps = async ({
//   params,
//   preview = false,
//   previewData,
// }) => {
//   const data = await getPostAndMorePosts(params?.slug, preview, previewData)

//   return {
//     props: {
//       preview,
//       post: data.post,
//       headerMenu: data.headerMenu,
//       footerMenu: data.footerMenu,
//       posts: data.posts,
//     },
//     revalidate: 10,
//   }
// }
// export const getStaticPaths: GetStaticPaths = async () => {
//   const allPosts = await getAllPostsWithSlug()
//   return {
//     paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
//     fallback: true,
//   }
// }
