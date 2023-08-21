import Head from "next/head";

export default function Meta() {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="mask-icon" href="/favicon/android-chrome-192x192.png" color="#000000" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000" />
    </Head>
  );
}
