import { AppProps } from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

import '../styles/main.scss'
import Header from '../components/header'
import Footer from '../components/footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  )
}
