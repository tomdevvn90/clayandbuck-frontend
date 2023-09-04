import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import PostTitle from "../components/post/post-title";
import BreadCrumb from "../components/post/post-breadcrumb";
import PostPreview from "../components/post/post-preview";
import { useRouter } from "next/router";
import { getAllPosts, getAllPostsByPage } from "../lib/graphql-api";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL, TWITTER_OG_IMAGE_URL } from "../lib/constants";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const Sidebar = dynamic(() => import("../components/sidebar"), {
  ssr: false,
});

export default function Transcripts({ headerMenu, footerMenu, transcripts, posts }) {
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [endCursor, setEndCursor] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  const router = useRouter();
  if (!transcripts) {
    return <ErrorPage statusCode={404} />;
  }

  const { seo } = transcripts;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  const allPostsEdges = posts?.edges;
  const pageInfo = posts?.pageInfo;

  useEffect(() => {
    setAllPosts(allPostsEdges);
    setEndCursor(pageInfo.endCursor);

    if (pageInfo.hasNextPage) {
      setShowLoadMoreBtn(true);
    }
  }, []);

  const loadMorePosts = async () => {
    setIsLoading(true);
    const { posts } = await getAllPostsByPage(endCursor);
    const morePosts = posts?.edges;
    const pageInfo = posts?.pageInfo;

    if (morePosts.length > 0) {
      setAllPosts([...allPosts, ...morePosts]);
      setEndCursor(pageInfo.endCursor);
    }
    if (!pageInfo.hasNextPage) {
      setShowLoadMoreBtn(false);
    }
    setIsLoading(false);
  };

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <div className="main-wrap post white-background post-archive">
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

              <h1>Top Stories</h1>

              <BreadCrumb endLink="/category/top_stories/" endText="Top Stories" />

              <div className="main-content">
                <div className="post-content-wrap">
                  <div className="posts-rows">
                    {allPosts.length > 0 &&
                      allPosts.map(({ node }) => (
                        <PostPreview
                          key={node.postId}
                          title={node.title}
                          coverImage={node.featuredImage}
                          slug={node.slug}
                          excerpt={node.excerpt}
                        />
                      ))}
                  </div>

                  {showLoadMoreBtn && (
                    <div className="text-center load-more-btn">
                      {isLoading ? (
                        <div className="cnb-spinner-loading"></div>
                      ) : (
                        <button className="btn" onClick={loadMorePosts}>
                          <span>Load More</span>
                          <FontAwesomeIcon icon={faRotateRight} style={{}} />
                        </button>
                      )}
                    </div>
                  )}
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
  const data = await getAllPosts("/transcripts");
  const transcripts = data.pageBy;

  if (!transcripts) {
    return {
      props: {
        headerMenu: data.headerMenu,
        footerMenu: data.footerMenu,
        transcripts: [],
        posts: [],
      },
    };
  }

  return {
    props: {
      headerMenu: data.headerMenu,
      footerMenu: data.footerMenu,
      transcripts: transcripts,
      posts: data.posts,
    },
  };
};
