// import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../../components/container";
import Layout from "../../components/layout/layout";
import PostTitle from "../../components/post/post-title";
import BreadCrumb from "../../components/post/post-breadcrumb";
import PostPreview from "../../components/post/post-preview";
import { useRouter } from "next/router";
import { getCategoryBySlug, getPostAndMorePosts, getPostsByCategoryId } from "../../lib/graphql-api";
import { ParseHtmlToReact } from "../../utils/parse-html-to-react";
import { SITE_URL } from "../../lib/constants";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

// import Sidebar from "../../components/sidebar";
const Sidebar = dynamic(() => import("../../components/sidebar"), {
  ssr: false,
});

export default function Post({ headerMenu, footerMenu, category }) {
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);
  const [endCursor, setEndCursor] = useState("");
  const [catPosts, setCatPosts] = useState([]);

  const router = useRouter();
  if (!category) {
    return <ErrorPage statusCode={404} />;
  }

  const { seo, posts } = category;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  const catPostsEdges = posts?.edges;
  const pageInfo = posts?.pageInfo;

  useEffect(() => {
    setCatPosts(catPostsEdges);
    setEndCursor(pageInfo.endCursor);

    if (!pageInfo.hasNextPage) {
      setShowLoadMoreBtn(false);
    }
  }, []);

  const loadMorePosts = async () => {
    const { posts } = await getPostsByCategoryId(category.databaseId, endCursor);
    const morePosts = posts?.edges;
    const pageInfo = posts?.pageInfo;
    console.log(morePosts, pageInfo);

    if (morePosts.length > 0) {
      setCatPosts([...catPosts, ...morePosts]);
      setEndCursor(pageInfo.endCursor);
    }
    if (!pageInfo.hasNextPage) {
      setShowLoadMoreBtn(false);
    }
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
                <meta
                  name="twitter:image"
                  content="https://www.clayandbuck.com/wp-content/uploads/2022/05/social.png"
                />
                <meta name="twitter:image:width" content="1200" />
                <meta name="twitter:image:height" content="640" />
              </Head>

              <h1>{category.name}</h1>

              <BreadCrumb endLink={category.slug} endText={category.name} />

              <div className="main-content">
                <div className="post-content-wrap">
                  <div className="posts-rows">
                    {catPosts.length > 0 &&
                      catPosts.map(({ node }) => (
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
                      <button className="btn" onClick={loadMorePosts}>
                        <span>Load More</span>
                        <FontAwesomeIcon icon={faRotateRight} style={{}} />
                      </button>
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
  const data = await getCategoryBySlug(params?.slug);
  const category = data.category;

  if (!category) {
    return {
      props: {
        headerMenu: data.headerMenu,
        footerMenu: data.footerMenu,
        category: [],
        posts: [],
      },
    };
  }

  return {
    props: {
      headerMenu: data.headerMenu,
      footerMenu: data.footerMenu,
      category: category,
    },
  };
};
