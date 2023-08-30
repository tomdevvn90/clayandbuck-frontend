import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import PostTitle from "../components/post/post-title";
import BreadCrumb from "../components/post/post-breadcrumb";
import PostPreview from "../components/post/post-preview";
import { useRouter } from "next/router";
import { getCategoryBySlug, getPageData, getPostAndMorePosts, getPostsByCategoryId } from "../lib/graphql-api";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL } from "../lib/constants";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { searchByKeyword } from "../lib/normal-api";
import SearchItem from "../components/search-item";

const Sidebar = dynamic(() => import("../components/sidebar"), {
  ssr: false,
});

export default function Search({ pageData }) {
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [crPage, setCrPage] = useState(1);
  const [searchItems, setSearchItems] = useState([]);
  const { headerMenu, footerMenu } = pageData;
  const router = useRouter();
  // if (!category) {
  //   return <ErrorPage statusCode={404} />;
  // }

  const page = pageData?.pageBy ?? {};
  const { seo } = page;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  const keyword = router.query.s.toString() ?? "";
  useEffect(() => {
    const getSearchData = async () => {
      const searchData = await searchByKeyword(keyword, crPage);
      if (searchData.length > 0) {
        setSearchItems(searchData);
        setCrPage((crPage) => crPage + 1);

        if (searchData.length == 10) {
          setShowLoadMoreBtn(true);
        }
      }
      console.log(searchData);
    };
    getSearchData();
  }, []);

  const loadMorePosts = async () => {
    // const { posts } = await getPostsByCategoryId(category.databaseId, crPage);
    // const morePosts = posts?.edges;
    // const pageInfo = posts?.pageInfo;
    // console.log(morePosts, pageInfo);
    // if (morePosts.length > 0) {
    //   setSearchItems([...searchItems, ...morePosts]);
    //   setCrPage(pageInfo.endCursor);
    // }
    // if (!pageInfo.hasNextPage) {
    //   setShowLoadMoreBtn(false);
    // }
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

              <h1>Results Found For: "{keyword}"</h1>

              <BreadCrumb endLink={router.asPath} endText="SEARCH RESULT" />

              <div className="main-content">
                <div className="post-content-wrap">
                  <div className="posts-rows">
                    {searchItems.length > 0 &&
                      searchItems.map((item) => {
                        const metaData = item._embedded.self[0];
                        const featuredImage = metaData.yoast_head_json.og_image[0].url;
                        const slug = metaData.slug;
                        const excerpt = metaData.excerpt.rendered;
                        return (
                          <SearchItem
                            key={item.id}
                            title={item.title}
                            coverImage={featuredImage}
                            slug={slug}
                            excerpt={excerpt}
                            type={item.type}
                          />
                        );
                      })}
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

export const getServerSideProps = async () => {
  const pageData = await getPageData("/");

  return {
    props: {
      pageData,
    },
  };
};
