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
	return (
	  <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
		<Head>
		  <title>{page.title}</title>
		  <meta name="description" content="Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor."></meta>
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
  