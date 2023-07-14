import Head from 'next/head'
import Script from 'next/script'
import { META_DESC, HOME_OG_IMAGE_URL } from '../lib/constants'

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/android-chrome-192x192.png"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={META_DESC} />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />

      <Script async type="text/javascript" src="//www.googletagservices.com/tag/js/gpt.js" />
      <Script async src='https://securepubads.g.doubleclick.net/tag/js/gpt.js' />
      {/* <Script>
          window.googletag = window.googletag || {cmd: []};
      </Script> */}
    </Head>
  )
}
