import React from 'react'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../components/container'
import Layout from '../components/layout/layout'
import CnbMedia from "../components/cnb-media";
import { getPageData } from '../lib/graphql-api'
import { useRouter } from 'next/router'
import { ParseHtmlToReact } from '../utils/parse-html-to-react'
import { SITE_URL } from '../lib/constants'
import AffiliatesMap from '../components/stations/AffiliatesMap'
import Newsletter from '../components/newsletter/newsletter'

export default function Page( {pageData, cnbMediaData} ) {

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
console.log(templateName)
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
			{	
				/** Render the content page */
				( router.asPath != '/stations' && !router.asPath.includes('/stations/') ) && 
					<Container>
						{ ParseHtmlToReact(page?.content ?? {}) }
					</Container>
			}

			{ 
				/** Render Affiliates Map for page */
			    ( router.asPath == '/stations' || router.asPath.includes('/stations/') ) &&
					<Container>
						<AffiliatesMap />
					</Container>
			}
			
			{ 
				/** Render Media for the page */
				( router.asPath == '/videos' || router.asPath.includes('/videos/') ) &&
					<Container>
						<CnbMedia cnbMediaData={cnbMediaData} />
					</Container>	
			}

			{ 
				/** Render Newsletter for the page */
				( templateName.toLowerCase() == 'eib-in-a-hurry' ) &&
					<Newsletter />
			}
		</div>
		
	  </Layout>
	)
  }
  
  /** Server-side Rendering (SSR) */
  export async function getServerSideProps( { params } ) {
	 const slug = params?.slug.join( '/' )
	 const pageData = await getPageData( slug );

	 // Get Media Data if the page is "Videos"
	 const cnbMediaData = ( slug == 'videos' || slug.includes('videos/') ) ? { test: 'test' } : {}

	 return {
		props: {pageData, cnbMediaData}
	 }
  }
  