import React from 'react'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../components/container'
import Layout from '../components/layout/layout'
import { getPageData } from '../lib/graphql-api'
import { useRouter } from 'next/router'
import { ParseHtmlToReact } from '../utils/parse-html-to-react'

export default function Page( {pageData} ) {

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
	return (
	  <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
		<Head>
		  {fullHead}
		  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
		  <meta name="twitter:image" content={page.seoTwitterThumb} />
		  <meta name="twitter:image:width" content="1200" />
		  <meta name="twitter:image:height" content="640" />
		</Head>
		<div className={`main-wrap page ${pageClass}`}>
		  <Container>
		  	{/* <div dangerouslySetInnerHTML={{__html: page?.content ?? {} }} ></div> */}
			<div>{ParseHtmlToReact(page?.content ?? {})}</div>
		  </Container>
		</div>
		
	  </Layout>
	)
  }
  
  /** Server-side Rendering (SSR) */
  export async function getServerSideProps( { params } ) {
	 const slug = params?.slug.join( '/' )
	 const pageData = await getPageData( slug );
	 return {
		props: {pageData}
	 }
  }
  