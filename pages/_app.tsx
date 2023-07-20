import { AppProps } from 'next/app'
import PodcastsPlayer from '../components/podcasts-player';
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

import '../styles/main.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <main>
      <Component {...pageProps} />
      
      <PodcastsPlayer />
    </main>
  )
}