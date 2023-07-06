import Head from 'next/head'
// import { GetStaticProps } from 'next'
import Container from '../components/container'
import TopStories from '../components/top-stories'
import MainSideBar from '../components/main-sidebar'
import Layout from '../components/layout'
import PlayButtonList from '../components/play-button-list'
import FeaturedPosts from '../components/featured-posts'
import { getHomePageData } from '../lib/normal-api'
import { getAllMenu } from '../lib/graphql-api'

export default function Index( {homePageData, headerMenu, preview} ) {
  const { featuredPosts, 
          topStories, excludeTopStories, 
          quoteSliders } = homePageData
  console.log("here", headerMenu)
  return (
    <Layout preview={preview}>
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
            <TopStories tpStories={topStories} exTopStories={excludeTopStories} qtSliders={quoteSliders}></TopStories>
            <MainSideBar></MainSideBar>
          </div>
        </Container>
      </div>
      
    </Layout>
  )
}

/** Server-side Rendering (SSR) */
export async function getServerSideProps({ preview = false }) {
   const homePageData = await getHomePageData();
   const headerMenu = await getAllMenu();
   return {
      props: {homePageData, headerMenu, preview}
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
