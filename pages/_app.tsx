import { AppProps } from 'next/app'
import { Barlow } from 'next/font/google'
import '../styles/global.css'
import '../styles/index.css'
import '../styles/header.css'
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
