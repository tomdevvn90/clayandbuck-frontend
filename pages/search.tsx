import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout/layout";
import PostTitle from "../components/post/post-title";
import BreadCrumb from "../components/post/post-breadcrumb";
import SearchItem from "../components/search-item";
import { useRouter } from "next/router";
import { getPageData } from "../lib/graphql-api";
import { ParseHtmlToReact } from "../utils/parse-html-to-react";
import { SITE_URL, TWITTER_OG_IMAGE_URL } from "../lib/constants";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchByKeyword } from "../lib/normal-api";

const Sidebar = dynamic(() => import("../components/sidebar"), {
  ssr: false,
});

export default function Search({ pageData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [crPage, setCrPage] = useState(1);
  const [searchItems, setSearchItems] = useState([]);

  const router = useRouter();
  const { headerMenu, footerMenu } = pageData;
  const page = pageData?.pageBy ?? {};
  const { seo } = page;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);

  const keyword = router.query.s.toString() ?? "";
  useEffect(() => {
    const getSearchData = async () => {
      setSearchItems([]);
      setShowLoadMoreBtn(false);

      setIsLoading(true);
      const searchData = await searchByKeyword(keyword, 1);
      if (searchData.length > 0) {
        setSearchItems(searchData);
        setCrPage(2);

        if (searchData.length == 10) {
          setShowLoadMoreBtn(true);
        }
      }
      setIsLoading(false);
      // console.log(searchData);
    };
    getSearchData();
  }, [router.query.s]);

  const loadMorePosts = async () => {
    setIsLoadMoreLoading(true);
    const searchData = await searchByKeyword(keyword, crPage);
    if (searchData.length > 0) {
      setSearchItems([...searchItems, ...searchData]);
      setCrPage((crPage) => crPage + 1);

      if (searchData.length == 10) {
        setShowLoadMoreBtn(true);
      } else {
        setShowLoadMoreBtn(false);
      }
    }
    setIsLoadMoreLoading(false);
  };

  const handleSearchOther = (event) => {
    event.preventDefault();
    const keyword = event.target.s.value;
    router.push(`/search?s=${keyword}`, null, { shallow: true });
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

              <h1>Results Found For: "{keyword}"</h1>

              <BreadCrumb endLink={router.asPath} endText="SEARCH RESULT" />

              <div className="main-content">
                <div className="post-content-wrap">
                  {isLoading ? (
                    <div className="load-more-wrap">
                      <div className="cnb-spinner-loading"></div>
                    </div>
                  ) : (
                    <div className="posts-rows">
                      {searchItems.length > 0 &&
                        searchItems.map((item) => {
                          const metaData = item._embedded.self[0];
                          const featuredImage = metaData.yoast_head_json.og_image[0].url;
                          const slug = metaData.slug;
                          const excerpt = metaData.excerpt.rendered;
                          const type = metaData.type;
                          return (
                            <SearchItem
                              key={item.id}
                              title={item.title}
                              coverImage={featuredImage}
                              slug={slug}
                              excerpt={excerpt}
                              type={type}
                            />
                          );
                        })}

                      {searchItems.length == 0 && (
                        <section className="no-results not-found">
                          <h2 className="page-title">Nothing Found</h2>
                          <p>
                            Sorry, but nothing matched your search terms. Please try again with some different keywords.
                          </p>
                          <form className="search-form" role="search" onSubmit={handleSearchOther}>
                            <input type="text" placeholder="Search..." name="s" />
                            <button type="submit" className="btn-submit">
                              <FontAwesomeIcon icon={faSearch} style={{}} />
                            </button>
                          </form>
                        </section>
                      )}
                    </div>
                  )}

                  {showLoadMoreBtn && (
                    <div className="text-center load-more-btn">
                      {isLoadMoreLoading ? (
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

export const getServerSideProps = async () => {
  const pageData = await getPageData("/");

  return {
    props: {
      pageData,
    },
  };
};
