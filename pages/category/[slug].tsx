// import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../../components/container";
import Layout from "../../components/layout/layout";
import PostTitle from "../../components/post/post-title";
import BreadCrumb from "../../components/post/post-breadcrumb";
import { useRouter } from "next/router";
import { getCategoryBySlug, getPostAndMorePosts, getPostsByCategoryId } from "../../lib/graphql-api";
import { ParseHtmlToReact } from "../../utils/parse-html-to-react";
import { SITE_URL } from "../../lib/constants";
import Link from "next/link";

// import Sidebar from "../../components/sidebar";
const Sidebar = dynamic(() => import("../../components/sidebar"), {
  ssr: false,
});

export default function Post({ headerMenu, footerMenu, category, posts }) {
  const router = useRouter();
  if (!category) {
    return <ErrorPage statusCode={404} />;
  }

  const { seo } = category;
  const fullHead = ParseHtmlToReact(seo.fullHead);
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${SITE_URL}` + (router.asPath === "/" ? "" : cleanPath);
  console.log(category);
  const catPosts = posts?.edges;
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
                  {catPosts.length > 0 &&
                    catPosts.map(({ node }) => (
                      <div className="post" key={node.postId}>
                        <Link href={`/posts/${node.slug}`} title={node.title}>
                          <div className="post-img">
                            <img src={node.featuredImage.node.sourceUrl} />
                          </div>
                          <div className="post-content">
                            <h4>{node.title}</h4>
                            <div dangerouslySetInnerHTML={{ __html: node.excerpt }}></div>
                          </div>
                        </Link>
                      </div>
                    ))}
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

  const { posts } = await getPostsByCategoryId(category.databaseId, 10, "");
  return {
    props: {
      headerMenu: data.headerMenu,
      footerMenu: data.footerMenu,
      category: category,
      posts: posts,
    },
  };
};
