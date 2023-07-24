import React from 'react'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Layout from '../components/layout/layout'
import ClayAndBuckApp from '../components/the-clay-buck-app/clay-buck-app'
import Container from '../components/container'
import { getPageData } from '../lib/graphql-api'
import { useRouter } from 'next/router'
import { ParseHtmlToReact } from '../utils/parse-html-to-react'
import { SITE_URL } from '../lib/constants'

export default function MobileAppPage( {pageData} ) {

	const page = pageData?.pageBy ?? {}
	const router = useRouter()
	if (!router.isFallback && !page?.slug) {
		return <ErrorPage statusCode={404} />
	}

	const { headerMenu, footerMenu } = pageData
	const { templateName } = page?.template ?? ''
	const pageClass = templateName? templateName.toLowerCase().replace(' ', '-') : ''

	const { seo } = page
  	const fullHead = ParseHtmlToReact(seo.fullHead);
	const cleanPath = router.asPath.split('#')[0].split('?')[0];
	const canonicalUrl = `${SITE_URL}` + (router.asPath === '/' ? '' : cleanPath);

	return (
	  <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
		<Head>
		  {fullHead}
		  <link rel="canonical" href={canonicalUrl} />
		  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
		  <meta name="twitter:image" content={page.seoTwitterThumb} />
		  <meta name="twitter:image:width" content="1200" />
		  <meta name="twitter:image:height" content="640" />
		</Head>
		<div className={`main-wrap page ${pageClass}`}>
            <Container>
                <ClayAndBuckApp content={page?.content ?? {}} />
            </Container>
		</div>
		
	  </Layout>
	)
  }
  
  /** Server-side Rendering (SSR) */
  export async function getServerSideProps() {
	 const pageData = await getPageData( '/the-clay-buck-app' );

	 return {
		props: {pageData}
	 }
  }
  
