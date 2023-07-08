// import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Container from '../../components/container'
import PostBody from '../../components/post/post-body'
import MoreStories from '../../components/more-stories'
import PostHeader from '../../components/post/post-header'
import Layout from '../../components/layout/layout'
import PostTitle from '../../components/post/post-title'
import Tags from '../../components/tags'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/graphql-api'

export default function Post({ post, headerMenu, footerMenu, posts, preview }) {
  const router = useRouter()
  const morePosts = posts?.edges

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu} preview={preview} >
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title> {`${post.title}`} </title>
                <meta property="og:image"
                      content={post.featuredImage?.node.sourceUrl}
                />
              </Head>
              <PostHeader title={post.title} coverImage={post.featuredImage}
                  date={post.date} author={post.author} categories={post.categories}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async ( {
  params,
  preview = false,
  previewData
} ) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData)
  return {
    props: {
      preview,
      post: data.post,
      headerMenu: data.headerMenu,
      footerMenu: data.footerMenu,
      posts: data.posts,
    }
  }
}

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
