import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import TopStories from '../components/top-stories'
import MainSideBar from '../components/main-sidebar'
import Layout from '../components/layout'
import PlayButtonList from '../components/play-button-list'
import FeaturedPosts from '../components/featured-posts'
import { getAllPostsForHome } from '../lib/api'

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  return (
    <Layout preview={preview}>
      <Head>
        <title>The Clay Travis  & Buck Sexton Show</title>
        <meta name="description" content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."></meta>
      </Head>
      <div className='main-wrap'>
        <div className='index-page'>
          <Container>
            <PlayButtonList></PlayButtonList>
            <FeaturedPosts></FeaturedPosts>
            <div className='main-content'>
              <TopStories></TopStories>
              <MainSideBar></MainSideBar>
            </div>
            {/* {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.featuredImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )} */}
            {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          </Container>
        </div>
      </div>
      
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)

  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}
