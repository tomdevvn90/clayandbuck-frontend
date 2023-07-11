import { AppProps } from 'next/app'
import PodcastsPlayer from '../components/podcasts-player';
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

import '../styles/main.scss'
import '../components/cnb-media/shared/Skeleton.style.scss'
import '../components/cnb-media/zype/ZypeMedia.style.scss'
import { getPodcastsData } from '../lib/normal-api';

export default function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <main>
      <Component {...pageProps} />
      
      <PodcastsPlayer />
    </main>
  )
}
// export async function getServerSideProps() {
//   const homePageData = await getPodcastsData();
//   return {
//      props: {homePageData}
//   }
// }