import { AppProps } from 'next/app'
import { Barlow } from 'next/font/google'
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

import '../styles/main.scss'
import Header from '../components/header'
import Footer from '../components/footer'

export const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={barlow.className}>
      <Header></Header>
      <Component {...pageProps} />
      <Footer />
    </main>
  )
}
