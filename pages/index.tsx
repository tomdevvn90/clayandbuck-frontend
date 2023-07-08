import Head from 'next/head'
import Container from '../components/container'
import TopStories from '../components/top-stories'
import MainSideBar from '../components/main-sidebar'
import Layout from '../components/layout/layout'
import PlayButtonList from '../components/play-button-list'
import FeaturedPosts from '../components/featured-posts'
import { getHomePageData } from '../lib/normal-api'
import { getAllMenu } from '../lib/graphql-api'

export default function Index( {homePageData, allMenu, preview} ) {
  const { featuredPosts, 
          topStories, excludeTopStories, 
          quoteSliders } = homePageData
  const { headerMenu, footerMenu } = allMenu

  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu} preview={preview} >
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
   const allMenu = await getAllMenu();
   return {
      props: {homePageData, allMenu, preview}
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
