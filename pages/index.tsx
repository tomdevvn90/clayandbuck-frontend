import Head from 'next/head'
// import { GetStaticProps } from 'next'
import Container from '../components/container'
import TopStories from '../components/top-stories'
import MainSideBar from '../components/main-sidebar'
import Layout from '../components/layout'
import PlayButtonList from '../components/play-button-list'
import FeaturedPosts from '../components/featured-posts'
import { getHomePageData } from '../lib/normal-api'

export default function Index( homePageData ) {
  const { featuredPosts, topStories, quoteSliders } = homePageData
  return (
    // <Layout preview={preview}>
    <Layout preview={false}>
      <Head>
        <title>The Clay Travis  & Buck Sexton Show</title>
        <meta name="description" content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."></meta>
      </Head>
      <div className='main-wrap index-page'>
        <Container>
          <PlayButtonList></PlayButtonList>
          {featuredPosts && (
            <FeaturedPosts ftPosts={featuredPosts}></FeaturedPosts>
          )}
          <div className='main-content'>
            <TopStories tpStories={topStories} qtSliders={quoteSliders}></TopStories>
            <MainSideBar></MainSideBar>
          </div>
        </Container>
      </div>
      
    </Layout>
  )
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps() {
   const homePageData = await getHomePageData();
   return {
      props: homePageData
   }
}

/** Static Site Generation (SSG) */
// export const getStaticProps: GetStaticProps = async () => {
//      const homePageData = await getHomePageData();
//      return {
//         props: homePageData,
//         revalidate: 10,
//      }
// }

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//   const allPosts = await getAllPostsForHome(preview)

//   return {
//     props: { allPosts, preview },
//     revalidate: 10,
//   }
// }
